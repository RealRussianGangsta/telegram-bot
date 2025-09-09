
const http = require("http");

require("dotenv").config();
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN); // токен берём из .env
const deleteDelay = process.env.DELETE_DELAY || 5000;

// Список user_id, чьи сообщения нужно удалять
const blockedUsers = [
  6303460269, // новый бот
  5367866773, // старый бот
];

// Время задержки перед удалением (в миллисекундах)
const deleteDelay1 = 1;

// Обработка всех сообщений
bot.on("message", async (ctx) => {
  const msg = ctx.message;

  if (msg.text === "/start") {
    console.log(`user ${msg.from.id} started the bot`);
    ctx.reply(`Привет, пользователь с ID ${msg.from.id}`);
  } else if (blockedUsers.includes(msg.from.id)) {
    setTimeout(async () => {
      try {
        await ctx.deleteMessage(msg.message_id);
        console.log(`Удалено сообщение от ${msg.from.username || msg.from.id}`);
      } catch (err) {
        console.error("Ошибка при удалении:", err.description || err);
      }
    }, deleteDelay1);
  }
});

// Пример фоновой задачи
setInterval(() => {
  console.log("Фоновая задача выполняется...");
  // Здесь можно добавить любой код (проверка базы, уведомления и т.д.)
}, 60000); // каждые 60 секунд

// Запуск бота
bot.launch()
  .then(() => console.log("Бот запущен!"))
  .catch((err) => console.error("Ошибка при запуске бота:", err));

// Минимальный HTTP-сервер, чтобы Render не ругался
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200);
  res.end("OK");
}).listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}`);
});
