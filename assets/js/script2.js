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
const questionText = document.createElement("p");
const choicesList = document.createElement("ul");
const quizIntro = document.getElementById("quiz-intro"); // Intro test + start game button
const currentQuestion = document.getElementById("current-question")//placeholder for current question


function timerStart() {
let timeLeft = 60;
const countdownTimer = setInterval(() => {
  timeLeft--;
  document.getElementById('timer').textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(countdownTimer);
    // Do something when the timer ends, such as show the user's score
  }
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


function pageNextQuestion() {
    // Get the quiz question from the quiz object based on the current question index
    const quizQuestions = quiz.quiz;
    const currentQuestion = quizQuestions[currentQuestionIndex];

    // Update the question text in the HTML
    questionText.innerText = currentQuestion.question;
    questionContainer.appendChild(questionText);

  // Loop through the possible answer choices and add them to the HTML
  const answerChoices = currentQuestion.choices;
  choicesList.innerHTML = ""; // remove old choices
  for (let i = 0; i < answerChoices.length; i++) {
    const choice = answerChoices[i];
    const choiceItem = document.createElement("li");
    const choiceBtn = document.createElement("button");
    choiceBtn.innerText = choice;
    choiceBtn.addEventListener("click", pageNextQuestion); // add event listener to next question
    choiceItem.appendChild(choiceBtn);
    choicesList.appendChild(choiceItem);
  }
  questionContainer.appendChild(choicesList);

    // Increment the current question index for the next question
    currentQuestionIndex++;

    // Remove the previous question and choices
    if (currentQuestionIndex > 1) {
        const previousQuestion = quizQuestions[currentQuestionIndex - 2];
        const previousChoicesList = document.querySelectorAll("#quiz-container ul");
        const previousChoiceBtns = document.querySelectorAll("#quiz-container button");
        previousQuestion.choices.forEach((choice, i) => {
        previousChoiceBtns[i].removeEventListener("click", pageNextQuestion); // remove previous event listener
        });
        previousChoicesList[previousChoicesList.length - 1].remove(); // remove previous choices
        previousQuestion.question = ""; // remove previous question
    }
  }






  // Listen for the "Start Quiz" button click event
startBtn.addEventListener("click", function() {
    //hide the intro to the game + start quiz button
    toggle(quizIntro);
    timerStart();
    pageNextQuestion();
    //toggle(currentQuestion)



  });
