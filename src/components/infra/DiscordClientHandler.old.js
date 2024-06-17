import { Client, Collection, REST, Routes } from 'discord.js'
import { readdirSync } from 'fs'
import { table } from 'table'
import colors from 'colors'
import log from './Log.js'

function sendCommands(client, commands, options, type) {
    (async () => {
        const commandsNames = []
        commands.forEach(element => {
            commandsNames.push(element.name)
        })

        const rest = new REST().setToken(process.env.BOT_TOKEN)

        try {
            await rest.put(options, {
                body: commands
            })

            console.log(table([[`Commands - ${type}`.cyan.bold, `${commandsNames.join(', ')}`.yellow.italic]], {
                columnDefault:
                    { width: 30 },
                columns: [
                    { alignment: 'center' }
                ]
            }))
        } catch (err) {
            log({ title: `Startup: sendCommands: Error registering [/] ${type || ''} slash commands.`, message: err }, 'ERROR')
        }
    })()
}

export default class extends Client {
    constructor(intents) {
        super(intents)
        this.commandsList = []
        this.eventsList = []
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
            sendCommands(this, testingCommandsToDeploy, Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.DEBUG_GUILD_ID), 'Testing')
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
            sendCommands(this, commandsToDeploy, Routes.applicationCommands(process.env.CLIENT_ID), 'Client')
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
                    log({ title: 'Startup: listCommands: Error listing commands.', message: err }, 'ERROR')
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
                this.eventsList.push(event.name)
                this.on(event.name, event.run)
            } catch (err) {
                log({ title: 'Startup: loadEvents: Error loading events.', message: err }, 'ERROR')
            }
        }

        console.log(table([['Events'.cyan.bold, `${this.eventsList.join(', ')}`.yellow.italic]], {
            columnDefault:
                { width: 30 },
            columns: [
                { alignment: 'center' }
            ]
        }))
    }
}