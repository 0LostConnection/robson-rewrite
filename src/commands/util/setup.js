import { ActionRowBuilder, EmbedBuilder, RoleSelectMenuBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from '@discordjs/builders'
import { PermissionFlagsBits, CommandInteraction, ComponentType } from 'discord.js'
import CommandStructure from '../../components/structures/CommandStructure.js'
import Guilds from '../../components/database/models/Guild.js'
import GuildDB from '../../components/database/GuildDB.js'

const setupRoles = Object.keys(Guilds.schema.obj.setup.roles)

const createSelectMenuOptions = (customId, optionsArray) => {
    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId(customId)
        .setMaxValues(1)
        .setPlaceholder('Select an option...')

    optionsArray.forEach(option => {
        selectMenu.addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel(option)
                .setValue(option)
        )
    })

    return selectMenu
}

const setupEmbed = (step, description) => {
    return new EmbedBuilder()
        .setColor(7592627)
        .setTitle(`Setup: ${step}`)
        .setDescription(description)
}

export default class extends CommandStructure {
    constructor(client) {
        super(client, {
            name: 'setup',
            description: 'Dynamic setup command based on database/models/Guild.js',
            permissions: String(PermissionFlagsBits.ManageGuild),
            testing: true
        })
    }

    /**
    * @param {CommandInteraction} interaction
    */
    run = async (interaction) => {
        const setupSelectMenu = new ActionRowBuilder()
            .addComponents(createSelectMenuOptions('setup:step_one', setupRoles))

        const setupResponse = await interaction.reply({ embeds: [setupEmbed('Roles', '**Choose one of the `@role` settings below to change:**')], components: [setupSelectMenu], fetchReply: true })
        const setupCollector = setupResponse.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 20000, filter: (i) => i.user.id === interaction.user.id })

        setupCollector.on('collect', async setupInteraction => {
            setupInteraction.deferUpdate()

            const selectedSetup = setupInteraction.values[0]

            const roleSelectMenu = new ActionRowBuilder()
                .addComponents(
                    new RoleSelectMenuBuilder()
                        .setCustomId('setup:step_two')
                        .setMaxValues(1)
                        .setPlaceholder('Select an option...')
                )

            const roleResponse = await interaction.editReply({ embeds: [setupEmbed('Roles', '**Choose one of the `@role` below to change:**')], components: [roleSelectMenu] })
            const roleCollector = roleResponse.createMessageComponentCollector({ componentType: ComponentType.RoleSelect, time: 20000, filter: (i) => i.user.id === interaction.user.id })

            roleCollector.on('collect', async roleInteraction => {
                roleInteraction.deferReply({ ephemeral: true })
                interaction.deleteReply()

                const selectedRole = roleInteraction.values[0]

                const guildDB = new GuildDB()

                try {
                    guildDB.connect()
                    const guild = await guildDB.guild(interaction.guild.id)

                    guild.setup.roles[selectedSetup].id = selectedRole
                    await guild.save()

                    roleInteraction.editReply({ embeds: [setupEmbed('Roles', '**Done!**')] })
                } catch (err) {
                    roleInteraction.editReply({ embeds: [setupEmbed('Roles', '```ERROR - See logs```')] })
                    console.log(err)
                }
            })
        })

    }
}