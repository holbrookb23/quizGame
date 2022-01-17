//global variables
const startBtn = document.querySelector("#start-btn");
const questionsD = document.querySelector("#question");
const answersD = document.querySelector("#answer");
const scoreD = document.querySelector("#score");
const timerD = document.querySelector("#time");
const highScoreL = document.querySelector("#highScore");
const mainD = document.querySelector("#mainD");
const mainS = document.querySelector("#mainS");
//object of questions, options and answers
const questions = [
    {
        question: "What is the name of our Galaxy?",
        options: ["Andromeda", "Milky Way", "Gasileo", "Way Too Milky"],
        answer: "Milky Way",
    },
    {
        question: "What is the hottest planet in our solar system?", 
        options: ["Mercury", "Jupitar", "Mars", "Venus"],
        answer: "Venus",
    },
    {
        question: "How old is our solar system?", 
        options: ["2.7 Billion Years", "1.3 Billion years", "4.5 Billion Years", "2.6 Trillion Years"],
        answer: "4.5 Billion Years",
    },
    {
        question: "What is the most abundant element in the universe?", 
        options: ["Oxygen", "Phosphorus", "Hydrogen", "Nitrogen"],
        answer: "Hydrogen",
    },
    {
        question: "About how far is one light-year?", 
        options: ["6 Trillion Miles", "8 Quadrillion Miles", " 3 Billion Miles", "The walk to my alarm clock"],
        answer: "6 Trillion Miles",
    },
    {
        question: "How long does it take the Sun to rotate?", 
        options: ["4-5 Months", "25-35 Days", "46-67 Days" , "7-8 Months"],
        answer: "25-35 Days",
    },
    {
        question: "what is the closest planet to Earth? (for the longest amount of time)", 
        options: ["Venus", "Mercury", "Mars", "Saturn"],
        answer: "Mercury",
    },
    {
        question: "What is the radius of the Earth?", 
        options: ["3958.8 Miles", "4384.6 Miles", "50,126 Miles", "2954.7 Miles"],
        answer: "3958.8 Miles",
    },
    {
        question: "What is the biggest star in our galaxy?", 
        options: ["The Sun", "UY Scuti", "RW Cephei", "KY Cygni"],
        answer: "UY Scuti",
    },
    {
        question: "How many planets is the Earth from the Sun?", 
        options: ["4", "6", "5", "3"],
        answer: "3",
    },
];
//index used to cycle through the quiz
let qCycle = 0;
//user score for the quiz
let score = 0;
//timer for the quiz
let counter = 120;
//functions
//starting the test
function startGame() {
    //hide start button
    startBtn.setAttribute("style", "display: none");

    //clear out previous question
    questionsD.textContent = "";

    //cycles through quiz questions
    questionsD.innerHTML = questions[qCycle].question;
    
    //clear out previous options
    answersD.textContent = "";
   
    //creates buttons for answer options
    questions[qCycle].options.forEach((option) => {
        //create element button
        const answerBtn = document.createElement("button");
        answerBtn.textContent = option;
        //add value attribute (value and text)
        answerBtn.setAttribute("value", option);
        //add click event
        answerBtn.onclick = questionToggle;
        //append button to the answers div
        answersD.appendChild(answerBtn);
    });
}
//cycles to the next question
function questionToggle() {
    //picks out button user selected
    let clickedOption = this.value;
    //checks if selected option is equal to the answer
    if(clickedOption === questions[qCycle].answer) {
        //adds to their score if correct
        score++;
        //projects score for user to see
        scoreD.textContent = score;
    //checks if time is above or equal to 10 seconds
    } else if(counter >= 10) {
        //drops time by 10 seconds if wrong selection chosen
        counter -= 10;
    } else {
        //if wrong selection and less than 10 seconds left. restart pop up modal appears
        createModal();
    }
    //adds to the index to move to the next question
    qCycle++
    //checks if index is equal to object array length and time is above zero
    if(qCycle < questions.length && counter > 0) {
        //starts on to the next question
        startGame();
    }
    
} 

//changes the screen when the game is finished
function endGame() {
    //change to high score screen
    //changes question to high score title
    questionsD.innerHTML = "High Scores";
    //removes option buttons
    answersD.remove();
    //create the users score
    let endScore = score*counter;
    //get the users initials
    let initial = prompt("what are your initials?");
    // gets an array of object for high scores
    const highscores = JSON.parse(window.localStorage.getItem("highScores")) || [];
    //takes in user initals and final score for display
    let userScore =  {
        intials: initial,
        score: endScore,
    };
    //sends the user info to the array for highscores
    highscores.push(userScore);
    //sets the highscore into browsers storage
    window.localStorage.setItem("highScores", JSON.stringify(highscores));
    //sorts through array to display highest scores first
    highscores.sort(function (a, b) {
        return b.score-a.score;
    });
    //creates a list of all the high scores stored on the browser
    highscores.forEach((score) => {
        const scoreList = document.createElement("li");
        scoreList.setAttribute("style", "padding-top: .5rem;");
        scoreList.innerHTML += `${score.intials}: ${score.score}`;
        highScoreL.appendChild(scoreList);

    });
    //creates a play again button to start the game over
    const newG = document.createElement("button");
    newG.textContent = "Play Again?";
    newG.onclick = resetGame;
    mainS.appendChild(newG)
    
}
//creates a modal popup to alert user that they have lost the game because time ran out
function createModal() {
    const modal = document.createElement("div");
    modal.setAttribute("style", "z-index: 2; position: fixed; padding: 2rem; margin: 5rem; border: black solid .1rem; background-color: white;");
    //makes an element to tell the user they lost
    const par = document.createElement("p");
    par.textContent = "Oh no, you didnt make it in time.";
    par.setAttribute("style", "padding: 1rem;")
    modal.appendChild(par);
    //creates a button for user to play again
    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Play Again?";
    resetBtn.onclick = resetGame;
    modal.appendChild(resetBtn);
    mainD.appendChild(modal);
}
//reloads the page to play again
function resetGame() {
    location.reload();
}
//sets the timer for the game
function startTimer() {
    //starts the game
    startGame();
    //makes timer that updates per second
    let timer = setInterval(function() {
        //subtracts time from the timer
        counter--;
        //sets the time on the screen
        timerD.textContent = counter;
        //checks if questions are all completed and the time hasnt reached 0
        if (qCycle === questions.length && counter > 0) {
            // Clears interval and stops timer
            clearInterval(timer);
            endGame();
            return;
        }
        // Tests if time has run out
        if (counter === 0) {
            // Clears interval
            clearInterval(timer);
            //pop up to restart the game
            createModal();
            return;
        }
    }, 1000);
}

//start button to start game
startBtn.addEventListener("click", startTimer);
