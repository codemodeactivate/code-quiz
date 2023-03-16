var timer = document.getElementById("timer"); //timer area
const startQuiz = document.getElementById("start-quiz"); //start game button
const quiz = document.getElementById("quiz"); //quiz area
const quizIntro = document.getElementById("quiz-intro"); //quiz introduction area
var initialTime = 10; //initial gametime. maybe make this variable for hard mode later?
const url= './assets/js/questions.json'; //question bank - no cheating!
const corsUrl = `https://cors-anywhere.herokuapp.com/${url}`; //json workaround?
let currentScore; //initialize currentScore
let highScores = {}; //initialize high scores to later be stored in an object with name:score as k:v


function loadQuiz() {
    quizIntro.style.display = 'none';
    fetch(url) //found out how to do this promise on stackoverflow and youtube
    .then(res => res.json())
    .then(data => {
        console.log(data);
  })
    .catch(error => console.error(error));

}

function gameStart( ) {


}

function answerSelected() {


}


function pageNextQuestion() {

}

function addToHighScore() {


}

quiz.onclick = () => {
    console.log('ready');
    console.log(quizIntro);
    loadQuiz();
    timer.style.color = "";
    //startGame();
    //timeRemaining();
    countDown(initialTime);



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
