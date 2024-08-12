const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const answerButton =document.getElementById('option'); 
const startButton = document.getElementById("start-button");
const title = document.getElementById('title');
const intro = document.getElementById('intro');
const nextButton = document.getElementById('next');
const getResults = document.getElementById('results');
const scoreTracker = document.getElementById('score');
const container = document.getElementById('container');
const quizImage = document.getElementById('quiz-image');
const endMessage = document.getElementById('quiz-end');
const restartButton = document.getElementById('restart');
let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
nextButton.addEventListener('click', nextQuestion);
getResults.addEventListener('click', endQuiz);

function startGame() {
  startButton.classList.add('hide')
  title.classList.add('hide')
  intro.classList.add('hide')
  questionContainer.classList.remove('hide')
  answerButtons.classList.remove('hide')
  nextButton.classList.remove('hide')
  scoreTracker.classList.remove('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  nextQuestion()

}

function nextQuestion() {
  resetAnswers();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  currentQuestionIndex++;
}

function showQuestion(questions) {
  questionContainer.innerText = questions.question;
  answerButtons.innerHTML = "";
  quizImage.innerHTML = "";
  const image = document.createElement('img');
  image.src = questions.imageUrl;
  quizImage.appendChild(image);
  questions.answers.forEach(answers => {
    const button = document.createElement('button');
    button.textContent = answers.text;
    answerButtons.appendChild(button);
    button.addEventListener('click', checkAnswer);
    if (answers.correct) {
      button.dataset.correct = answers.correct;
  }
  })
};

function checkAnswer(event) {
  const selectedAnswer = event.target;
  const correct = selectedAnswer.dataset.correct === "true";
  let questionsInfo = questions.info;
  if (correct){
    selectedAnswer.style.backgroundColor = "lightgreen";
    incrementCorrect();
    alert(`Correct! ${questionsInfo}`);
  } else {selectedAnswer.style.backgroundColor = "red";
    alert(`Sorry! That's not the correct answer...${questionsInfo}`);
    incrementIncorrect();
  }
  if (currentQuestionIndex > shuffledQuestions){
    nextButton.classList.add('hide');
    getResults.classList.remove('hide');
    console.log("finish");
  }
  nextButton.classList.remove('hide')
  scoreTracker.classList.remove('hide')
}


function resetAnswers() {
  answerButtons.innerHTML = "";
  nextButton.classList.add('hide')
  scoreTracker.classList.add('hide')
}

function incrementCorrect () {
  let previousCorrect = parseInt(document.getElementById('right').textContent);
    document.getElementById('right').textContent = previousCorrect + 1;

}

function incrementIncorrect () {
  let previousIncorrect = parseInt(document.getElementById('wrong').textContent);
    document.getElementById('wrong').textContent = previousIncorrect + 1;

}

function endQuiz(){
  questionContainer.classList.add('hide');
  answerButtons.classList.add('hide');
  endMessage.classList.remove('hide');
  restartButton.classList.remove('hide');
  


}



