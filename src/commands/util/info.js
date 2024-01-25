import CommandStructure from '../../components/structures/CommandStructure.js'
import { EmbedBuilder } from '@discordjs/builders'
import hexToDecimal from '../../components/utils/hexToDecimal.js'

export default class extends CommandStructure {
    constructor(client) {
        super(client, {
            name: 'info',
            description: 'Informações sobre o bot!',
            testing: true
        })
    }

    /**
    * @param {CommandInteraction} interaction
    */
    run = (interaction) => {
        const botAuthor = interaction.client.users.cache.find(u => u.id == "437249534096048130")
        const author = {
            name: `Criado por: ${botAuthor.globalName}`,
            iconURL: botAuthor.avatarURL()
        }

        const embed = new EmbedBuilder()
            .setTitle('Info')
            .setAuthor(author)
            .setColor(hexToDecimal("7dc8d4"))
            .setDescription('Info aqui.')

        interaction.reply({ embeds: [embed] })
    }
}