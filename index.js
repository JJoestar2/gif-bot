require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const tenorAxiosClient = axios.create({
    baseURL: 'https://g.tenor.com/v2',
});

const tgToken = process.env.BOT_TOKEN;

const bot = new TelegramBot(tgToken, { polling: true });

bot.on('message', async (msg) => {

    const params = {
        key: process.env.TENOR_API_TOKEN,
    };

    if (msg.text.length !== 0) {
        params.q = msg.text;
        try {
            const gifs = await tenorAxiosClient.get('/search', { params });
            bot.sendAnimation(msg.chat.id, gifs.data.results[0].media_formats.gif.url);
        } catch (err) {
            console.log(err?.message);
            bot.sendMessage(msg.chat.id, 'Something went wrong!');
        }
    }
});