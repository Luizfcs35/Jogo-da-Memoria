const eCards = [
  `🚀`,
  "🚀",
  "🧡",
  "🧡",
  "🌜",
  "🌜",
  "👽",
  "👽",
  "🐳",
  "🐳",
  "🎵",
  "🎵",
  "🤠",
  "🤠",
  "☕",
  "☕",
  "🎮",
  "🎮",
];

const state = {
  view: {
    time: document.querySelector(".time"),
    attempts: document.querySelector(".attempts"),
  },
  values: {
    timeOf: 30,
    attemptsOf: 3,
  },
  action: {
    timer: setInterval(timeDown, 1000),
  },
};
let openCards = [];

let shufleCards = eCards.sort(() => {
  return Math.random() > 0.5 ? 2 : -1;
});

for (let i = 0; i < eCards.length; i++) {
  let card = document.createElement("div");
  card.className = "item";
  card.innerHTML = shufleCards[i];
  card.onclick = checkCard;
  document.querySelector(".game").appendChild(card);
}

// função para contagem decrescente;
function timeDown() {
  state.view.time.textContent = state.values.timeOf--;
  if (state.view.time.textContent <= 0) {
    timePause();
  }
}

// checando as  cartas clicadas;
function checkCard() {
  if (openCards.length < 2) {
    this.classList.add("cardOpen");
    openCards.push(this);
  }

  if (openCards.length == 2) {
    setTimeout(checkMatch, 500);
  }
}

// Condição de vitória;
function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("cardMatched");
    openCards[1].classList.add("cardMatched");
  } else {
    openCards[0].classList.remove("cardOpen");
    openCards[1].classList.remove("cardOpen");
  }
  // zerando a lista para novo jogo;
  openCards = [];

  let cardMatch = document.querySelectorAll(".cardMatched").length;

  if (cardMatch === eCards.length && state.view.time.textContent > 0) {
    alert("Parabéns! Você Conseguiu!");
    timePause();
  } else if (cardMatch !== eCards.length && state.view.time.textContent <= 0) {
    alert("O Tempo acabou, tente outra vez!");
    timePause();
  }
}

function playSound() {
  let audio = new Audio("./src/audio/20240410_205523.mp3");
  audio.volume = 0.1;
  audio.play();
  audio.loop = true;
}

// função para parar o tempo;
function timePause() {
  state.view.time.textContent = 0;
  clearInterval(state.action.timer);
}

playSound();