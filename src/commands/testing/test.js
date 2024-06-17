import CommandStructure from '../../components/structures/CommandStructure.js'

export default class extends CommandStructure {
    constructor(client) {
        super(client, {
            name: 'tests',
            description: 'Hello World!',
            permissions: null,
            debug: true,
        })
    }

    /**
    * @param {CommandInteraction} interaction
    */
    run = (interaction) => {
        interaction.reply({ content: 'Hello World! :slight_smile:' })
    }
}