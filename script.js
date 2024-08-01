const questions = {
  english: [
    "two hundred two",
    "three hundred fifteen",
    "four thousand six",
    "five hundred",
    "seven hundred seventy-seven",
    "one thousand one",
    "nine hundred ninety-nine",
    "eighty-four",
    "sixty-seven"
  ],
  russian: [
    "двести два",
    "триста пятнадцать",
    "четыре тысячи шесть",
    "пятьсот",
    "семьсот семьдесят семь",
    "тысяча один",
    "девятьсот девяносто девять",
    "восемьдесят четыре",
    "шестьдесят семь"
  ],
  spanish: [
    "doscientos dos",
    "trescientos quince",
    "cuatro mil seis",
    "quinientos",
    "setecientos setenta y siete",
    "mil uno",
    "novecientos noventa y nueve",
    "ochenta y cuatro",
    "sesenta y siete"
  ],
  italian: [
    "duecento due",
    "trecento quindici",
    "quattromila sei",
    "cinquecento",
    "settecento settantasette",
    "mille uno",
    "novecento novantanove",
    "ottantaquattro",
    "sessantasette"
  ],
  polish: [
    "dwieście dwa",
    "trzysta piętnaście",
    "cztery tysiące sześć",
    "pięćset",
    "siedemset siedemdziesiąt siedem",
    "tysiąc jeden",
    "dziewięćset dziewięćdziesiąt dziewięć",
    "osiemdziesiąt cztery",
    "sześćdziesiąt siedem"
  ],
  turkish: [
    "iki yüz iki",
    "üç yüz on beş",
    "dört bin altı",
    "beş yüz",
    "yedi yüz yetmiş yedi",
    "bin bir",
    "dokuz yüz doksan dokuz",
    "seksen dört",
    "altmış yedi"
  ],
  indonesian: [
    "dua ratus dua",
    "tiga ratus lima belas",
    "empat ribu enam",
    "lima ratus",
    "tujuh ratus tujuh puluh tujuh",
    "seribu satu",
    "sembilan ratus sembilan puluh sembilan",
    "delapan puluh empat",
    "enam puluh tujuh"
  ]
};

const answers = {
  english: ["202", "315", "4006", "500", "777", "1001", "999", "84", "67"],
  russian: ["202", "315", "4006", "500", "777", "1001", "999", "84", "67"],
  spanish: ["202", "315", "4006", "500", "777", "1001", "999", "84", "67"],
  italian: ["202", "315", "4006", "500", "777", "1001", "999", "84", "67"],
  polish: ["202", "315", "4006", "500", "777", "1001", "999", "84", "67"],
  turkish: ["202", "315", "4006", "500", "777", "1001", "999", "84", "67"],
  indonesian: ["202", "315", "4006", "500", "777", "1001", "999", "84", "67"]
};

let selectedQuestions = questions.english; // default to English
let selectedAnswers = answers.english; // default to English
let correctCount = 0;
let wrongCount = 0;
let currentIndex = -1;
let timer;
let timeLeft = 10;

function setLanguage(language) {
  if (questions[language]) {
    selectedQuestions = questions[language];
    selectedAnswers = answers[language];
    resetGame();
  } else {
    console.error(`Language "${language}" not found in questions`);
  }
}

const showQuestion = () => {
  currentIndex++;
  if (currentIndex >= selectedQuestions.length) {
    showModal();
    return;
  }
  updateQuestion();
  document.getElementById("remainingCount").textContent =
    selectedQuestions.length - currentIndex;
  resetTimer();
};

const updateQuestion = () => {
  document.getElementById("question").textContent =
    selectedQuestions[currentIndex];
};

const checkInput = (event) => {
  const userInput = document.getElementById("userInput").value.trim();

  if (
    event.inputType === "deleteContentBackward" ||
    event.inputType === "deleteContentForward"
  ) {
    return;
  }

  if (event.code === "Backspace" || event.code === "Delete") {
    return;
  }

  if (userInput === selectedAnswers[currentIndex]) {
    correctCount++;
    document.getElementById("correctCount").textContent = correctCount;
    showQuestion();
    document.getElementById("userInput").value = "";
  } else if (selectedAnswers[currentIndex].startsWith(userInput)) {
    return;
  } else {
    wrongCount++;
    document.getElementById("wrongCount").textContent = wrongCount;
  }
};

const resetTimer = () => {
  clearInterval(timer);
  timeLeft = 10;
  document.getElementById("timerCount").textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timerCount").textContent = timeLeft;
    if (timeLeft <= 0) {
      wrongCount++;
      document.getElementById("wrongCount").textContent = wrongCount;
      showQuestion();
    }
  }, 1000);
};

const showModal = () => {
  clearInterval(timer);
  const modal = document.querySelector(".modal");
  modal.style.display = "flex";
  document.getElementById("resultModal").style.display = "block";
  document.getElementById("modalCorrectCount").textContent = correctCount;
  document.getElementById("modalWrongCount").textContent = wrongCount;
};

const resetGame = () => {
  correctCount = 0;
  wrongCount = 0;
  currentIndex = -1;
  document.getElementById("correctCount").textContent = correctCount;
  document.getElementById("wrongCount").textContent = wrongCount;
  document.getElementById("userInput").value = "";
  document.getElementById("userInput").disabled = true;
  document.getElementById("resultModal").style.display = "none";
  document.getElementById("remainingCount").textContent =
    selectedQuestions.length;
  clearInterval(timer);
  document.getElementById("timerCount").textContent = 10;
};

const startGame = () => {
  document.getElementById("userInput").disabled = false;
  showQuestion();
};

window.onload = () => {
  document.getElementById("resultModal").style.display = "none";
  document.getElementById("userInput").addEventListener("input", checkInput);
  document.getElementById("restartButton").addEventListener("click", resetGame);
  document.getElementById("startButton").addEventListener("click", startGame);

  const languageButtons = document.querySelectorAll(".language-button");
  languageButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      setLanguage(event.target.getAttribute("data-lang"));
    });
  });

  resetGame();
};
