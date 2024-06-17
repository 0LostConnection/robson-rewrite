import EventStructure from "../core/structures/EventStructure.js"
import { BaseInteraction } from 'discord.js'
import colors from "colors"
import { table } from 'table'


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
        const config = {
            columns: [
                { alignment: 'center', width: 10, }
            ],
            spanningCells: [
                { col: 0, row: 0, colSpan: 2 },
            ]
        }

        const data = [
            ['Info'.blue.bold, ''], ['Status:'.cyan, 'Online'.green], ['Name:'.cyan, `${this.client.user.tag}`.yellow], ['Guilds:'.cyan, `${this.client.guilds.cache.size}`.yellow],
        ]

        this.client.deployCommands()
        console.log(`${table(data, config)}`)
    }
}