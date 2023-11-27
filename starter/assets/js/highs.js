var scores = JSON.parse(localStorage.getItem("scores")) || [];
var ulEl = document.getElementById("highscores");
for (var i = 0; i < scores.length; i++) {
    var liEl = document.createElement("li");
    liEl.textContent = scores[i].initials + " ---" +scores[i].score
    ulEl.append(liEl)

  }