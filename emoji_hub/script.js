const emojiList = document.getElementById('emoji-list');
const searchInput = document.getElementById('search');

const fallbackEmojis = [
  { htmlCode: ["😀"], name: "grinning face", category: "smileys" },
  { htmlCode: ["😊"], name: "smiling face with smiling eyes", category: "smileys" },
  { htmlCode: ["❤️"], name: "red heart", category: "symbols" },
  { htmlCode: ["🔥"], name: "fire", category: "nature" },
  { htmlCode: ["👍"], name: "thumbs up", category: "gestures" }
];

async function fetchEmojis(searchTerm = '') {
  try {
    const localResponse = await fetch(`http://localhost:8080/api/emojis?search=${searchTerm}`);
    
    if (localResponse.ok) {
      const emojis = await localResponse.json();
      return emojis;
    }
    

    const publicResponse = await fetch(`https://emojihub.yurace.pro/api/all`);
    const allEmojis = await publicResponse.json();
    

    return allEmojis.filter(emoji => 
      emoji.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emoji.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
  } catch (error) {
    console.error("Ошибка при загрузке эмодзи:", error);

    return fallbackEmojis.filter(emoji => 
      emoji.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emoji.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}

function displayEmojis(emojis) {
  emojiList.innerHTML = '';
  
  if (!emojis || emojis.length === 0) {
    emojiList.innerHTML = '<p>Эмодзи не найдены. Попробуйте другой запрос.</p>';
    return;
  }

  emojis.forEach(emoji => {
    const emojiItem = document.createElement('div');
    emojiItem.classList.add('emoji-item');
    
    const likedEmojis = JSON.parse(localStorage.getItem('liked') || '[]');
    const isLiked = likedEmojis.includes(emoji.name);
    
    emojiItem.innerHTML = `
      <div>${emoji.htmlCode[0]}</div>
      <p>${emoji.name}</p>
      <p>${emoji.category}</p>
      <button class="like-btn" data-name="${emoji.name}">
        ${isLiked ? '❤️' : '🤍'}
      </button>
    `;
    emojiList.appendChild(emojiItem);
  });

  // Добавляем обработчики событий для кнопок
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', toggleLike);
  });
}

function toggleLike(e) {
  const emojiName = e.target.getAttribute('data-name');
  let likedEmojis = JSON.parse(localStorage.getItem('liked') || '[]');
  
  if (likedEmojis.includes(emojiName)) {
    likedEmojis = likedEmojis.filter(name => name !== emojiName);
    e.target.innerHTML = '🤍';
  } else {
    likedEmojis.push(emojiName);
    e.target.innerHTML = '❤️';
  }
  
  localStorage.setItem('liked', JSON.stringify(likedEmojis));
}

async function filterEmojis() {
  const searchTerm = searchInput.value.toLowerCase();
  const emojis = await fetchEmojis(searchTerm);
  displayEmojis(emojis);
}


filterEmojis();