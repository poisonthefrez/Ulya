const rulesModal = document.querySelector('.rules');
const closeRulesBtn = document.querySelector('.closerules');
const understandRulesBtn = document.querySelector('.rulesunderstand');
const startBtn = document.getElementById('startGame');
const gameField = document.getElementById('gameField');
const scoreDisplay = document.getElementById('scorePoints');
const finalScreen = document.querySelector('.finalscreen');
const summaryList = document.getElementById('summaryList'); // Элемент для итогов
const getGiftBtn = document.querySelector('.final-getgift');
const restartGameBtn = document.querySelector('.final-restart');

let score = 0;
let animalCounts = {};
let timeLeft = 30;
let gameInterval, timerInterval;
let gameRunning = false;

window.addEventListener('DOMContentLoaded', () => {
  rulesModal.style.display = 'flex';
});

closeRulesBtn.addEventListener('click', () => {
  rulesModal.style.display = 'none';
});

understandRulesBtn.addEventListener('click', () => {
  rulesModal.style.display = 'none';
});

startBtn.addEventListener('click', () => {
  if (gameRunning) return;

  gameRunning = true;
  startBtn.disabled = true;
  score = 0;
  timeLeft = 30;
  animalCounts = {};
  updateScore();
  gameField.innerHTML = '';
  finalScreen.style.display = 'none'; // Скрыть финальный экран при старте
  scoreDisplay.style.display = 'block'; // Показать счёт и время

  gameInterval = setInterval(spawnAnimal, 800);
  timerInterval = setInterval(updateTimer, 1000);
});

function updateTimer() {
  timeLeft--;

  if (timeLeft > 0) {
    updateScore(); // Обновляем счёт и время во время игры
  }

  if (timeLeft === 1) {
    startHeartRain();
  }

  if (timeLeft <= 0) {
    endGame();
  }
}

function spawnAnimal() {
  const animal = document.createElement('div');
  animal.classList.add('animal');
  animal.style.backgroundColor = getRandomPastelColor();
  const emoji = getRandomAnimalEmoji();
  animal.textContent = emoji;

  animal.addEventListener('click', () => {
    score++;
    updateScore();
    showHeart(animal);
    animal.remove();
    animalCounts[emoji] = (animalCounts[emoji] || 0) + 1;
  });

  const size = 60;
  animal.style.top = Math.random() * (gameField.clientHeight - size) + 'px';
  animal.style.left = Math.random() * (gameField.clientWidth - size) + 'px';
  gameField.appendChild(animal);

  setTimeout(() => animal.remove(), 2000);
}

function showHeart(animal) {
  const heart = document.createElement('div');
  heart.textContent = '❤️';
  heart.style.position = 'absolute';

  const rect = animal.getBoundingClientRect();
  const gameRect = gameField.getBoundingClientRect();
  heart.style.left = rect.left - gameRect.left + 20 + 'px';
  heart.style.top = rect.top - gameRect.top - 10 + 'px';
  heart.style.fontSize = '24px';
  heart.style.pointerEvents = 'none';
  heart.style.animation = 'popUp 0.8s ease forwards';
  heart.style.zIndex = '10';

  gameField.appendChild(heart);
  setTimeout(() => heart.remove(), 800);
}

function updateScore() {
  scoreDisplay.textContent = `Обнимашек: ${score} | Время: ${timeLeft}s`;
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  gameRunning = false;
  startBtn.disabled = false;

  scoreDisplay.style.display = 'none'; // Скрыть счёт и таймер после игры

  showFinalScreen(); // Показать итоговый экран
}

