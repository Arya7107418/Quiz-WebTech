const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            { text: "Hyper Text Markup Language", value: 0 },
            { text: "Hyperlinks and Text Markup Language", value: 1 },
            { text: "Home Tool Markup Language", value: 2 },
            { text: "Hyperlinks and Text Markup Linguistics", value: 3 }
        ],
        answer: 0
    },
    {
        question: "Which property is used to change the background color of an element in CSS?",
        options: [
            { text: "color", value: 0 },
            { text: "background-color", value: 1 },
            { text: "bgcolor", value: 2 },
            { text: "background", value: 3 }
        ],
        answer: 1
    },
    {
        question: "What will be the output of `console.log(2 + '2')` in JavaScript?",
        options: [
            { text: "22", value: 0 },
            { text: "4", value: 1 },
            { text: "2", value: 2 },
            { text: "Error", value: 3 }
        ],
        answer: 0
    },
    {
        question: "How do you declare a variable in JSP?",
        options: [
            { text: "var myVariable;", value: 0 },
            { text: "int myVariable;", value: 1 },
            { text: "<% int myVariable; %>", value: 2 },
            { text: "<% var myVariable; %>", value: 3 }
        ],
        answer: 2
    },
    {
        question: "Which symbol is used to indicate the start of PHP code?",
        options: [
            { text: "<?php", value: 0 },
            { text: "<?", value: 1 },
            { text: "<script>", value: 2 },
            { text: "@@", value: 3 }
        ],
        answer: 0
    },
    {
        question: "Which SQL command is used to retrieve data from a MySQL database?",
        options: [
            { text: "GET", value: 0 },
            { text: "SELECT", value: 1 },
            { text: "RETRIEVE", value: 2 },
            { text: "FETCH", value: 3 }
        ],
        answer: 1
    },
    {
        question: "Which HTML element is used to create a dropdown list?",
        options: [
            { text: "<select>", value: 0 },
            { text: "<input type='dropdown'>", value: 1 },
            { text: "<dropdown>", value: 2 },
            { text: "<list>", value: 3 }
        ],
        answer: 0
    },
    {
        question: "What is the correct order of the CSS box model properties?",
        options: [
            { text: "margin, padding, border, content", value: 0 },
            { text: "padding, border, margin, content", value: 1 },
            { text: "border, margin, padding, content", value: 2 },
            { text: "content, padding, border, margin", value: 3 }
        ],
        answer: 2
    },
    {
        question: "How do you access the first element of an array in JavaScript?",
        options: [
            { text: "array[0]", value: 0 },
            { text: "array.first", value: 1 },
            { text: "array[1]", value: 2 },
            { text: "array.firstElement", value: 3 }
        ],
        answer: 0
    },
    {
        question: "Which PHP function is used to set a cookie?",
        options: [
            { text: "create_cookie()", value: 0 },
            { text: "setCookie()", value: 1 },
            { text: "cookie()", value: 2 },
            { text: "set_cookie()", value: 3 }
        ],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;

const startContainer = document.getElementById("start-container");
const quizContainer = document.getElementById("quiz-container");
const scoreContainer = document.getElementById("score-container");
const nameInput = document.getElementById("name");
const enrollmentInput = document.getElementById("enrollment");
const groupInput = document.getElementById("group");
const startForm = document.getElementById("start-form");
const startBtn = document.getElementById("start-btn");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitBtn = document.getElementById("submit-btn");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

function startTimer() {
    let timeLeft = 30; // Time in seconds
    updateTimer(timeLeft);

    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft >= 0) {
            updateTimer(timeLeft);
        } else {
            clearInterval(timerInterval);
            checkAnswer(null); // Time's up, auto-submit
        }
    }, 1000);
}

function updateTimer(timeLeft) {
    const timerElement = document.getElementById("time-left");
    timerElement.textContent = timeLeft;
}

startBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const enrollment = enrollmentInput.value.trim();
    const group = groupInput.value.trim();

    if (name === "" || enrollment === "" || group === "") {
        alert("Please fill in all fields.");
    } else {
        startContainer.style.display = "none";
        quizContainer.style.display = "block";
        loadQuestion();
        startTimer();
    }
});

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    
    optionsElement.innerHTML = "";
    currentQuestion.options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option.text;
        li.value = option.value;
        li.addEventListener("click", () => {
            selectOption(li.value);
        });
        optionsElement.appendChild(li);
    });
}

function selectOption(selectedValue) {
    const selectedOption = optionsElement.querySelector(`li[value="${selectedValue}"]`);
    const options = optionsElement.querySelectorAll("li");
    options.forEach(option => {
        option.classList.remove("selected");
    });
    selectedOption.classList.add("selected");
    submitBtn.disabled = false;
    submitBtn.addEventListener("click", () => {
        checkAnswer(selectedValue);
    });
}

function checkAnswer(selectedValue) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedValue == currentQuestion.answer) {
        feedbackElement.textContent = "Correct!";
        score++;
    } else {
        feedbackElement.textContent = "Incorrect!";
    }
    submitBtn.disabled = true;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
            loadQuestion();
            feedbackElement.textContent = "";
            submitBtn.disabled = false;
            clearInterval(timerInterval); // Reset the timer for each question
            startTimer(); // Start the timer again for the next question
        }, 1000);
    } else {
        setTimeout(() => {
            endQuiz();
        }, 1000);
    }
    updateScore();
}

function updateScore() {
    scoreElement.textContent = score;
}

function endQuiz() {
    quizContainer.style.display = "none";
    scoreContainer.style.display = "block";
    scoreElement.textContent = `Your Score: ${score}`;
}

restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
    scoreContainer.style.display = "none";
    quizContainer.style.display = "block";
    clearInterval(timerInterval); // Reset timer when restarting quiz
    startTimer();
});
