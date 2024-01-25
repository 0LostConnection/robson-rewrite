import Database from './Database.js'
import Guilds from './models/Guild.js'

export default class extends Database {
    constructor() {
        super(process.env.DATABASE_URI)
    }

    async guild(guildId) {
        return await Guilds.findById(guildId) || new Guilds({ _id: guildId })
    }
}
