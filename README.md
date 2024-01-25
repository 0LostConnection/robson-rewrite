# Robson Templase - Rewrite

Rewriting [Robson Bot](https://github.com/0LostConnection/Robson-Bot) using ES6.

## How to use:

1. **Install dependencies:**
    ```bash
    npm install
    ``````
2. **Configure environment variables:**
    ```bash
    MONGODB_URI=
    BOT_TOKEN=
    CLIENT_ID=
    DEBUG_GUILD_ID=
    ```
3. **Start the bot:**
    ```bash
    node index.js
    ```

## Todo
- [x] Implement database connectivity
- [x] Create command that use database connectivity:
- [ ] Create dynamic setup command
- [ ] Remove stream function from DiscordClientHander.js
- [ ] Standardize log outups
- [ ] Database: make logging optional