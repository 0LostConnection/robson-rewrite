import CommandStructure from '../../components/structures/CommandStructure.js'

export default class extends CommandStructure {
    constructor(client) {
        super(client, {
            name: 'hello',
            description: 'Hello World!',
            disabled: false,
            deafult_member_permissions: null,
            dm_permission: true,
            testing: false
        })
    }

    run = (interaction) => {
        interaction.reply({ content: 'Hello World! :slight_smile:' })
    }
}