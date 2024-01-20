import { Client, Collection } from 'discord.js'
import { readdirSync } from 'fs'

export default class extends Client {
    constructor(intents) {
        super(intents)
        this.commands = []
        //this.loadCommands()
        this.loadEvents()
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