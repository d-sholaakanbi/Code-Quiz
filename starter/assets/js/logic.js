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

startButton.onclick = beginQuiz;

function beginQuiz(){
   console.log("start button clicked, begin quiz fuction called");
   startDiv.setAttribute("class", "hide");
   questionsDiv.removeAttribute("class");
   timer = setInterval(oneSecondclockHandler, 1000);
   timeEl.textContent = timeLeft;
   showNextQuestion();

}

function oneSecondclockHandler(){
    timeLeft --;
    timeEl.textContent = timeLeft;
}

function showNextQuestion(){
var presentQuestion = questions[qIndex];

questionEl.textContent = presentQuestion.q;

choicesEl.innerHTML = "";

presentQuestion.ansChoices.forEach(function(option, i) {
    var btn = document.createElement("button");
    btn.setAttribute("value", option);
    btn.setAttribute("class", "choice");

    btn.textContent = i + 1 + ". " + option;

    btn.onclick = ansChoiceClick;

    choicesEl.appendChild(btn);
    
})
}

function ansChoiceClick(){
  if(this.value !== questions[qIndex].answer){
    timeLeft -= 10;

    if(timeLeft < 0){
        timeLeft = 0
    }
    feedbackEl.textContent = "Wrong Answer!!"

    timeEl.textContent = timeLeft;
  }  else {
    feedbackEl.textContent = "Riight Answer!!"
  }

  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function(){
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  qIndex ++;

  if(qIndex === questions.length){
    endQuiz();
  } else {
    showNextQuestion();
  }
}

function endQuiz(){
    //tbd
    clearInterval(timer);

  endDiv.removeAttribute("class");
  finalScoreEl.textContent = timeLeft;
  questionsDiv.setAttribute("class", "hide");

}