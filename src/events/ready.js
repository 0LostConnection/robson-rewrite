import EventStructure from "../components/structures/EventStructure.js"

export default class extends EventStructure {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    run = (interaction) => {
        console.log('Estou vivo!')
        this.client.deployCommands()
    }
}