var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

var currentQuestionNumber = 0;
var time = questions.length * 15;
var timerId;

fuction startQuiz() {
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    getQuestion();
}

function getQuestion() {
    var currentQuestion = questions[currentQuestionNumber];


var titleEl = document.getElementById("question-title");
titleEl.textContent = currentQuestion.title;
choicesEl.innerHTML = "";

currentQuestion.choices.forEach(function(choice, i) {
    var choiceButton = document.createElement("button");
    choiceButton.setAttribute("class", "choice");
    choiceButton.setAttribute("value", choice);
    choiceButton.textContent = i + 1 + ". " + choice;
    choiceButton.onClick = questionClick;
    choicesEl.appendChild(choiceButton);
});
}

function questionClick() {
    if (this.value !== questions[currentQuestionNumber].answer) {
        time -= 10;

        if(time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = "Incorrect";
        feedbackEl.style.color = "red";
        feedbackEl.style.fontSize = "200%"
    } else {
        feedbackEl.textContent = "Correct";
        feedbackEl.style.color = "green";
        feedbackEl.style.fontSize = "200%";
    }
    
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);
    currentQuestionNumber++;
    if(currentQuestionNumber === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}