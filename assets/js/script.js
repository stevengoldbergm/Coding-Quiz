// How to make a timed question game?

// Identify the values that will change and create DOM objects for reference
var timerEl = document.querySelector(".timer-value");
var startButtonEl = document.querySelector(".start");
var answerButtonEl = document.querySelectorAll(".answer");
var listContainer = document.querySelector(".list-container")
var firstButtonEl = document.querySelector(".a1");
var secondButtonEl = document.querySelector(".a2");
var thirdButtonEl = document.querySelector(".a3");
var fourthButtonEl = document.querySelector(".a4");
var bodyParagraphEl1 = document.querySelector(".body-p1");
var bodyParagraphEl2 = document.querySelector(".body-p2");

// Create the questions and their associated answers as objects.
var first = {
    question: "Which JavaScript function should a developer use if they want to integrate a timer into their script?",
    answer: "setInterval()",
    options: ["setInterval()", "setTimeout()","moveBy()", "focus()"]
}

var second = {
    question: "Which JavaScript function should a developer use to display a pop-up box with only a message and an OK button?",
    answer: "alert()",
    options: ["alert()", "confirm()", "prompt()", "print()"]
}

var third = {
    question: "Which variable naming convention is used in JavaScript?",
    answer: "camalCase",
    options: ["camalCase", "PascalCase", "snake_case", "kebab-case"]
}

var fourth = {
    question: "In which part of the HTML document should a developer place the link to their JavaScript file?",
    answer: "<body>",
    options: ["<body>", "<head>", "<header>", "<meta>"]
}

var fifth = {
    question: "What data type is used for variables in JavaScript",
    answer: "object",
    options: ["object", "subject", "string", "integer"]
}

// Not sure if I need this anymore. Holding onto it just in case
        // var questionBlock = {
        //     questions: [first.question, second.question, third.question, fourth.question, fifth.question],
        //     goodAnswers: [first.answer, second.answer, third.answer, fourth.answer, fifth.answer],
        // }

        // console.log(questionBlock.goodAnswers[0])

// Set up listener for the Start Button
startButtonEl.addEventListener("click", startQuiz);


// Start the function on click
function startQuiz() {
    // Turn off and hide the start button. Reveal all the others.
    startButtonEl.disabled = true;
    startButtonEl.style.display = "none";
    console.log(startButtonEl.style.display);
    listContainer.style.alignItems = "flex-start"; // can't use "left"
    bodyParagraphEl1.style.display = "none";
    bodyParagraphEl2.style.display = "none";
    
    answerButtonEl.forEach(Element => {
        Element.style.display = "block"
    });
    console.log(answerButtonEl);

    // Set up questionnaire variables
    questionSelector = [first, second, third, fourth, fifth];
    randomQuestion = Math.floor(Math.random() * questionSelector.length);
    console.log(randomQuestion);

    askQuestion();
    function askQuestion() {
        // Select the first question randomly, then remove the question number from the array to ensure no questions are repeated.
        activeQuestion = questionSelector[randomQuestion];
        questionSelector.splice(randomQuestion, 1);

        console.log(questionSelector);
        console.log(activeQuestion.question);
        console.log(activeQuestion.answer);

        // Pull the answer options and randomly set them to the buttons
        // Create a loop. Do this for each answer button
        answerSelector = [activeQuestion.options[0], activeQuestion.options[1], activeQuestion.options[2], activeQuestion.options[3]];
        loopTimes = answerSelector.length

        for (var i = 0; i < loopTimes; i++) {
            randomAnswer = Math.floor(Math.random() * answerSelector.length);
            console.log(randomAnswer)

            activeAnswer = answerSelector[randomAnswer]
            answerSelector.splice(randomAnswer, 1)

            console.log(activeAnswer)
            // set the value of the button text before next loop
        }
    }
    
}






// Add an event handler to the Start Quiz button. 
    // On click, it should start the main game function.
    // Immediately disable the start button inside the function

// When the game starts, the Start button and the central paragraph need to be hidden
    // The four answer buttons should be revealed in random order.
    // The answer button container should have an event listener that will allow each button to run an answer check.
    // If the answer in the button matches the answer to the question, they win. Otherwise they lose 10 seconds from the timer.
    // On a correct answer, the element refreshes with a new question and answers 

// When the game starts, there needs to be a timer set to 75 seconds
    // NOTE: The game can function without the timer. 
    // Add the timer and the scores last.