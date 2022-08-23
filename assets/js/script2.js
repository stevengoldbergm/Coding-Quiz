// Define DOM objects
var ulEl = document.querySelector(".high-score-box");
var resetBtnEl = document.querySelector(".reset");

// Convert local storage string to array
var highscore = JSON.parse(localStorage.getItem("highScore"));

scoreBoard();
function scoreBoard() {
    if (!highscore) {
        highScoreValue = "Take the quiz to test your time!"
        var newLiEl = document.createElement("li");
        newLiEl.classList.add("high-score-list")
        newLiEl.textContent = highScoreValue
        console.log(newLiEl.textContent)
        ulEl.prepend(newLiEl);
        return;
    }
    
    // Function to sort the highScore items by the index.score values
    function compare(a, b) {
        if (a.score < b.score) {
            return -1;
        } else if (a.score > b.score) {
            return 1;
        } else {
            return 0;
        }
    }
    
    // Sort that array
    highscore.sort(compare);
    console.log(highscore); // it's sorted!
    
    // Create li items for each result and append them to the ul
    displayScores()
    function displayScores() {
        for (var i = 0; i< highscore.length; i++) {
            highScoreValue = highscore[i].name + highscore[i].score + " seconds left"
            // console.log(highScoreValue)
            var newLiEl = document.createElement("li");
            newLiEl.classList.add("high-score-list")
            newLiEl.textContent = highScoreValue
            console.log(newLiEl.textContent)
            ulEl.prepend(newLiEl);
        }
    }
}


// Event listener for the score reset button
resetBtnEl.addEventListener("click", resetScores);

// Reset those scores
function resetScores() {
    localStorage.clear("highScore");
    location.href = location.href;
}

