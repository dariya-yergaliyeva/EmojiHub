const emojiList = document.getElementById('emoji-list');
const searchInput = document.getElementById('search');


function displayEmojis(emojis) {
  emojiList.innerHTML = ''; 
  emojis.forEach(emoji => {
    const emojiItem = document.createElement('div');
    emojiItem.classList.add('emoji-item');
    emojiItem.innerHTML = `
      <div style="font-size: 50px;">${emoji.htmlCode[0]}</div>
      <p>${emoji.name}</p>
      <p>${emoji.category}</p>
    `;
    emojiList.appendChild(emojiItem);
  });
}


function filterEmojis() {
  const searchTerm = searchInput.value.toLowerCase();
  fetchEmojis(searchTerm);
}


async function fetchEmojis(searchTerm = '') {
  const response = await fetch(`http://localhost:8080/api/emojis?search=${searchTerm}`);
  const emojis = await response.json();
  displayEmojis(emojis);
}


// Загружаем эмодзи при загрузке страницы
fetchEmojis();