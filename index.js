const questionElement = document.getElementById("questions");
const answerBtn = document.getElementById("answers");
const nextBtn = document.getElementById("next");
const questions = [
    {
        question: "what color is kirby?",
        answers: [
            { text: "blue", correct: false},
            { text: "yellow", correct: false},
            { text: "pink", correct: true},
            { text: "red", correct: false}
        ]
    },
    {
        question: "what type is dragonair?",
        answers: [
            { text: "dragon / flying", correct: false},
            { text: "dragon", correct: true},
            { text: "dragon / water", correct: false},
            { text: "water", correct: false},
        ]
    },
    {
        question: "who is the squeak squad boss in kirby: squeak squad?",
        answers: [
            { text: "daraoch", correct: true},
            { text: "spinni", correct: false},
            { text: "sporo", correct: false},
            { text: "doc", correct: false},
        ]
    },
    {
        question: "who is the 6th gym leader in pokemon red / blue?",
        answers: [
            { text: "koga", correct: false},
            { text: "blaine", correct: false},
            { text: "eirika", correct: false},
            { text: "sabrina", correct: true},
        ]
    },
    {
        question: "what is meta knights choice of weapon?",
        answers: [
            { text: "bombs", correct: false},
            { text: "sword", correct: true},
            { text: "boomerang", correct: false},
            { text: "fists", correct: false},
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "next question";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("answer");
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}
function selectAnswer(event){
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = "your score is " + score + " out of " + questions.length + "!";
    nextBtn.innerHTML = "play again";
    nextBtn.style.display = "block";
};

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
};

nextBtn.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else {
        startQuiz();
    }
});

startQuiz();