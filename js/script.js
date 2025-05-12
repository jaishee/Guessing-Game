let secretNumberInput = document.querySelector('.secretNumber');
let setSecretButton = document.querySelector('.setSecret');
let guessInput = document.querySelector('.guessInput');
let submitGuessButton = document.querySelector('.submitGuess');
let message1 = document.querySelector('.message1');
let message = document.querySelector('.message');
let attemptsDisplay = document.querySelector('.attempts');
let restartBtn = document.querySelector('.restartBtn');

let secretNumber = null;
let attempts = 5;

setSecretButton.addEventListener('click', function () {
  secretNumber = Number(secretNumberInput.value);

  // Check if the input is empty
  if (!secretNumberInput.value) {
    message1.innerHTML = "Please enter a number.";
    message1.classList.add("text-danger");
    return;
  }

  // Check if the number is between 1 and 10
  else if (secretNumber < 1 || secretNumber > 10 || isNaN(secretNumber)) {
    message1.innerHTML = "Invalid input! Enter a number between 1 and 10.";
    message1.classList.remove("text-success");
    message.classList.add("text-danger");
    return;
  }
  else{
  // Hide Player 1's input and show Player 2's guess section
  document.querySelector('.player1').classList.add('d-none');
  document.querySelector('.player2').classList.remove('d-none');
  message.innerHTML = "";  // Clear message
  }
});

submitGuessButton.addEventListener('click', function () {
  let userGuess = Number(guessInput.value);
  attempts--;

  // Check if the guess input is empty
  if (!guessInput.value) {
    message.innerHTML = "Please enter a guess.";
    message.classList.add("text-danger");
  } else if (userGuess < 1 || userGuess > 10 || isNaN(userGuess)) {
    // Check if the guess is between 1 and 10
    message.innerHTML = "Invalid guess! Enter a number between 1 and 10.";
    message.classList.remove("text-success");
    message.classList.add("text-danger");
  } else if (userGuess === secretNumber) {
    // Player 2 wins
    message.innerHTML = `Congratulations! Player 2 wins!`;
    message.classList.remove("text-danger");
    message.classList.add("text-success");
    restartBtn.classList.remove("d-none");
    guessInput.disabled = true;
    submitGuessButton.disabled = true;
  } else if (userGuess < secretNumber) {
    // Player 2's guess is too low
    message.innerHTML = "Too low. Try again!";
    message.classList.remove("text-success");
    message.classList.add("text-danger");
  } else {
    // Player 2's guess is too high
    message.innerHTML = "Too high. Try again!";
    message.classList.remove("text-success");
    message.classList.add("text-danger");
  }

  // Update the remaining attempts
  attemptsDisplay.innerHTML = `Remaining Attempts: ${attempts}`;

  // Check if Player 2 has run out of attempts
  if (attempts <= 0 && userGuess !== secretNumber) {
    message.innerHTML = `Game Over! The number was ${secretNumber}. Player 2 lost.`;
    restartBtn.classList.remove("d-none");
    guessInput.disabled = true;
    submitGuessButton.disabled = true;
  }

  guessInput.value = "";  // Clear guess input
});

restartBtn.addEventListener('click', function () {
  secretNumber = null;
  attempts = 5;
  document.querySelector('.player1').classList.remove('d-none');
  document.querySelector('.player2').classList.add('d-none');
  message.innerHTML = "";  // Clear message
  attemptsDisplay.innerHTML = `Remaining Attempts: 5`;  // Reset attempts
  guessInput.disabled = false;
  submitGuessButton.disabled = false;
  guessInput.value = "";  // Clear guess input
  secretNumberInput.value = "";  // Clear secret number input for Player 1
  restartBtn.classList.add("d-none");  // Hide restart button
});
