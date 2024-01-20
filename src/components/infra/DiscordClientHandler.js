import { Client, Collection } from 'discord.js'
import { readdirSync } from 'fs'

export default class extends Client {
    constructor(intents) {
        super(intents)
        this.commandsList = []
        this.listCommands()
        this.loadEvents()
    }

    async listCommands(commandsCategoriesPath = './src/commands') {
        this.commandsList = new Collection()
        const commandsCategories = readdirSync(commandsCategoriesPath)

        for (const category of commandsCategories) {
            const commandsFilesList = readdirSync(`${commandsCategoriesPath}/${category}`)

            if (!commandsFilesList) return

            for (const commandFile of commandsFilesList) {
                const { default: commandClass } = await import(`../../commands/${category}/${commandFile}`)

                try {
                    const command = new (commandClass)(this)
                    if (command.disabled) continue
                    this.commandsList.set(command.name, command)
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }

    async loadEvents(eventsFilesPath = './src/events/') {
        const eventsFilesList = readdirSync(eventsFilesPath)

        if (!eventsFilesList) return

        for (const eventFile of eventsFilesList) {
            const { default: eventClass } = await import(`../../events/${eventFile}`)

            try {
                const event = new (eventClass)(this)
                if (event.disabled) continue
                this.on(event.name, event.run)
            } catch (err) {
                console.log(err)
            }
        }
    }
}