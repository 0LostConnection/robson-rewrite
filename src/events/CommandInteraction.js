import EventStructure from "../core/structures/EventStructure.js"
import { BaseInteraction, CommandInteraction } from "discord.js"
import log from "../core/infra/Log.js"

export default class extends EventStructure {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    /**
    * @param {CommandInteraction | BaseInteraction} interaction
    */
    run = (interaction) => {
        if (!interaction.isChatInputCommand()) return

        const command = this.client.slashCommands.get(interaction.commandName)

        if (!command) return

        try {
            command.run(interaction)
        } catch (err) {
            log({ title: `Events: interactionCreate: Command: '${command.name}'`, message: err }, 'ERROR')
        }
    }
}