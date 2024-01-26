import EventStructure from "../components/structures/EventStructure.js"

export default class extends EventStructure {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }
    
    /**
    * @param {BaseInteraction} interaction
    */
    run = (interaction) => {
        if (!interaction.isChatInputCommand()) return

        const command = this.client.commandsList.get(interaction.commandName)
        if (!command) return

        try {
            command.run(interaction)
        } catch (err) {
            console.log(err)
        }
    }
}