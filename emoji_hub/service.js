const API_URL = 'https://emojihub.yurace.pro/api/all'; // URL для получения данных

// Функция для получения всех эмодзи
async function fetchEmojis() {
  const response = await fetch(API_URL);
  const emojis = await response.json();
  return emojis;
}