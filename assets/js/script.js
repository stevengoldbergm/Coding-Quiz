// Create DOM objects for reference
var timerEl = document.querySelector(".timer-value");
var startButtonEl = document.querySelector(".start");
var answerButtonEl = document.querySelectorAll(".answer");
var listContainer = document.querySelector(".list-container");
var questionField = document.querySelector(".question-field");
var firstButtonEl = document.querySelector(".a1");
var secondButtonEl = document.querySelector(".a2");
var thirdButtonEl = document.querySelector(".a3");
var fourthButtonEl = document.querySelector(".a4");
var highScoreButtonEl = document.querySelector(".enter-high");
var highScoreFormEl = document.querySelector("#high-score-form");
var nameEntry = document.querySelector("#name");
var highScoreValue = document.querySelector(".body-form");
var playAgainButtonEl = document.querySelector(".try-again");
var bodyParagraphEl1 = document.querySelector(".body-p1");
var bodyParagraphEl2 = document.querySelector(".body-p2");
var responseContainer = document.querySelector(".response-container");
var answerResponse = document.querySelector(".answer-response");

// Create the questions and their associated answers as objects.
var first = {
    question: "This JavaScript function is used to integrate a looping timer.",
    answer: "setInterval()",
    options: ["setInterval()", "setTimeout()","moveBy()", "focus()"]
};

var second = {
    question: "This JavaScript function displays a pop-up box with a pre-defined message and an OK button.",
    answer: "alert()",
    options: ["alert()", "confirm()", "prompt()", "print()"]
};

var third = {
    question: "Which variable naming convention is used in JavaScript?",
    answer: "camelCase",
    options: ["camelCase", "PascalCase", "snake_case", "kebab-case"]
};

var fourth = {
    question: "In which part of the HTML document should a developer place the link to their JavaScript file?",
    answer: "<body>",
    options: ["<body>", "<head>", "<header>", "<meta>"]
};

var fifth = {
    question: "What data type is used for variables in JavaScript?",
    answer: "object",
    options: ["object", "subject", "string", "integer"]
};

// Set up listener for the Start Button
startButtonEl.addEventListener("click", startQuiz);

