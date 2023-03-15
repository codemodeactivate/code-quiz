var timer = document.getElementById("timer");
const startQuiz = document.getElementById("start-quiz");
const quiz = document.getElementById("quiz");
const quizIntro = document.getElementById("quiz-intro");
var initialTime = 10;
const url= './assets/js/questions.json';
const corsUrl = `https://cors-anywhere.herokuapp.com/${url}`;
let currentScore; //initialize currentScore
let highScores = {}; //initialize high scores to later be stored in an object with name:score as k:v

function loadQuiz() {
    quizIntro.style.display = 'none';
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
  })
    .catch(error => console.error(error));

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
