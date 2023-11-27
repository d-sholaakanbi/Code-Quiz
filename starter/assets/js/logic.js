var timer;
var timeLeft = 100;
var qIndex = 0;

var questionsDiv = document.getElementById("questions");
let startButton = document.getElementById("start");
var startDiv = document.getElementById("start-screen");
var timeEl = document.getElementById("time");
var questionEl = document.getElementById("question-title");
var choicesEl = document.getElementById("choices");
var feedbackEl = document.getElementById("feedback");
var endDiv = document.getElementById("end-screen");
var finalScoreEl = document.getElementById("final-score");
var initialsInput = document.getElementById("initials");
var submitButton = document.getElementById("submit");

startButton.onclick = beginQuiz;
submitButton.onclick = endQuiz; 

function beginQuiz() {
    console.log("start button clicked, begin quiz function called");
    startDiv.setAttribute("class", "hide");
    questionsDiv.removeAttribute("class");
    timer = setInterval(oneSecondclockHandler, 1000);
    timeEl.textContent = timeLeft;
    showNextQuestion();
}

function oneSecondclockHandler() {
    timeLeft--;
    timeEl.textContent = timeLeft;
}

function showNextQuestion() {
    var presentQuestion = questions[qIndex];

    questionEl.textContent = presentQuestion.q;

    choicesEl.innerHTML = "";

    presentQuestion.ansChoices.forEach(function (option, i) {
        var btn = document.createElement("button");
        btn.setAttribute("value", option);
        btn.setAttribute("class", "choice");

        btn.textContent = i + 1 + ". " + option;

        btn.onclick = ansChoiceClick;

        choicesEl.appendChild(btn);
    });
}

function ansChoiceClick() {
    if (this.value !== questions[qIndex].answer) {
        timeLeft -= 10;

        if (timeLeft < 0) {
            timeLeft = 0;
        }
        feedbackEl.textContent = "Wrong Answer!!";

        timeEl.textContent = timeLeft;
    } else {
        feedbackEl.textContent = "Right Answer!!";
    }

    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function () {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    qIndex++;

    if (qIndex === questions.length) {
        endQuiz();
    } else {
        showNextQuestion();
    }
}

function endQuiz() {
    clearInterval(timer);

    endDiv.removeAttribute("class");
    finalScoreEl.textContent = timeLeft;
    questionsDiv.setAttribute("class", "hide");

    // Adding the submit button functionality
    submitButton.onclick = function () {
        var initials = initialsInput.value.trim();

        if (initials !== "") {
            // Save the score and initials
            saveScore(initials, timeLeft)
            window.location.href = "http://127.0.0.1:5502/starter/highscores.html";
            // Redirect or display a thank you message, etc.
            console.log("Score saved! Thank you for playing.");
        } else {
            // Handle case where initials are not provided
            console.log("Please enter your initials.");
        }
        function saveScore(initials, score) {
          var scores = JSON.parse(localStorage.getItem("scores")) || [];
          scores.push({ initials: initials, score: score });
          localStorage.setItem("scores", JSON.stringify(scores));
      }
    };
}


