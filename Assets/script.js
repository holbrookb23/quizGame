//global variables
const startBtn = document.querySelector("#start-btn");
const questionsD = document.querySelector("#question");
const answersD = document.querySelector("#answer");
const scoreD = document.querySelector("#score");
const timerD = document.querySelector("#time");
const highScoreL = document.querySelector("#highScore")
const questions = [
    {
        question: "this is a question",
        options: ["1", "2", "3", "4"],
        answer: "2",
    },
    {
        question: "this is another question", 
        options: ["4", "3", "2", "1"],
        answer: "3",
    },
    {
        question: "this is another question", 
        options: ["4", "3", "2", "1"],
        answer: "3",
    },
    {
        question: "this is another question", 
        options: ["4", "3", "2", "1"],
        answer: "3",
    },
    {
        question: "this is another question", 
        options: ["4", "3", "2", "1"],
        answer: "3",
    },
    {
        question: "this is another question", 
        options: ["4", "3", "2", "1"],
        answer: "3",
    },
    {
        question: "this is another question", 
        options: ["4", "3", "2", "1"],
        answer: "3",
    },
    {
        question: "this is another question", 
        options: ["4", "3", "2", "1"],
        answer: "3",
    },
    {
        question: "this is another question", 
        options: ["4", "3", "2", "1"],
        answer: "3",
    },
];


let qCycle = 0;

let score = 0
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
        answerBtn.setAttribute("style", "display: flex; flex-direction: column;");
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
    } else {
        counter -= 10;
    }
    
    qCycle++;
    
    if(qCycle < questions.length) {
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
        scoreList.innerHTML += `${score.intials}: ${score.score}`;
        highScoreL.appendChild(scoreList);

    });
    
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
        }
        // Tests if time has run out
        if (counter === 0) {
          // Clears interval
          clearInterval(timer);
          endGame();
        }
    }, 1000);
}

//start button to start game
startBtn.addEventListener("click", startTimer);
