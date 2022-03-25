const questions = [
    // {
    //     question: "What has to be broken before you can use it?",
    //     answer: "egg",
    //     hint: "Belong to chicken"
    // },
    // {
    //     question: "I'm tall when I'm young, and I'm short when I'm old. What am I?",
    //     answer: "candle",
    //     hint: "You use it to decorate birthday cake"
    // },
    // {
    //     question: "What is full of holes but still holds water?",
    //     answer: "sponge",
    //     hint: "You often use it to wash dishes"
    // },
    {
        question: "What goes up but never comes down?",
        answer: "age",
        hint: "You often show this to other people on first encounter"
    },
    {
        question: "I follow you all the time and copy your every move, but you can't touch me or catch me. What am I?",
        answer: "shadow",
        hint: "It's black"
    },
    {
        question: "I'm light as a feather, yet the strongest person can't hold me for five minutes. What am I?",
        answer: "breath",
        hint: "You will die within minutes if you lose it"
    },
    {
        question: "What invention lets you look right through a wall?",
        answer: "window",
        hint: "You can open it to see outside"
    },
    {
        question: "What goes up and down but doesn't move?",
        answer: "staircase",
        hint: "It helps you walk up the stairs"
    },
    {
        question: "What building has the most stories?",
        answer: "library",
        hint: "You can borrow many books there"
    },
    {
        question: "The more you take, the more you leave behind. What are they?",
        answer: "footsteps",
        hint: "Look down when you walk on sand and you can see them"
    },
    {
        question: "People make me, save me, change me, raise me. What am I?",
        answer: "money",
        hint: "If you can't earn enough it, your life becomes harder"
    },
    {
        question: "What has words, but never speaks?",
        answer: "book",
        hint: "You usually bring it to read at school"
    },
    {
        question: "The more of this there is, the less you see. What is it?",
        answer: "darkness",
        hint: "The direct opposite of lightness"
    }
];
const congratsMessages = {
    shortMessage: ["Nice going!", "Well done!", "Good job!", "Amazing!", "Bravo!", "Wonderful!", "Awesome!"],
    quote: [
        "Congratulations for your fabulous victory. You deserve it every bit. Aim for the stars.",
        "I know you would attain this success very soon and easily than anyone can achieve it.",
        "Celebrating the record you just set and looking forward to watching you cross your next finish line!",
        "You've worked so hard for this. Congrats!",
        "So pleased to see you accomplishing great things."
    ]
}

const encourageMessages = {
    shortMessage: ["Don't give up!", "Keep pushing!", "Keep fighting!", "You can do it!", 
                   "Give it a try!", "Believe in yourself!", "Hang in there!"],
    quote: [
        "You always pass failure on your way to success.",
        "Successful people don't fear failure but understand that it's necessary to learn and grow from.",
        "It's fine to celebrate success, but it is more important to heed the lessons of failure.",
        "Failure is a detour; not a dead-end street.",
        "Failure is a part of the process. You just learn to pick yourself back up."
    ]
}

let congrats = `<p id="congrats">Congratulation!</p>`;
let timeOver = "Your time is OVER!";
let getCongratsMessage = document.querySelector("#congratsMessage");
let getEncourageMessage = document.querySelector("#encourageMessage");

function showMessage(message, htmlElement) {
    let randomShortMess = Math.floor(Math.random()*message.shortMessage.length);
    let randomQuote = Math.floor(Math.random()*message.quote.length);
    htmlElement.children[0].innerHTML = message.shortMessage[randomShortMess];
    htmlElement.children[1].innerHTML = message.quote[randomQuote];
}

let questionsForPlayer = [];
let i = 0;
let startGameButton = document.querySelector("#startgame");
let getTypeText = document.querySelector("#typetext");
let checkButton = document.querySelector("#done");
let getCountdown = document.querySelector("#countdown");
let getAnswerArea = document.querySelector("#answerArea");
let getHintArea = document.querySelector("#hintArea");
let quesTitle = document.querySelector("#quesTitle");
let stopStatus = document.querySelector("#timeOver");
let ques = document.querySelector("#challenge");
let showHintIcon = document.querySelector("#hint");
let totalQues = questions.length;
let checkStatus = document.querySelector("#result");
let score = 0;
let showScore = document.querySelector("#score");
let reset = false;
let allHints = [];
let selectHint1 = document.querySelector("#hint1");
let selectHint2 = document.querySelector("#hint2");
let selectHint3 = document.querySelector("#hint3");



