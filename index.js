import { GatewayIntentBits } from 'discord.js'
import DiscordClientHandler from './src/components/infra/DiscordClientHandler.js'
import 'dotenv/config'

const botInstance = new DiscordClientHandler({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences
    ]
})

botInstance.login(process.env.BOT_TOKEN)