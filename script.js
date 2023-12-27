import questions from "./questions.js";


const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const totalScoreElement = document.querySelector(".total-score");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

let currentIndex = 0;
let questionsCorrect = 0;
let totalScore = 0;

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  questionsCorrect = 0;
  totalScore = 0;
  loadQuestion();
  clearSelectedAnswers();
};

function clearSelectedAnswers() {
  document.querySelectorAll(".answer.selected").forEach((selectedAnswer) => {
    selectedAnswer.classList.remove("selected");
  });
}

// Função para obter perguntas aleatórias
function getRandomQuestions(questions, count) {
  const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  return shuffledQuestions.slice(0, count);
}

function nextQuestion(e) {
  const selectedAnswer = e.target;
  const isCorrect = selectedAnswer.getAttribute("data-correct") === "true";

  if (isCorrect) {
    const currentQuestion = randomQuestions[currentIndex];
    totalScore += currentQuestion.answers.find(a => a.correct).score || 0;
    questionsCorrect++;
  }

  if (currentIndex < randomQuestions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

function finish() {
  textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${randomQuestions.length} perguntas.`;
  totalScoreElement.innerHTML = `Pontuação Total: ${totalScore} pontos.`;

  if (totalScore < 100) {
    textFinish.innerHTML += "<br>Continua a praticar! Tu vais melhorar!";
  }

  content.style.display = "none";
  contentFinish.style.display = "flex";
}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${randomQuestions.length}`;
  const item = randomQuestions[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;

  item.answers.forEach((answer, index) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <button class="answer" data-correct="${answer.correct}">
        ${answer.option}
      </button>
    `;

    answers.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", () => {
      clearSelectedAnswers();
      item.classList.add("selected");
      nextQuestion(event);
    });
  });
}

// Obter 10 perguntas aleatórias ao iniciar o script
const randomQuestions = getRandomQuestions(questions, 10);

// Carregar a primeira pergunta
loadQuestion();