//Click "Start" button to run the game
function startGame(totalsecond) {
    callCountdownTimer(totalsecond);
    enableGamePlay();
    showFirstQuestion();
}
//End game and show "Time Out!" or "Congratulations!" and show score
function endGame(countdown0, endStatus) {
    clearInterval(countdown0);
    getAnswerArea.setAttribute("disabled", "");
    stopStatus.hidden = false;
    stopStatus.innerHTML = endStatus;
    showScore.innerHTML = score;
    getHintArea.hidden = true;
}
//Start the countdown timer and playing game with first riddle
let settingButton = document.querySelector(".dropdown");
let timeInput = document.querySelector(".dropdown-content");
function getTimeSet() {
    let minute = timeInput.children[0].children[0].children[0].valueAsNumber;
    let second = timeInput.children[0].children[0].children[1].valueAsNumber;
    return minute*60 + second;
}

function callCountdownTimer() {
    let totalsecond = getTimeSet();
    let countdown0 = setInterval(() => {
        let minute = Math.floor(totalsecond / 60);
        let second = totalsecond % 60;
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;
        getCountdown.innerHTML = `${minute}:${second}`;
        totalsecond--;
        if (totalsecond < 30) {
            getCountdown.style.color = "red";
        };
        if (totalsecond < 0) {
            endGame(countdown0, timeOver);
            getEncourageMessage.hidden = false;
            showMessage(encourageMessages, getEncourageMessage);
        } else if (score == questions.length) {
            endGame(countdown0, congrats);
            getCongratsMessage.hidden = false;
            showMessage(congratsMessages, getCongratsMessage);
        } else if (reset) {
            reset = false;
            clearInterval(countdown0);
            getCountdown.innerHTML = "00:00";
        };
    }, 1000);
}
function enableGamePlay() {
    getAnswerArea.removeAttribute("disabled");
    startGameButton.disabled = true;
    settingButton.hidden = true;
}
function showFirstQuestion() {
    let random = Math.floor(Math.random() * totalQues);
    ques.innerHTML = `<br><p>${questions[random].question}</p>`;
    questionsForPlayer.push(random);
    quesTitle.innerHTML = `Riddle ${i + 1}`;
    showRule.innerHTML = "";
    getTypeText.hidden = false;
    getTypeText.focus();
    checkButton.hidden = false;
    getHint(random);
}


function checkAnswer(i) {
    let answerGet = getTypeText.value.toLowerCase();
    let correctAnswer = questions[questionsForPlayer[i]].answer;
    //Check the answer whether it is correct or wrong
    if (answerGet != correctAnswer) {
        checkStatus.innerHTML = `<span style="color:red">Wrong answer!</span>`;
        setTimeout(() => checkStatus.innerHTML = "", 1200);
        showHintIcon.style.visibility = "visible";
        return false;
    };
    return true;
}

//Add elements to array allHints
function getHint(i) {
    let correctAnswer = questions[i].answer;
    let firstLetter = correctAnswer.charAt(0).toUpperCase();
    let answerLength = correctAnswer.length;
    let getFinalHint = questions[i].hint;
    allHints = [firstLetter, answerLength, getFinalHint];
}

let count = 0;
function showHints() {
    getHintArea.hidden = false;
    if (count == 0) {
        selectHint1.innerHTML = `Hint 1: The first letter is "${allHints[count]}".`;
    } else if (count == 1) {
        selectHint2.innerHTML = `Hint 2: The correct answer has ${allHints[count]} letters.`;
    } else if (count == 2) {
        selectHint3.innerHTML = `Hint 3: ${allHints[count]}.`;
    };
    count++;
}

