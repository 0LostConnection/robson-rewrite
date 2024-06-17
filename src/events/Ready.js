import EventStructure from "../core/structures/EventStructure.js"
import { BaseInteraction } from 'discord.js'
import colors from "colors"
import { table } from 'table'
import { consoleTable } from "../core/utils/loggingUtils.js"


export default class extends EventStructure {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    /**
    * @param {BaseInteraction} interaction
    */
    run = async (interaction) => {
        const botInfo = [
            ['Status:'.cyan, 'Online'.green],
            ['Name:'.cyan, `${this.client.user.tag}`.yellow],
            ['Guilds:'.cyan, `${this.client.guilds.cache.size}`.yellow],
        ]

        await consoleTable('Info', botInfo)

        await this.client.deployCommands()
        
    }
}