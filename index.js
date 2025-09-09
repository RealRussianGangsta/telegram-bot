const { Telegraf } = require("telegraf");

// Токен от @BotFather
const bot = new Telegraf("8476593486:AAHg5ZOakRaryBTvP-etIz_EjT19MkewUfU");

// Список user_id, чьи сообщения нужно удалять
// Узнать свой ID можно через бота @userinfobot
const blockedUsers = [
  6303460269, // это новый бот
  5367866773, // это старый бот
];

// Время задержки перед удалением (в миллисекундах)
const deleteDelay = 1;

bot.on("message", async (ctx) => {
  const msg = ctx.message;

  // Проверяем, что отправитель в списке "заблокированных"
  if (msg.text == '/start') {
    console.log(`user ${msg.from.id} started the bot`);
    ctx.reply(`Привет, пользователь с ID ${msg.from.id}`);
  }
  else if (blockedUsers.includes(msg.from.id)) {
    setTimeout(async () => {
      try {
        await ctx.deleteMessage(msg.message_id);
        console.log(
          `Удалено сообщение от ${msg.from.username || msg.from.id}`
        );
      } catch (err) {
        console.error("Ошибка при удалении:", err.description);
      }
    }, deleteDelay);
  }
});

bot.launch();
