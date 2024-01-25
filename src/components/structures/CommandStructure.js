export default class CommandStructure {
    constructor(client, options) {
        this.client = client
        this.name = options.name
        this.description = options.description
        this.options = options.options
        this.default_member_permissions = options.permissions
        this.dm_permission = options.guildOnly
        this.testing = options.testing || false
        this.disabled = options.disabled
    }
}