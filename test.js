import 'dotenv/config'
import GuildDB from './src/components/database/GuildDB.js'
import mongoose from 'mongoose'

const guildDB = new GuildDB()
guildDB.connect()

const guild = await guildDB.guild(123)

console.log(guild)

guild.save()


process.on('SIGINT', function () {
    mongoose.connection.close()
    console.log('Conexão com o MongoDB fechada devido ao encerramento do aplicativo');
    process.exit(0)
})
