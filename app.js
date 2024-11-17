console.log('Game Setup: Initializing Variables');

const categories = {
  Science: [
    { question: "What planet is known as the Red Planet?", answer: "Mars" },
    { question: "What gas do plants absorb from the atmosphere?", answer: "Carbon Dioxide" },
    { question: "What is the chemical symbol for water?", answer: "H2O" },
    { question: "What planet is closest to the Sun?", answer: "Mercury" },
  ],
  History: [
    { question: "Who was the first president of the United States?", answer: "George Washington" },
    { question: "What year did World War II end?", answer: "1945" },
    { question: "Who discovered America?", answer: "Christopher Columbus" },
    { question: "What year did the Titanic sink?", answer: "1912" },
  ],
  Math: [
    { question: "What is the value of pi rounded to two decimal places?", answer: "3.14" },
    { question: "What is 7 multiplied by 6?", answer: "42" },
    { question: "What is the square root of 64?", answer: "8" },
    { question: "What is 25% of 200?", answer: "50" },
  ],
};

let score = 0;
let questionCount = 0;
let askedQuestions = [];
let currentQuestion = null;

function startGame() {
  document.getElementById('intro').style.display = 'none';
  document.getElementById('quiz').style.display = 'block';
  document.getElementById('scoreboard').style.display = 'none';
  
  score = 0;
  questionCount = 0;
  askedQuestions = [];
  askQuestion();
}

function askQuestion() {
  if (questionCount >= 10) {
    endGame();
    return;
  }

  const categoryNames = Object.keys(categories);
  let chosenCategory, questionObj;

  do {
    chosenCategory = categoryNames[Math.floor(Math.random() * categoryNames.length)];
    const questions = categories[chosenCategory];
    questionObj = questions[Math.floor(Math.random() * questions.length)];
  } while (askedQuestions.includes(questionObj));

  askedQuestions.push(questionObj);
  currentQuestion = questionObj;

  document.getElementById('category').textContent = `Category: ${chosenCategory}`;
  document.getElementById('question').textContent = questionObj.question;
}

function submitAnswer() {
  const userAnswer = document.getElementById('answerInput').value.trim();
  if (!userAnswer) return alert("Please enter an answer!");

  checkAnswer(userAnswer, currentQuestion.answer);
  document.getElementById('answerInput').value = '';
}

function checkAnswer(userAnswer, correctAnswer) {
  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    score += 10;
    alert("Correct! You earned 10 points.");
  } else {
    alert(`Incorrect. The correct answer was ${correctAnswer}.`);
  }
  
  questionCount++;
  if (questionCount < 10) {
    askQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  document.getElementById('quiz').style.display = 'none';
  document.getElementById('scoreboard').style.display = 'block';
  document.getElementById('finalScore').textContent = `Game Over! Your final score is: ${score}`;
}
