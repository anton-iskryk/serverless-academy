const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const { Command } = require('commander');
const program = new Command();

const TOKEN = process.env.TOKEN;
const chatId = process.env.CHAT_ID;

const bot = new TelegramBot(TOKEN, { polling: true });

program
    .command('m <message>')
    .description('Write a message')
    .action((message) => {
        bot.sendMessage(chatId, message);
        console.log('You succesfully send a message');
    });

program
    .command('p <path>')
    .description('Drag an image')
    .action((path) => {
        bot.sendPhoto(chatId, path);
        console.log('You succesfully send a photo');
    });

program.parse();
