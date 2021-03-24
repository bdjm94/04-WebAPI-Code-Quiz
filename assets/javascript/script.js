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

function startQuiz() {
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

function quizEnd() {
    clearInterval(timerId);

    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

function saveHighscore() {
    var initials = initialsEl.value.trim();
    if (initials !== "") {
        var highscores = 
        JSON.parse(window.localStorage.getItem("highscores")) || [];
        var newScore = {
            score: time,
            initials: initials
        };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}

submitBtn.onclick = saveHighscore;
startBtn.onclick = startQuiz;
initialsEl.onkeyup = checkForEnter;

function printHighscores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });

    highscores.forEach(function(score) {
        var liTag = document.createElement("li");
        liTag.textContent = score.initials + " - " + score.score;
        var olEl = document.getElementById("highscores");
        olEl.appendChild(liTag);
    });
}

function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

printHighscores();



var questions = [
    {
      title: "In the JavaScript, which one of the following is not considered as an error?",
      choices: ["Syntax error", "Missing of semicolons", "Division by zero", "Missing of Bracket"],
      answer: "Division by zero"
    },
    {
      title: "Which of the following number object function returns the value of the number?",
      choices: [
        "toString()",
        "valueOf()",
        "toLocaleString()",
        "toPrecision()"
      ],
      answer: "valueOf()"
    },
    {
      title: "Which of the following element is responsible for making the text bold in HTML",
      choices: ["<pre>", "<a>", "<b>", "<br>"],
      answer: "<b>"
    },
    {
      title: "Boolean operators that can be used in JavaScript include:",
      choices: [
        "'And' Operator &&",
        "'Or' Operator ||",
        "'Not' Operator !",
        "All of the above"
      ],
      answer: "All of the above"
    },
    {
      title:
        "What are the types of unordered or bulleted list in HTML?",
      choices: [
        "disc, square, triangle",
        "polygon, triangle, circle",
        "disc, circle, square",
        "All of the above"
      ],
      answer: "disc, circle, square"
    },
    {
      title: "Which of the following is correct about Bootstrap cross browser consistency?",
      choices: [
        "Bootstrap uses Normalize to establish cross browser consistency",
        "Normalize.css is a modern, HTML5-ready alternative to CSS resets",
        "Normalize.css is a small CSS file that provides better cross-browser consistency in the default styling of HTML elements",
        "All of the above"
      ],
      answer: "All of the above"
    },
    {
      title: "Which of the following is correct about Bootstrap jumbotron?",
      choices: [
        "This component can optionally increase the size of headings and add a lot of margin for landing page content", 
      "To use the Jumbotron: Create a container <div> with the class of .jumbotron", 
      "Both of the above", 
      "None of the above"],
      answer: "Both of the above"
    },
    {
      title: "Which of the following sign is used as a shortcut for jQuery?",
      choices: [
        "the % sign",
        "the & sign",
        "the $ sign",
        "the @ sign"
      ],
      answer: "the $ sign"
    },
    {
      title:
        "Which of the following CSS property is used to set the horizontal alignment of a table-cell box or the block element",
      choices: ["text-align property", "text-transform property", "text-shadow property", "text-decoration"],
      answer: "text-align property"
    },
    {
      title:
        "Which of the following jQuery method is used to stop jQuery for few milliseconds?",
      choices: ["stop() method", "delay() method", "slowdown() method", "pause() method"],
      answer: "delay() method"
    },
    {
      title: "If the names of variables are the same, then which of the following type of variable takes precedence?",
      choices: ["local variable", "global variable", "both of local and global variable", "None of the above"],
      answer: "local variable"
    }
  ];