function showNextQuestion() {
    if (checkAnswer(i)) {
        if (questionsForPlayer.length < totalQues) {
            let nextRandom;
            do {
                nextRandom = Math.floor(Math.random() * totalQues);
            } while (questionsForPlayer.find((value) => value == nextRandom) != undefined);
            questionsForPlayer.push(nextRandom);
            checkStatus.innerHTML = "Correct answer!";
            setTimeout(() => {
                ques.innerHTML = `<br><p>${questions[nextRandom].question}</p>`;
                checkStatus.innerHTML = "";
                getTypeText.value = "";
            }, 700);

            count = 0;
            getHint(nextRandom);
            selectHint1.innerHTML = "";
            selectHint2.innerHTML = "";
            selectHint3.innerHTML = "";

            i++;
            score++;
            quesTitle.innerHTML = `Riddle ${i + 1}`;
            showHintIcon.style.visibility = "collapse";
            getHintArea.hidden = true;
            showScore.innerHTML = score;
        } else {
            score++;
            checkStatus.innerHTML = "Correct answer!";
            showScore.innerHTML = score;
        }
    }
}

function resetGame() {
    questionsForPlayer = [];
    allHints = [];
    i = 0;
    score = 0;
    count = 0;
    quesTitle.innerHTML = "Rule";
    ques.innerHTML = "";
    showRule.innerHTML = localStorage.getItem("RulesData");
    stopStatus.innerHTML = "";
    getTypeText.value = "";
    checkStatus.innerHTML = "";
    showScore.innerHTML = "0";
    selectHint1.innerHTML = "";
    selectHint2.innerHTML = "";
    selectHint3.innerHTML = "";
    showHintIcon.style.visibility = "collapse";
    getCountdown.style.color = "#603601";
    getCongratsMessage.hidden = true;
    getEncourageMessage.hidden = true;
    getHintArea.hidden = true;
    startGameButton.disabled = false;
    getTypeText.hidden = true;
    checkButton.hidden = true;
    stopStatus.hidden = true;
    settingButton.hidden = false;
    reset = true;
    if (getAnswerArea.disabled == true) {
        reset = false;
        getCountdown.innerHTML = "00:00";
    }
}

function confirmResetGame() {
    let confirmed = window.confirm("Are you sure you want to reset your game?");
    if (confirmed) {
        resetGame();
    }
}
//Save rule to local storage and show rule before playing game
var rules = ` 
    <li>There are <b>10</b> riddles for you. Click "Start" button to start the game.</li>
    <li>When the riddle appears, type your answer to the textbox, then click "Check" button or press "Enter".</li>
    <li>
        <em>
            <b>
                <u>Note</u>:</b></em> <span>You can type the answer like the example below.</span>
    </li>
        <ul>
            <li>Riddle: <span>What is black when it's clean and white when it's dirty?</span></li>
            <li>Answer: <span>chalkboard</span></li>
        </ul>
    <li>If your answer is not correct , next riddle won't be showed.</li>
    <li>You can get some hints by clicking the icon <i class="fa-solid fa-lightbulb"></i> appearing when you type an incorrect answer or press "enter" if you don't type any answer.</li>
    <li>Every your correct answer, you score 1 point.</li>
    <li>If time is over, your game is over and you can't type anything but restart the game.</li>
    <p>
        <em>"Try to solve as much riddle as possible before your time is over. Good luck!"</em>
    </p>`;
localStorage.setItem("RulesData", rules);
let showRule = document.querySelector("#rule");
showRule.innerHTML = localStorage.getItem("RulesData");

//Dropdown processing
function preventGettingNegativeValue(element) {
    element.value = !!element.value && Math.abs(element.value) >= 0 && element.value <60 ? Math.abs(element.value) : null;
}
settingButton.addEventListener("click", () => {
    timeInput.hidden = false;
})
settingButton.addEventListener("mouseout", () => {
    timeInput.hidden = true;
})
timeInput.addEventListener("mouseover", () => {
    timeInput.hidden = false;
})