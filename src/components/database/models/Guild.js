import { Schema, model } from 'mongoose'

const guildSchema = new Schema({
    _id: String,
    setup: {
        roles: {
            staffRoleId: String,
            adminRoleId: String,
            modRoleId: String,
            eventsModRoleId: String,
            boostersRoleId: String,
        }
    }
})

export default model('guilds', guildSchema)