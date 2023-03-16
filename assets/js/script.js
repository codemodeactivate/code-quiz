var timer = document.getElementById("timer"); //timer area
const startQuiz = document.getElementById("start-quiz"); //start game button
const quizContainer = document.getElementById("quiz-container"); //quiz area
const quizIntro = document.getElementById("quiz-intro"); //quiz introduction area
const questionContainer = document.getElementById("question-container");//question & answer area
var initialTime = 10; //initial gametime. maybe make this variable for hard mode later?
const url= './assets/js/questions.json'; //question bank - no cheating!
const corsUrl = `https://cors-anywhere.herokuapp.com/${url}`; //json workaround?
let currentScore; //initialize currentScore
let highScores = {}; //initialize high scores to later be stored in an object with name:score as k:v
const shuffled = ""; //initializes random question order
let currentQuestionIndex = 0; //initializes index to find out which question we're on
const currentQuestion = document.getElementById('current-question');//current question div
const answerButtons = document.getElementById('quiz-answers'); //current answer button selection div
let quizData;
const answerPreview = document.getElementById("answer-preview");


//load quiz data

function loadQuiz() {
    //quizIntro.style.display = 'none';
    fetch(url) //found out how to do this promise on stackoverflow and youtube
    .then(res => res.json())
    .then(data => {
        quizData = JSON.parse(JSON.stringify(data));
        console.log(quizData);
  })
    .catch(error => console.error(error));

}
window.addEventListener('load', loadQuiz);
startQuiz.addEventListener('click', gameStart)



function gameStart() {
    //show questions

    toggle(quizIntro);
    //quizIntro.classList.add('d-none')
    pageNextQuestion();
    //questionContainer.classList.remove('d-none');
    timer.style.color = ""; //reset color
    //startGame();
    //timeRemaining();
    countDown(initialTime);
    currentQuestionIndex = 0;
    nextQuestion();
    toggle(answerPreview);

}

function answerSelected() {


}

/*
function questionShuffler(quiz) {
version 2.0?
}
*/

function nextQuestion() {
    var currentQuestion = quizData.quiz[currentQuestionIndex]; //initialize and get current question
    questionContainer.textContent = currentQuestion.question; //update question text
    currentQuestion.choices.forEach(function(choice, index){
        var choiceEle = document.createElement('button');
        choiceEle.setAttribute('class', 'btn btn-primary');
        choiceEle.setAttribute('value', choice);
        choiceEle.textContent = choice;
        answerButtons.appendChild(choiceEle);
    })


    currentQuestionIndex++; //+1!

}


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
