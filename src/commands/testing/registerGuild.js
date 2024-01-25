import CommandStructure from '../../components/structures/CommandStructure.js'
import GuildDB from '../../components/database/GuildDB.js'
import { CommandInteraction } from 'discord.js'
import mongoose from 'mongoose'
import { EmbedBuilder } from '@discordjs/builders'

export default class extends CommandStructure {
    constructor(client) {
        super(client, {
            name: 'register-guild',
            description: 'Register guild on database. (Demonstration purpose only)',
            testing: true,
            guildOnly: true
        })
    }

    /**
     * @param {CommandInteraction} interaction
     */
    run = async (interaction) => {
        interaction.deferReply({ ephemeral: true })

        const guildDB = new GuildDB()
        guildDB.connect()
        const guild = await guildDB.guild(interaction.guild.id)

        guild.setup.roles.adminRoleId = '123'
        guild.setup.roles.boostersRoleId = '123'
        guild.setup.roles.eventsModRoleId = '123'
        guild.setup.roles.modRoleId = '123'
        guild.setup.roles.staffRoleId = '123'

        await guild.save()
        await guildDB.disconnect()

        const embed = new EmbedBuilder()
            .setColor(7592650)
            .setDescription(`**Filled this guild's database entry with arbitrary data:**\n\`\`\`json\n${JSON.stringify(guild.toJSON(), null, 4)}\n\`\`\``)

        interaction.editReply({ embeds: [embed] })
    }
}