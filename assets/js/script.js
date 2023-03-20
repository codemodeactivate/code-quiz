var timer = document.getElementById("timer"); //timer area
const startQuiz = document.getElementById("start-quiz"); //start game button
const quizContainer = document.getElementById("quiz-container"); //quiz area
const quizIntro = document.getElementById("quiz-intro"); //quiz introduction area
const questionContainer = document.getElementById("question-container");//question & answer area
var initialTime = 10; //initial gametime. maybe make this variable for hard mode later?
const url = './assets/js/questions.json'; //question bank - no cheating!
const corsUrl = `https://cors-anywhere.herokuapp.com/${url}`; //json workaround?
let currentScore; //initialize currentScore
let highScores = {}; //initialize high scores to later be stored in an object with name:score as k:v
//const shuffled = ""; //initializes random question order
let currentQuestionIndex = 0; //initializes index to find out which question we're on
const currentQuestion = document.getElementById('current-question');//current question div
const answerButtons = document.getElementById('quiz-answers'); //current answer button selection div
let quizData;
const answerPreview = document.getElementById("answer-preview");

let answerButton = document.querySelectorAll('.choice');


let tempQuizData = {
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





//load quiz data

function loadQuiz() {
    //quizIntro.style.display = 'none';

    quizData = tempQuizData;

    /* When I figure out this corsanywhere thing maybe I'll reenable the fancy solution. Was working when deployed but not locally for testing.
    fetch(url) //found out how to do this promise on stackoverflow and youtube
    .then(res => res.json())
    .then(data => {
        quizData = JSON.parse(JSON.stringify(data));
        console.log(quizData);
  })
    .catch(error => console.error(error));
    */

}

window.addEventListener('load', loadQuiz);
startQuiz.addEventListener('click', gameStart)





function gameStart() {
    //show questions

    toggle(quizIntro); //hide coding quiz challenge, try to answer, + start button
    //quizIntro.classList.add('d-none')
    nextQuestion();
    pageNextQuestion(); //load in next question - ex. What is JavaScript?
    //questionContainer.classList.remove('d-none');
    timer.style.color = ""; //reset color of timer to default
    //startGame();
    //timeRemaining();
    countDown(initialTime); //starts timer off @ initial time

    //answerButton.addEventListener("click", pageNextQuestion);

    //toggle(answerPreview);

}

//answerButton.addEventListener('click', answerSelected)

function answerSelected(e) {
    const selectedAnswer = e.target.value;
    const correctAnswer = quizData.quiz[currentQuestionIndex].answer;
    if (selectedAnswer === correctAnswer) {
      if (currentQuestionIndex < quizData.quiz.length - 1) {
        console.log(currentQuestionIndex);
        currentQuestionIndex++;


        nextQuestion();
      } else {
        // end quiz and show score
        // ...
      }
    }

}

/*
function questionShuffler(quiz) {
version 2.0?
}
*/

function nextQuestion() {
    var currentQuestion = quizData.quiz[currentQuestionIndex]; //initialize and then also gets next question
    answerButtons.innerHTML = ''; // clear previous answer buttons
    questionContainer.innerHTML = `<p class="h5 fw-normal fs-2 text-start mb-3">` + currentQuestion.question + `</p>`; //update question text

    currentQuestion.choices.forEach(function(choice, index){
        var choiceEle = document.createElement('button');
        choiceEle.setAttribute('class', 'btn btn-primary choice answer-choice');
        choiceEle.setAttribute('value', choice);
        choiceEle.textContent = choice;
        answerButtons.appendChild(choiceEle);

    })




}

const answerChoice = document.querySelectorAll('.answer-choice');

// Add click event listener to each button
answerButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Disable all answer buttons
    answerButtons.forEach((button) => {
      button.disabled = true;
    });

    // Load next question and set of answers
    loadQuestion();
  });
});


function pageNextQuestion() {

    toggle(questionContainer);

}

function addToHighScore() {


}






//timer

function countDown(seconds) {
    var counter = seconds;
    const interval = setInterval(() =>
    {
        timer.innerHTML = counter + " seconds remaining";
        counter--;
        if (counter < 0 ) {
            clearInterval(interval);
            timer.innerHTML = "GAME OVER";
            timer.style.color = "red";
        }

    }, 1000);

}


/*function I used to double check helper function. I spent way too long trying to find the capital L
so this will remain here, points be damned */
function eleChecker(element) {
    if (element.classList.contains('d-none')) {
        console.log("you're onto something!")
    }
}

function toggle(element) {
    if (element.classList.contains('d-none')) {
            element.classList.remove('d-none')
        } else {
            element.classList.add('d-none')
        }
}
