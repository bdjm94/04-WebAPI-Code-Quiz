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
}

var titleEl = document.getElementById("question-title");
titleEl.textContent = currentQuestion.title;
choicesEl.innerHTML = "";
