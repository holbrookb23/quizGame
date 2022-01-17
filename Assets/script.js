//global variables
const startBtn = document.querySelector("#start-btn");
const questionsD = document.querySelector("#question");
const answersD = document.querySelector("#answer");
const scoreD = document.querySelector("#score");
const timerD = document.querySelector("#time");
const highScoreL = document.querySelector("#highScore");
const mainD = document.querySelector("#mainD")
const mainS = document.querySelector("#mainS")
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
        question: "what is the closest planet to Earth?", 
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

let qCycle = 0;
let score = 0;
let counter = 120;
//functions
//starting the test
function startGame() {
    //hide start button
    startBtn.setAttribute("style", "display: none");

    //clear out previous question
    questionsD.textContent = "";

    
     
    questionsD.innerHTML = questions[qCycle].question;
    
    //clear out previous options
    answersD.textContent = "";
   
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

function questionToggle() {
    let clickedOption = this.value;

    if(clickedOption === questions[qCycle].answer) {
        score++;
        scoreD.textContent = score;
    } else if(counter >= 10) {
        counter -= 10;
    } else {
        createModal();
    }

    qCycle++
    
    if(qCycle < questions.length && counter > 0) {
        startGame();
    }
    
} 

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

    const highscores = JSON.parse(window.localStorage.getItem("highScores")) || [];
    let userScore =  {
        intials: initial,
        score: endScore,
    };
    highscores.push(userScore);

    window.localStorage.setItem("highScores", JSON.stringify(highscores));

    highscores.sort(function (a, b) {
        return b.score-a.score;
    });

    highscores.forEach((score) => {
        const scoreList = document.createElement("li");
        scoreList.setAttribute("style", "padding-top: .5rem;");
        scoreList.innerHTML += `${score.intials}: ${score.score}`;
        highScoreL.appendChild(scoreList);

    });

    const newG = document.createElement("button");
    newG.textContent = "Play Again?";
    newG.onclick = resetGame;
    mainS.appendChild(newG)
    
}

function createModal() {
    const modal = document.createElement("div");
    modal.setAttribute("style", "z-index: 2; position: fixed; padding: 2rem; margin: 5rem; border: black solid .1rem; background-color: white;");
    const par = document.createElement("p");
    par.textContent = "Oh no, you didnt make it in time.";
    par.setAttribute("style", "padding: 1rem;")
    modal.appendChild(par);
    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Play Again?";
    resetBtn.onclick = resetGame;
    modal.appendChild(resetBtn);
    mainD.appendChild(modal);
}

function resetGame() {
    location.reload();
}

function startTimer() {
    startGame();

    let timer = setInterval(function() {
        counter--;
        timerD.textContent = counter;

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
            createModal();
            return;
        }
    }, 1000);
}

//start button to start game
startBtn.addEventListener("click", startTimer);