// Start the function on click
function startQuiz() {
    // Start Timer
    var quizComplete = false;
    var secondsLeft = 0;
    startTimer()
    function startTimer() {
        // When the game starts, there needs to be a timer set to 75 seconds
        secondsLeft = 75;
        timerEl.textContent = secondsLeft;
        setInterval(function() {
            if ((quizComplete == true) && (secondsLeft >= 0)) {
                timerEl.textContent = secondsLeft;
                clearInterval();
            } else if (secondsLeft <= 0) {
                secondsLeft = 0;
                timerEl.textContent = secondsLeft;
                clearInterval();
                youLose();
            } else {
                secondsLeft--;
                timerEl.textContent = secondsLeft;
            }
        }, 1000)
    }

    // Turn off and hide the start button, playAgain button and paragraphs. 
    // Reveal quiz buttons.
    playAgainButtonEl.style.display = "none";
    startButtonEl.disabled = true;
    startButtonEl.style.display = "none";
    listContainer.style.alignItems = "flex-start"; // can't use "left"
    bodyParagraphEl1.style.display = "none";
    bodyParagraphEl2.style.display = "none";    
    bodyParagraphEl1.style.textAlign = "start";
    bodyParagraphEl2.style.textAlign = "start";
    questionField.style.textAlign = "start";
    questionField.style.fontSize = "24px"
    
    answerButtonEl.forEach(Element => {
        Element.style.display = "block"
    });

    // Set up questionnaire variables
    var questionSelector = [first, second, third, fourth, fifth];
    var randomQuestion = Math.floor(Math.random() * questionSelector.length);
    var trueAnswer = ""
    console.log(randomQuestion);

    askQuestion();
    function askQuestion() {
        // Reset the random number to match max length of array
        randomQuestion = Math.floor(Math.random() * questionSelector.length);

        // Select the first question randomly, then remove the question number from the array to ensure no questions are repeated.
        activeQuestion = questionSelector[randomQuestion];
        questionSelector.splice(randomQuestion, 1);
        questionField.textContent = activeQuestion.question
        trueAnswer = activeQuestion.answer

        // Pull the answer options and randomly set them to the buttons
        answerSelector = [activeQuestion.options[0], activeQuestion.options[1], activeQuestion.options[2], activeQuestion.options[3]];
        loopTimes = answerSelector.length

        // Create a loop to populate answers. Do this for each answer button.
        for (var i = 0; i < loopTimes; i++) {
            randomAnswer = Math.floor(Math.random() * answerSelector.length);
            activeAnswer = answerSelector[randomAnswer];
            answerSelector.splice(randomAnswer, 1);

            if (i == 0) {
                firstButtonEl.textContent = activeAnswer;
            } else if (i == 1) {
                secondButtonEl.textContent = activeAnswer;
            } else if (i == 2) {
                thirdButtonEl.textContent = activeAnswer;
            } else {
                fourthButtonEl.textContent = activeAnswer;
            }
        }
    }

    // Start timer

    // Add event listeners for the answer buttons.
    answerButtonEl.forEach(Element => {
        Element.addEventListener("click", answerCheck)
    });

    // On click, check if the answer in the button string matches the trueAnswer string
    var answeredQuestions = 0
    function answerCheck(event) {
        if (event.currentTarget.textContent == trueAnswer) {
            // Show "Correct" in the footer and re-run askQuestion()
            answerResponse.textContent = "Correct!";
            responseContainer.style.display = "block";
            console.log(event.currentTarget.textContent);
            console.log(trueAnswer);
            answeredQuestions++
            if (answeredQuestions == 5) {
                highScore();
                removeResponse();
                return;
            }
            removeResponse();
            askQuestion();

        } else {
            // Else show "WRONG!" in the footer
            answerResponse.textContent = "Wrong. . .";
            responseContainer.style.display = "block";
            console.log(event.currentTarget.textContent);
            console.log(trueAnswer);
            // Subtract 10s from the timer.
            secondsLeft = secondsLeft - 10;
            removeResponse();
        }
    }

    // Use the setTimeout() method to remove the footer after 1.5 seconds.
    function removeResponse() {
        var myTimeout = setTimeout(function() {
            responseContainer.style.display = "none";
            }, 1500);
            clearTimeout;
    }

    function highScore() {
        answerButtonEl.forEach(Element => {
            Element.style.display = "none";
        });

        quizComplete = true;

        questionField.textContent = "You Win!";
        bodyParagraphEl1.style.display = "block";
        bodyParagraphEl2.style.display = "block";
        bodyParagraphEl1.textContent = "You had " + secondsLeft + " seconds left.";
        bodyParagraphEl2.textContent = "Save High Score?";
        highScoreValue.style.display = "block";
        listContainer.style.marginRight = "10px";
        highScoreButtonEl.style.display = "block";
        highScoreFormEl.addEventListener("submit", saveHighScore);
    }

    function saveHighScore(event) {
        event.preventDefault();

        console.log(nameEntry)
        console.log(nameEntry.value)

        var nameEntryValue = nameEntry.value

        if (!nameEntry.value) {
            return;
        } else {
            //create highscore object
            var highScoreSave = {
                name: nameEntryValue + ":",
                score: " " + secondsLeft,
            }
            console.log(highScoreSave)

            // Create an array object and pull the existing scores into it
            var highScoreArray = []

            // Check for nulls
            if (JSON.parse(localStorage.getItem("highScore")) === null) {
                highScoreArray.push(highScoreSave);
            } else {
                highScoreArray = JSON.parse(localStorage.getItem("highScore"));
                highScoreArray.push(highScoreSave);
                console.log("highscorearray",highScoreArray)
            }

            // Push new highScoreSave object to the array
            localStorage.setItem("highScore", JSON.stringify(highScoreArray))

            // Clear form, show save took place
            nameEntry.placeholder = "Score Saved!"
            nameEntry.value = ""           
            
            // Replace Save button with Play Again button
            playAgainButtonEl.style.display = "block";
            highScoreButtonEl.style.display = "none";

        }

    }

    // Create a function to save your initials and time after completing the quiz. Use the link below for details.
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
    // unhide the box and buttons to test function, otherwise you'll go insane.
    // Set the event handlers inside the function for the high score




    function youLose() {
        answerButtonEl.forEach(Element => {
            Element.style.display = "none";
        });

        questionField.textContent = "You Lose. . .";
        bodyParagraphEl1.style.display = "block";
        bodyParagraphEl2.style.display = "block";
        bodyParagraphEl1.textContent = "You ran out of time."
        bodyParagraphEl2.textContent = "Would you like to try again?";

        playAgainButtonEl.style.display = "block"; 
    }
    
}

// Play again after saving your game
playAgainButtonEl.addEventListener("click", refresh);

function refresh() {
    location.href = location.href;
}



