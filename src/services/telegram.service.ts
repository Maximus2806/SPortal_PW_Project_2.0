import TelegramBot from 'node-telegram-bot-api';

// Ваш токен от BotFather
const botToken = `${process.env.TELEGRAM_BOT_TOKEN}`;
const chatId = `${process.env.TELEGRAM_CHAT_ID}`;

// Инициализация бота
const bot = new TelegramBot(botToken, { polling: false });

export async function sendNotification(message: string): Promise<void> {
  try {
    await bot.sendMessage(chatId, message);
  } catch (e) {
    console.error(e);
  }
}
