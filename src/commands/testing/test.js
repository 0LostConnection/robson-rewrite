import CommandStructure from '../../components/structures/CommandStructure.js'

export default class extends CommandStructure {
    constructor(client) {
        super(client, {
            name: 'test',
            description: 'Hello World!',
            permissions: null,
            guildOnly: true,
            testing: true,
            disabled: false
        })
    }

    /**
    * @param {CommandInteraction} interaction
    */
    run = (interaction) => {
        interaction.reply({ content: 'Hello World! :slight_smile:' })
    }
}