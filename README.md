<h1 align='center'>
    🤖 Robson Template - Rewrite
</h1>

<h6 align='center'>

Rewriting [Robson Bot](https://github.com/0LostConnection/Robson-Bot) using ES6.
</h6>

> **What is Robson?**<br>
> Robson is a Discord Bot template that I use in my various projects.

<br>

## 🛠️ How to use

1. **Install dependencies:**

    ```console
    npm install
    ```

2. **Configure environment variables:**

    ```console
    MONGODB_URI=
    BOT_TOKEN=
    CLIENT_ID=
    DEBUG_GUILD_ID=
    ```

3. **Start the bot:**

    ```console
    node index.js
    ```

## 📝 Todo

- [x] Implement database connectivity
- [x] Create command that use database connectivity:
- [x] Remove stream function on DiscordClientHander.js
- [x] Create dynamic setup command
- [ ] Standardize log outups
- [ ] Database: make logging optional
- [ ] Comment everything :)