function showFinalScreen() {
  // Запускаем дождь сердечек
  startHeartRain();

  // Показываем финалку сразу (display:flex), чтобы opacity можно было анимировать
  finalScreen.style.display = 'flex';

  // Одновременный переход opacity
  // Добавляем класс active для финального экрана (opacity 1)
  // Убираем opacity у игрового поля (opacity 0)
  setTimeout(() => {
    gameField.style.opacity = 0;
    finalScreen.classList.add('active');
  }, 10); // небольшой таймаут, чтобы браузер применил display:flex перед анимацией

  // Обновляем текст итогов сразу
  const finalSummary = finalScreen.querySelector('.final-summary');
  finalSummary.textContent = `Ты обняла ${score} зверушек!`;

  const summaryList = document.getElementById('summaryList');
  summaryList.innerHTML = '';

  if (score === 0) {
    const noHugs = document.createElement('div');
    noHugs.textContent = 'Ты не обняла ни одного зверятка 😢';
    summaryList.appendChild(noHugs);
  } else {
    for (let emoji in animalCounts) {
      const item = document.createElement('div');
      item.textContent = `${emoji} — ${animalCounts[emoji]}`;
      summaryList.appendChild(item);
    }
  }

  // Разблокируем кнопку старта
  startBtn.disabled = false;
}
const giftMessages = [
  "Ты солнышко ☀️",
  "Ты милашка 🥰",
  "Красоточка 🌸",
  "Ты настоящий герой 💪",
  "Ты вдохновение для всех ✨",
  "Ты просто лучик света 🌟",
  "Ты шикарна 😍",
  "Ты умница и красавица 👏",
  "Ты — позитивный заряд ⚡",
  "Ты — настоящая звезда ⭐",
  "Ты излучаешь доброту 💖",
  "Ты волшебница ✨",
  "Ты обаяшка 😘",
  "Ты — радость каждого дня 😊",
  "Ты вдохновляешь меня 💡",
  "Ты — настоящая находка 🏆",
  "Ты красавица с большой буквы 💃",
  "Ты умеешь делать мир лучше 🌍",
  "Ты — самый добрый человек 💕",
  "Ты — мой личный чемпион 🏅",
  "Ты — яркий свет в темноте 🔥",
  "Ты — самая лучшая версия себя 🌈",
  "Ты — магия этого мира 🧙‍♀️",
  "Ты умеешь улыбаться сквозь трудности 😊",
  "Ты — просто чудо 🎉",
  "Ты — мой позитивный заряд 🔋",
  "Ты — лучшая подруга 🥳",
  "Ты — сказка, ставшая реальностью 📖",
  "Ты — источник счастья 🌟",
  "Ты — маленькое солнышко в душе 🌞"
];

getGiftBtn.addEventListener('click', () => {
  getGiftBtn.disabled = true;

  // Выбираем случайное сообщение из массива
  const randomIndex = Math.floor(Math.random() * giftMessages.length);
  const randomMessage = giftMessages[randomIndex];

  alert(`\n\n${randomMessage}`);
});


restartGameBtn.addEventListener('click', () => {
  finalScreen.style.display = 'none';
  score = 0;
  animalCounts = {};
  updateScore();
  gameField.innerHTML = '';
  scoreDisplay.style.display = 'block'; // показать счёт и время перед стартом новой игры
});

function getRandomAnimalEmoji() {
  const animals = ['🐻', '🐶', '🐱', '🐼', '🐰', '🦊', '🦝', '🦁', '🐨', '🐯'];
  return animals[Math.floor(Math.random() * animals.length)];
}

function getRandomPastelColor() {
  const colors = [
    'rgba(255, 204, 203, 0.7)', 'rgba(255, 179, 71, 0.7)',
    'rgba(253, 253, 150, 0.7)', 'rgba(119, 221, 119, 0.7)',
    'rgba(174, 198, 207, 0.7)', 'rgba(255, 247, 203, 0.7)',
    'rgba(184, 255, 71, 0.7)', 'rgba(119, 221, 209, 0.7)',
    'rgba(198, 174, 207, 0.7)', 'rgba(203, 170, 170, 0.7)'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function startHeartRain() {
  const heartsCount = 50;
  const rainDuration = 3000;

  for (let i = 0; i < heartsCount; i++) {
    const heart = document.createElement('div');
    const animation = heart.animate([
      { transform: `translateY(0)` },
      { transform: `translateY(110vh)` }
    ], {
      duration: rainDuration + Math.random() * 2000,
      easing: 'linear',
      delay: Math.random() * 2000
    });

    animation.onfinish = () => {
      heart.style.top = '110vh'; // ставим за экран
      // или можно сразу удалить
      heart.remove();
    };

    heart.textContent = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '-30px';
    heart.style.fontSize = (14 + Math.random() * 20) + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.opacity = '0.8';

    heart.animate([
      { transform: `translateY(0)` },
      { transform: `translateY(100vh)` }
    ], {
      duration: rainDuration + Math.random() * 2000,
      easing: 'linear',
      delay: Math.random() * 2000
    });

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), rainDuration + 3000);
  }
}
// При рестарте игры скрываем финалку и показываем игру
restartGameBtn.addEventListener('click', () => {
  finalScreen.classList.remove('active');
  finalScreen.style.display = 'none';

  gameField.style.opacity = 1;

  score = 0;
  animalCounts = {};
  updateScore();
  gameField.innerHTML = '';
});