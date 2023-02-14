const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = '6016036665:AAEw4z9eO0N8UNM62AH6YVlelsKbD9nZpaU';
const bot = new TelegramBot(token, { polling: true });
// const chatId = 297446381;

const city = 'kathmandu';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const appId = 'f444636208f8844dc51166098356444a';
const URL = `${BASE_URL}?q=${city}&appid=${appId}`;

const getForecast = async () => {
  try {
    const fetchData = await axios.get(URL);

    return fetchData.data.list.slice(0, 5);
  } catch (error) {
    console.log(error);
  }
};

const showMainMenu = (msg, text) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, text, {
    reply_markup: {
      keyboard: [['Weather']],
      resize_keyboard: true,
    },
  });
};

const stopBot = (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'The bot is not working. Type \/start to have some fun');
  bot.stopPolling();
};

const revertDate = (date) => {
  const arr = date.split(' ');

  const newDate = arr[0].split('-').reverse().join('.');
  const newTime = arr[1].split(':').slice(0, 2).join(':');

  return newTime + ' ' + newDate;
};

const revertKelvinToCelcius = (kelvinTemperature) => {
  return kelvinTemperature - 273.15;
};

const getMessage = (forecast) => {
  const { 
    main,
    clouds,
    wind,
    dt_txt,
  } = forecast;

  const {
    temp,
    feels_like,
    pressure,
    humidity,
  } = main;

  const currentDate = revertDate(dt_txt);

  return `📅 Forecast on: ${currentDate}\n🌡 Temperature: ${Math.round(revertKelvinToCelcius(temp))}°C\n🥹 Feels like: ${Math.round(revertKelvinToCelcius(feels_like))}°C\n🌬 Wind: ${wind.speed}m/s\n☁️ Clouds: ${clouds.all}%\💧 Humidity: ${humidity}%\n🧭 Pressure: ${pressure}hPa\n\n`;
};

bot.on('message', (msg) => {
  if (msg.text == "/start") {
    showMainMenu(msg, 'Good, choose area');
  }
});

bot.onText(/Weather/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Hey, tap to see the forecast in Kathmandu', {
    'reply_markup': {
      keyboard: [['Forecast in Kathmandu'], ['Back to main menu']],
      resize_keyboard: true,
    },
  });
});

bot.onText(/Forecast in Kathmandu/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Choose the interval', {
    'reply_markup': {
      keyboard: [['3 hours', '6 hours'], ['Back to main menu']],
      resize_keyboard: true,
    },
  });
});

bot.onText(/3 hours/, async (msg) => {
  const chatId = msg.chat.id;
  const allForecasts = await getForecast();
  let displayingData = '';
  let interval = 1;

  for (let i = 0; i < allForecasts.length; i += interval) {
    displayingData += getMessage(allForecasts[i]);
  }

  bot.sendMessage(chatId, displayingData);
});

bot.onText(/6 hours/, async (msg) => {
  const chatId = msg.chat.id;
  const allForecasts = await getForecast();
  let displayingData = '';
  let interval = 2;

  for (let i = 0; i < allForecasts.length; i += interval) {
    displayingData += getMessage(allForecasts[i]);
  }

  bot.sendMessage(chatId, displayingData);
});

bot.onText(/Back to main menu/, (msg) => {
  showMainMenu(msg, 'Choose the area');
});

bot.onText(/\'\/stop/, (msg) => {
  stopBot(msg);
});
