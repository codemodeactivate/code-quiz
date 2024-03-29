var highScores = JSON.parse(localStorage.getItem('highScores')) || {};

const quiz =
{
    "quiz": [
      {
        "question": "What is JavaScript?",
        "choices": [
          "A programming language for web development",
          "A markup language for web development",
          "A database management system",
          "A browser extension"
        ],
        "answer": "A programming language for web development"
      },
      {
        "question": "What is a variable?",
        "choices": [
          "A container for storing data values",
          "A function that returns a value",
          "A conditional statement",
          "A loop structure"
        ],
        "answer": "A container for storing data values"
      },
      {
        "question": "What is a function?",
        "choices": [
          "A set of instructions that performs a specific task",
          "A type of variable",
          "A loop structure",
          "An event listener"
        ],
        "answer": "A set of instructions that performs a specific task"
      },
      {
        "question": "What is the DOM?",
        "choices": [
          "The Document Object Model",
          "The Desktop Object Manager",
          "The Database Object Model",
          "The Digital Output Manager"
        ],
        "answer": "The Document Object Model"
      },
      {
        "question": "What is an array?",
        "choices": [
          "A special variable that can hold multiple values",
          "A type of function",
          "A conditional statement",
          "A loop structure"
        ],
        "answer": "A special variable that can hold multiple values"
      },
      {
        "question": "What is a loop?",
        "choices": [
          "A programming structure that repeats a sequence of instructions",
          "A type of function",
          "A conditional statement",
          "An event listener"
        ],
        "answer": "A programming structure that repeats a sequence of instructions"
      },
      {
        "question": "What is an if statement?",
        "choices": [
          "A programming structure that executes code if a specified condition is true",
          "A type of function",
          "A loop structure",
          "An event listener"
        ],
        "answer": "A programming structure that executes code if a specified condition is true"
      },
      {
        "question": "What is a boolean?",
        "choices": [
          "A data type that can be either true or false",
          "A type of function",
          "A loop structure",
          "An event listener"
        ],
        "answer": "A data type that can be either true or false"
      },
      {
        "question": "What is the difference between == and ===?",
        "choices": [
          "== only compares values, while === compares both values and types",
          "== and === are identical in their function and purpose",
          "== only compares types, while === compares both types and values",
          "== only works with strings, while === works with all data types"
        ],
        "answer": "== only compares values, while === compares both values and types"
      },
      {
        "question": "What is console.log() used for?",
        "choices": [
          "Printing output to the console",
          "Executing a loop",
          "Creating an event listener",
          "Storing data in a variable"
        ],
        "answer": "Printing output to the console"
      }
    ]
  }

const questionContainer = document.getElementById("quiz-container"); //where the questions will be loaded
let currentQuestionIndex = 0; //initialize current question
const startBtn = document.getElementById("start-quiz");
const quizQuestionEle = document.getElementById("quiz-question");
const questionText = document.createElement("p");
const choicesList = document.createElement("div");
const quizIntro = document.getElementById("quiz-intro"); // Intro test + start game button
const currentQuestionEle = document.getElementById("current-question");//placeholder for current question
const quizAnswers = document.getElementById("quiz-answers");
let timeOff = 8 //initial penalty is 8 sec. setting timeoff = penaltytime so later i can add easy/medium/hard modes perhaps.
const penaltyTime = timeOff
let timeLeft = 75;
var userScore = 0;
const regModal = document.getElementById('reg-modal');
const qStatus = document.getElementById("ans-status");
var questAnswered = 0;
const highScoreModal = document.getElementById('high-score-modal');
const modalOverlay = document.querySelectorAll('modal-backdrop');
const modalClose = document.getElementById('modal-close');
const viewHighScoresLink = document.getElementById('view-high-scores');
viewHighScoresLink.addEventListener("click", displayHighScores);
const restartGameBtn = document.getElementById('restart');
const clearHighScoresBtn = document.getElementById('clear-high-scores');
const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');

let countdownTimer;

//shuffler, nested loop
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(quiz.quiz); //shuffle quest questions

quiz.quiz.forEach((question) => {
  shuffle(question.choices); //shuffle the answers of the questions
});


//Formula for handling the score//
//Correct answer = 10 points
//Incorrect answer = 8 second penalty
//Final Score = sum(points) + (time_left * 30)

function timerStart() {
countdownTimer = setInterval(() => {
  timeLeft--;
  document.getElementById('timer').innerHTML = `${timeLeft}`;
  if (timeLeft <= 0) {
    clearInterval(countdownTimer);
    // Do something when the timer ends, such as show the user's score
    document.getElementById('timer').innerHTML = "0"; //prevent score from going negative.
    displayResults();
  }
  checkQuizComplete(); //initiate helper function to see if we're done quiz earlier than timelimit
}, 1000);
}

//helper function to toggle visibility
function toggle(element) {
    if (element.classList.contains('d-none')) {
            element.classList.remove('d-none')
        } else {
            element.classList.add('d-none')
        }
}







//const currentQuestion = document.getElementById("current-question");//placeholder for current question
//const quizAnswers = document.getElementById("quiz-answers");

