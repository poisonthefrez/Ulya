const gameArea = document.getElementById('game-area');
const scoreEl = document.getElementById('score');
const messageEl = document.getElementById('message');
const startBtn = document.getElementById('start-btn');

const creatures = ['🐱', '🐰', '🐼', '🐭', '🦊', '🐨', '🐻'];
const cutePhrases = [
  "Ты солнышко ☀️",
  "Ты мой лучик света ✨",
  "Ты самая милая 💖",
  "Ты — настоящее чудо 🌈",
  "Твоя улыбка согревает мир 😊",
  "Ты делаешь всё вокруг лучше 💫",
  "Ты — радость в моём дне 🌸",
  "С тобой всё кажется возможным 🌟",
  "Ты — мой маленький ангел 👼",
  "Ты лучшая, что есть 💕",
  "Ты наполняешь сердце теплом 🔥",
  "С тобой легко и светло 🌞",
  "Ты особенная, не забывай об этом 🌷",
  "Ты — источник вдохновения 🎨",
  "Ты самый нежный лучик солнца 🌅"
];

let score = 0;
const gameTime = 30; // секунд
let timerId = null;
let gameActive = false;

function randomPosition(size) {
  const maxX = gameArea.clientWidth - size;
  const maxY = gameArea.clientHeight - size;
  return {
    x: Math.floor(Math.random() * maxX),
    y: Math.floor(Math.random() * maxY)
  };
}

function createCreature() {
  const creature = document.createElement('div');
  creature.classList.add('creature');
  creature.textContent = creatures[Math.floor(Math.random() * creatures.length)];

  const pos = randomPosition(80);
  creature.style.left = pos.x + 'px';
  creature.style.top = pos.y + 'px';

  creature.addEventListener('touchstart', (e) => {
    e.preventDefault();
    onCreatureClick(creature, pos);
  });
  creature.addEventListener('click', () => {
    onCreatureClick(creature, pos);
  });

  gameArea.appendChild(creature);
}

function onCreatureClick(creature, pos) {
  if (!gameActive) return;
  if (creature.classList.contains('happy')) return;

  creature.classList.add('happy');
  score++;
  scoreEl.textContent = 'Очки: ' + score;
  showHearts(pos.x + 40, pos.y + 40);

  setTimeout(() => {
    creature.remove();
    if (gameActive) createCreature();
  }, 800);
}

function showHearts(x, y) {
  const heart = document.createElement('div');
  heart.textContent = '❤️';
  heart.style.position = 'absolute';
  heart.style.left = x + 'px';
  heart.style.top = y + 'px';
  heart.style.fontSize = '24px';
  heart.style.userSelect = 'none';
  heart.style.pointerEvents = 'none';
  heart.style.animation = 'rise 1s ease-out forwards';
  gameArea.appendChild(heart);

  setTimeout(() => heart.remove(), 1000);
}

function showGift() {
  const giftBtn = document.createElement('button');
  giftBtn.textContent = '🎁 Твой подарок!';
  giftBtn.style.marginTop = '10px';
  giftBtn.style.padding = '10px 20px';
  giftBtn.style.fontSize = '18px';
  giftBtn.style.borderRadius = '12px';
  giftBtn.style.border = 'none';
  giftBtn.style.backgroundColor = '#ffb6c1';
  giftBtn.style.color = '#fff';
  giftBtn.style.cursor = 'pointer';

  giftBtn.addEventListener('click', () => {
    const phrase = cutePhrases[Math.floor(Math.random() * cutePhrases.length)];
    alert(phrase);
  });

  messageEl.appendChild(document.createElement('br'));
  messageEl.appendChild(giftBtn);
}

startBtn.addEventListener('click', () => {
  if (gameActive) return;
  score = 0;
  scoreEl.textContent = 'Очки: 0';
  messageEl.textContent = 'Обними как можно больше зверей! Время: 30 секунд';
  gameActive = true;
  gameArea.innerHTML = '';
  createCreature();

  let timeLeft = gameTime;
  startBtn.disabled = true;

  timerId = setInterval(() => {
    timeLeft--;
    if (timeLeft > 0) {
      messageEl.textContent = `Обними как можно больше зверей! Время: ${timeLeft} секунд`;
    } else {
      clearInterval(timerId);
      gameActive = false;
      messageEl.textContent = `Ты обнял(а) ${score} зверей! Вот твой подарок за заботу:`;
      showGift();
      startBtn.disabled = false;
    }
  }, 1000);
});
