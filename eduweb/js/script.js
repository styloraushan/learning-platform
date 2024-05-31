let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () =>{
   toggleBtn.classList.replace('fa-sun', 'fa-moon');
   body.classList.add('dark');
   localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () =>{
   toggleBtn.classList.replace('fa-moon', 'fa-sun');
   body.classList.remove('dark');
   localStorage.setItem('dark-mode', 'disabled');
}

if(darkMode === 'enabled'){
   enableDarkMode();
}

toggleBtn.onclick = (e) =>{
   darkMode = localStorage.getItem('dark-mode');
   if(darkMode === 'disabled'){
      enableDarkMode();
   }else{
      disableDarkMode();
   }
}

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick = () =>{
   profile.classList.toggle('active');
   search.classList.remove('active');
}

let search = document.querySelector('.header .flex .search-form');

document.querySelector('#search-btn').onclick = () =>{
   search.classList.toggle('active');
   profile.classList.remove('active');
}

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () =>{
   sideBar.classList.toggle('active');
   body.classList.toggle('active');
}

document.querySelector('#close-btn').onclick = () =>{
   sideBar.classList.remove('active');
   body.classList.remove('active');
}

window.onscroll = () =>{
   profile.classList.remove('active');
   search.classList.remove('active');

   if(window.innerWidth < 1200){
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }
}



// quiz
const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "Q. Which of the following is not a CSS box model property?",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question: "Q. Which of the following is not a valid way to declare a function in JavaScript?",
        choices: ["function myFunction() {}", " let myFunction = function() {};", "myFunction: function() {}", "const myFunction = () => {};"],
        answer: "myFunction: function() {}"
    },
    {
        question: "Q. Which of the following is not a JavaScript data type?",
        choices: ["string", "boolean", "object", "float"],
        answer: "float"
    },
    {
        question: "Q. Which of the following is not a  data type?",
        choices: ["string", "boolean", "letter", "float"],
        answer: "letter"
    },
    {
        question: "Q. Which of the following is not a programming language?",
        choices: ["C++", "python", "java", "english"],
        answer: "english"
    },
    {
        question: "Q. What is the purpose of the this keyword in JavaScript?",
        choices: ["It refers to the current function.", "It refers to the current object.", "It refers to the parent object.", " It is used for comments."],
        answer: "It refers to the current object."
    }
];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});