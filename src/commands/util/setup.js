import { PermissionFlagsBits, CommandInteraction } from 'discord.js'
import CommandStructure from '../../components/structures/CommandStructure.js'
import { EmbedBuilder } from '@discordjs/builders'

export default class extends CommandStructure {
    constructor(client) {
        super(client, {
            name: 'setuo',
            description: 'Dynamic setup command based on database/models/Guild.js',
            permissions: [PermissionFlagsBits.ManageGuild],
            testing: true
        })
    }
    /**
    * @param {CommandInteraction} interaction
    */
    run = async (interaction) => {
        const embed = new EmbedBuilder()

        
    }
}