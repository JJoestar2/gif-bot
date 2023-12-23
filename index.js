require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const tgToken = process.env.BOT_TOKEN;

const bot = new TelegramBot(tgToken, { polling: true });

bot.on('message', (msg) => {
    console.log(msg);

    const Hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.chat.id,"Hello dear user");
    }
});