function pageNextQuestion() {
    // Get the quiz question from the quiz object based on the current question index
    const quizQuestions = quiz.quiz;
    const currentQuestion = quizQuestions[currentQuestionIndex];

    // Update the question text in the HTML
    questionText.innerHTML = `<p class="h5 fw-normal fs-2 text-start mb-3">` + currentQuestion.question + `</p>`;
    currentQuestionEle.appendChild(questionText);

    // Add the choices list element to the HTML
   currentQuestionEle.appendChild(choicesList);
    if (timeLeft <= 0) {
      timeLeft.innerHTML = "0"; //in case the time goes negative.
      displayResults();
    }

    // Loop through the possible answer choices and add them to the HTML
    const answerChoices = currentQuestion.choices;
    choicesList.innerHTML = ''; // clear any previous choices
    for (let i = 0; i < answerChoices.length; i++) {
      const choice = answerChoices[i];
      const choiceItem = document.createElement("p");
      const choiceBtn = document.createElement("button");
      choiceItem.setAttribute('class', 'text-left');
      choiceBtn.setAttribute('class', 'btn btn-primary choice answer-choice');
      choiceBtn.setAttribute('value', choice);
      choiceBtn.innerText = choice;
      choiceItem.appendChild(choiceBtn);
      choicesList.setAttribute('class', 'd-flex flex-column justify-content-start text-start')
      choicesList.appendChild(choiceItem);



      choiceBtn.addEventListener("click", function() {
        // Get the next question index

        //add logic if correct answer move do nothing. if wrong answer, subtract penalty number from timer. later will add the flash of text shown in gif
        if(currentQuestion.answer === choiceBtn.value) {
          qStatus.innerHTML = "CORRECT!";
        } else {
          qStatus.innerHTML = "INCORRECT!";
        }
        //Formula for handling the score//
        //Correct answer = 10 points
        //Incorrect answer = 8 second penalty
        //Final Score = sum(points) + (time_left * 30)

        if (currentQuestion.answer === choiceBtn.value) {
            //console.log("CORRECT");
            qStatus.innerHTML = "CORRECT!";
            correctSound.play();
            userScore += 10;
            questAnswered +=1;

           // console.log("quest answered" + questAnswered);
            //console.log(quizQuestions.length)
            //I like the idea of the answer validity being flashed instead of remaining as in the example gif. I commented it out, but would choose to include this if it
            //were my own design
            /*
            setTimeout(() => {
              qStatus.innerHTML = "";
              }, 500);
              */
        } else {
            //console.log("INCORRECT");
            timeLeft = timeLeft - penaltyTime;
            qStatus.innerHTML = "INCORRECT!";
            incorrectSound.play();
            questAnswered +=1;

            //I like the idea of the answer validity being flashed instead of remaining as in the example gif. I commented it out, but would choose to include this if it
            //were my own design
            //console.log("quest answered" + questAnswered);
            /*setTimeout(() => {
              qStatus.innerHTML = "";
              }, 500);
              */
        }


        const nextQuestionIndex = currentQuestionIndex + 1;

        // adding in logic to see if there are more questions to restart/callback function
        if (nextQuestionIndex >= quizQuestions.length) {

          displayResults();
          return;
        }

        // Otherwise, load the next question and answer choices
        currentQuestionIndex = nextQuestionIndex;
        pageNextQuestion();
      });

    }

  }

var highScoresString = localStorage.getItem('highScores');
function displayResults() {


    qStatus.innerHTML = "Gameover";
    //toggle(quizQuestionEle);
    quizQuestionEle.innerHTML = "";
    quizQuestionEle.innerHTML = `
                                <div class="container">
                                <div class="row">
                                <div class="col-12">

                                  <h4 class="text-start ps-5">ALL DONE!</h4>
                                  <p class="fs-3 text-start ps-5">Your Final Score is ${userScore}!</p>
                                  <div class="d-flex align-items-center">
                                    <p class="fs-3 text-start ps-5"><label for="initials">Enter Initials:</label><form method="POST" id="high-score-form"><input type="text" name="initials" id="initials" class="m-1"><button id="game-over-submit" class="btn btn-primary m-1">Submit</button></form>
                                  </div>

                                </div>
                                </div>
                                </div>`;

const form = document.getElementById('high-score-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();


var highScoresString = localStorage.getItem('highScores');
var highScores = JSON.parse(highScoresString) || {};

  initials = document.getElementById('initials').value;
  highScoresString = JSON.stringify(highScores);
  localStorage.setItem('highScores', highScoresString);

  var highScoreInstance = new bootstrap.Modal(regModal);



  highScores[initials] = userScore;


  var highScoresString = JSON.stringify(highScores);
  localStorage.setItem('highScores', highScoresString);
  var highScoreInstance = new bootstrap.Modal(regModal);
  highScores = JSON.parse(highScoresString);
  //quizQuestionEle.innerHTML = "";
  var latestScore = {
    initials: initials,
    score: userScore
  };
  Object.assign(highScores, {latestScore});

  displayHighScores(highScores);

  highScoreInstance.show();

});

}

function displayHighScores() {
  highScores = JSON.parse(highScoresString) || {};
  //var highScoreInstance = new bootstrap.Modal(regModal);
  var scores = Object.entries(highScores)
  scores = scores.slice(0,10);
  scores.sort((a,b) => b[1] - a[1]); //stackoverflow thank YOU!!
  const scoreBoard = scores.map(([initials, userScore], i) =>
  `${i + 1}. ${initials} - ${userScore}`).join("<br>");
  highScoreModal.innerHTML = scoreBoard;
  //highScoreModal.innerHTML = `<div id="modal-buttons"><button class="btn btn-primary">Restart</button><button class="btn btn-primary">Clear High Scores</button></div>`;
  //highScoreInstance.show();

}

clearHighScoresBtn.addEventListener("click", function() {
  highScoreModal.innerHTML = "";
  localStorage.removeItem('highScores');
});

restartGameBtn.addEventListener("click", function() {
  location.reload();
});

  // Listen for the "Start Quiz" button click event
startBtn.addEventListener("click", function() {
    //hide the intro to the game + start quiz button
    toggle(quizIntro);
    timerStart();
    pageNextQuestion();
    //toggle(currentQuestion)

  });


function checkQuizComplete() {
  if (questAnswered === quiz.quiz.length) {
    clearInterval(countdownTimer);
  }
}
