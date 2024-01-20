import { Client, Collection, REST, Routes } from 'discord.js'
import { readdirSync } from 'fs'

function sendCommands(commands, options, type) {
    (async () => {
        const rest = new REST().setToken(process.env.BOT_TOKEN)

        try {
            await rest.put(options, {
                body: commands
            })
            console.log(`Registered ${commands.length} [/] ${type || ''} slash commands.`)

        } catch (err) {
            console.log(`Error registering [/] ${type || ''} slash commands.\n${err}`)
        }
    })()
}

export default class extends Client {
    constructor(intents) {
        super(intents)
        this.commandsList = []
        this.listCommands()
        this.loadEvents()
    }

    deployCommands() {
        let commandsToDeploy = []
        let testingCommandsToDeploy = []

        const testingCommandsArray = this.commandsList.filter(command => command.testing === true).toJSON()
        if (testingCommandsArray.length > 0) {
            for (const command of testingCommandsArray) {
                testingCommandsToDeploy.push({
                    name: command.name,
                    description: `${command.description} (DEBUG)`,
                    default_member_permissions: command.default_member_permissions,
                    dm_permission: command.dm_permission,
                    options: command.options,
                })
            }
            sendCommands(testingCommandsToDeploy, Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.DEBUG_GUILD_ID), 'testing')
        }

        const commandsArray = this.commandsList.filter(command => command.testing === false).toJSON()
        if (commandsArray.length > 0) {
            for (const command of commandsArray) {
                commandsToDeploy.push({
                    name: command.name,
                    description: command.description,
                    default_member_permissions: command.default_member_permissions,
                    dm_permission: command.dm_permission,
                    options: command.options,
                })
            }
            sendCommands(commandsToDeploy, Routes.applicationCommands(process.env.CLIENT_ID), 'client')
        }
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