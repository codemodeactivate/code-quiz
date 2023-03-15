var timer = document.getElementById("timer");
const startQuiz = document.getElementById("start-quiz");
const quiz = document.getElementById("quiz");
var initialTime = 10;
const url= 'questions.json';
const corsUrl = `https://cors-anywhere.herokuapp.com/${url}`;

function loadQuiz() {
    fetch(corsUrl)
    .then(res => res.json())
    .then(quizLoaded => {
    console.log(quizLoaded);
  })
    .catch(error => console.error(error));

}


quiz.onclick = () => {
    console.log('ready');
    loadQuiz;
    timer.style.color = "";
    //startGame();
    //timeRemaining();
    countDown(initialTime);
    console.log(url);
    console.log(loadQuiz());

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
