// Step 1: Game Setup and Variables
console.log('Game Setup: Initializing Variables'); 

// questions and answers
// This is to organize the questions. Note to myself: I need to redo the questions, maybe.
const categories = {
  "Science": [
    { question: "What planet is known as the Red Planet?", answer: "Mars" },
    { question: "What gas do plants absorb from the atmosphere?", answer: "Carbon Dioxide" },
    { question: "What is the chemical symbol for water?", answer: "H2O" },
    { question: "What planet is closest to the Sun?", answer: "Mercury" }
  ],
  "History": [
    { question: "Who was the first president of the United States?", answer: "George Washington" },
    { question: "What year did World War II end?", answer: "1945" },
    { question: "Who discovered America?", answer: "Christopher Columbus" },
    { question: "What year did the Titanic sink?", answer: "1912" },
  ],
  "Math": [
    { question: "What is the value of pi rounded to two decimal places?", answer: "3.14" },
    { question: "What is 7 multiplied by 6?", answer: "42" },
    { question: "What is the square root of 64?", answer: "8" },
    { question: "What is 25% of 200?", answer: "50" }
  ],
};

// to keep track 
let score = 0; // when a correct answer is given.
let questionCount = 0; // Keeps track of how many questions have been asked in this game.
let askedQuestions = []; // Stores questions that have already been asked to avoid repetition.

// here I created audio, but don't know why it is not running. 
// Audio provides feedback to the player, adding to the game experience.
const correctAudio = new Audio('correct-156911.mp3'); // Audio for correct answer
const incorrectAudio = new Audio('wrong-47985.mp3'); // Audio for incorrect answer

// Step 2: Function to Start the Game
// This function resets the game variables and begins asking questions.
function startGame() {
  console.log("Starting game..."); // Confirms the game start in the console, useful for tracking game resets
  score = 0; // Resets score at the beginning
  questionCount = 0; // Resets question counter to zero
  askedQuestions = []; // Clears the list of asked questions for a new game
  askQuestion(); // Begin the game by asking the first question
}

// Step 3: Function to Ask a Question
// This function randomly selects a question, checks if it’s unique, and prompts the player for an answer.
function askQuestion() {
  console.log("Asking a question..."); // Logs every time a new question is asked, helpful for tracking question flow

  // If 10 questions have already been asked, end the game
  if (questionCount >= 10) {
    console.log("Reached question limit; ending game..."); // Indicates when the game reaches the 10-question limit
    endGame(); // End the game when the limit is reached
    return;
  }

  // Select a random category and a random question within that category
  const categoryNames = Object.keys(categories); // Retrieves category names
  let chosenCategory, questionObj;
  
  // Loop to ensure that the question chosen hasn't been asked before
  do {
    chosenCategory = categoryNames[Math.floor(Math.random() * categoryNames.length)];
    const questions = categories[chosenCategory];
    questionObj = questions[Math.floor(Math.random() * questions.length)];
  } while (askedQuestions.includes(questionObj));

  askedQuestions.push(questionObj); // Add question to asked list to avoid repeating it

  // Display the question to the player and prompt for an answer
  const userAnswer = prompt(`Category: ${chosenCategory}\n${questionObj.question}`);
  console.log("User answer received:", userAnswer); // Logs the user's input to confirm answer capture
  
  // Only proceed if the user did not cancel the prompt
  if (userAnswer !== null) {
    checkAnswer(userAnswer, questionObj.answer); // Compare the answer
  } else {
    alert("Game stopped. Refresh to start over."); // Alert if game is stopped by user
  }
}

// Step 4: Function to Check Answer
// This function checks the player's answer and provides feedback based on correctness.
function checkAnswer(userAnswer, correctAnswer) {
  console.log("Checking answer..."); // Logs every answer check, useful for monitoring answer validation

  // If the user's answer matches the correct answer
  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    score += 10; // Award points for a correct answer
    correctAudio.currentTime = 0; // Reset correct answer audio
    console.log("Playing correct audio..."); // Confirms correct audio plays
    correctAudio.play(); // Play audio for correct answer
    alert("Correct! You earned 10 points.");
  } else {
    incorrectAudio.currentTime = 0; // Reset incorrect answer audio
    console.log("Playing incorrect audio..."); // Confirms incorrect audio plays
    incorrectAudio.play(); // Play audio for incorrect answer
    alert(`Incorrect. The correct answer was ${correctAnswer}.`);
  }
  
  questionCount++; // Increment question count after each question
  console.log(`Score: ${score}, Questions Asked: ${questionCount}`); // Logs the current score and question count

  // Continue to next question or end game
  if (questionCount < 10) {
    askQuestion(); // Move to the next question
  } else {
    endGame(); // End game after 10 questions
  }
}

// Step 5: Function to End the Game
// This function concludes the game, shows the final score, and optionally restarts the game.
function endGame() {
  console.log("Ending game..."); // Logs the end of the game, marking a session close
  alert(`Game Over! Your final score is: ${score}`); // Displays the final score to the player
  const playAgain = confirm("Do you want to play again?"); // Asks if player wants to restart
  if (playAgain) {
    startGame(); // Restart the game if user chooses to play again
  }
}

// Step 6: Initialize the Game on Page Load
// This automatically begins the game once the page fully loads.
window.onload = function() {
  console.log("Game loaded. Starting now..."); // Confirms the game loaded correctly, good for ensuring resources are ready
  startGame(); // Automatically starts the game when page is ready
};

