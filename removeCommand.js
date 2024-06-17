import 'dotenv/config'
import RemoveCommands from "./src/core/infra/RemoveCommand";

new RemoveCommands(process.env.BOT_TOKEN, process.env.CLIENT_ID).removeGuildCommand('1014555852469964920', '1200187909102387260')