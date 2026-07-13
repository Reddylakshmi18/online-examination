// =======================================
// Online Quiz Examination System
// Part - 1
// =======================================

// -------------------------------
// Global Variables
// -------------------------------

let currentQuestion = 0;
let userAnswers = [];
let timer;
let timeLeft = 20 * 60; // 20 Minutes

let studentName = "";
let studentId = "";

// -------------------------------
// Start Examination
// -------------------------------

function startExam() {

    alert("Button clicked");

    studentName = document.getElementById("studentName").value.trim();
    studentId = document.getElementById("studentId").value.trim();

    if (studentName === "") {
        alert("Please enter Student Name.");
        return;
    }

    if (studentId === "") {
        alert("Please enter Registration Number.");
        return;
    }

    alert("Inputs are correct"); 

    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("quizPage").classList.remove("hidden");
    
    document.getElementById("welcomeStudent").innerHTML =
        studentName + " (" + studentId + ")";

    createPalette();
    loadQuestion();
    updateProgress();
    startTimer();
}

// -------------------------------
// Timer
// -------------------------------

function startTimer() {

    updateTimer();

    timer = setInterval(function () {

        timeLeft--;

        updateTimer();

        if (timeLeft <= 0) {

            clearInterval(timer);

            alert("Time is over!");

            submitExam();

        }

    }, 1000);

}

// -------------------------------
// Update Timer
// -------------------------------

function updateTimer() {

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("timer").innerHTML =
        minutes + ":" + seconds;

}

// -------------------------------
// Question Palette
// -------------------------------

function createPalette() {

    const palette = document.getElementById("questionPalette");

    palette.innerHTML = "";

    for (let i = 0; i < questions.length; i++) {

        let btn = document.createElement("button");

        btn.className = "palette-btn";

        btn.innerHTML = i + 1;

        btn.onclick = function () {

            currentQuestion = i;

            loadQuestion();

            updateProgress();

            updatePalette();

        };

        palette.appendChild(btn);

    }

    updatePalette();

}

// -------------------------------
// Update Palette
// -------------------------------

function updatePalette() {

    const buttons = document.querySelectorAll(".palette-btn");

    buttons.forEach(function (button, index) {

        button.classList.remove("active");

        button.classList.remove("answered");

        if (index === currentQuestion) {

            button.classList.add("active");

        }

        if (userAnswers[index] !== undefined) {

            button.classList.add("answered");

        }

    });

}

// -------------------------------
// Load Question
// -------------------------------

function loadQuestion() {

    const question = questions[currentQuestion];

    document.getElementById("questionNumber").innerHTML =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        questions.length;

    document.getElementById("questionText").innerHTML =
        question.question;

    const optionsContainer =
        document.getElementById("optionsContainer");

    optionsContainer.innerHTML = "";

    question.options.forEach(function (option, index) {

        let optionDiv = document.createElement("div");

        optionDiv.className = "option";

        if (userAnswers[currentQuestion] === index) {

            optionDiv.classList.add("selected");

        }

        optionDiv.innerHTML =
            "<strong>" +
            String.fromCharCode(65 + index) +
            ".</strong> " +
            option;

        optionDiv.onclick = function () {

            selectAnswer(index);

        };

        optionsContainer.appendChild(optionDiv);

    });

    updatePalette();

}

// -------------------------------
// Update Progress Bar
// -------------------------------

function updateProgress() {

    let progress =
        ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById("progressBar").style.width =
        progress + "%";

}

// =======================================
// End of Part - 1
// =======================================

// =======================================
// Online Quiz Examination System
// Part - 2
// =======================================

// -------------------------------
// Select Answer
// -------------------------------

function selectAnswer(optionIndex) {

    userAnswers[currentQuestion] = optionIndex;

    loadQuestion();

    updatePalette();

}

// -------------------------------
// Next Question
// -------------------------------

function nextQuestion() {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        loadQuestion();

        updateProgress();

        updatePalette();

    } else {

        let confirmSubmit = confirm(
            "You have reached the last question.\n\nDo you want to submit the examination?"
        );

        if (confirmSubmit) {

            submitExam();

        }

    }

}

// -------------------------------
// Previous Question
// -------------------------------

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        loadQuestion();

        updateProgress();

        updatePalette();

    }

}

// -------------------------------
// Clear Selected Answer
// -------------------------------

function clearAnswer() {

    if (confirm("Clear selected answer?")) {

        userAnswers[currentQuestion] = undefined;

        loadQuestion();

        updatePalette();

    }

}

// -------------------------------
// Jump to Question
// -------------------------------

function goToQuestion(questionIndex) {

    if (
        questionIndex >= 0 &&
        questionIndex < questions.length
    ) {

        currentQuestion = questionIndex;

        loadQuestion();

        updateProgress();

        updatePalette();

    }

}

// -------------------------------
// Keyboard Shortcuts
// -------------------------------

document.addEventListener("keydown", function (event) {

    switch (event.key) {

        case "ArrowRight":

            nextQuestion();

            break;

        case "ArrowLeft":

            previousQuestion();

            break;

        case "1":

            selectAnswer(0);

            break;

        case "2":

            selectAnswer(1);

            break;

        case "3":

            selectAnswer(2);

            break;

        case "4":

            selectAnswer(3);

            break;

    }

});

// -------------------------------
// Disable Right Click
// -------------------------------

document.addEventListener("contextmenu", function (event) {

    event.preventDefault();

});

// -------------------------------
// Disable Copy
// -------------------------------

document.addEventListener("copy", function (event) {

    event.preventDefault();

});

// -------------------------------
// Disable Cut
// -------------------------------

document.addEventListener("cut", function (event) {

    event.preventDefault();

});

// -------------------------------
// Disable Paste
// -------------------------------

document.addEventListener("paste", function (event) {

    event.preventDefault();

});

// -------------------------------
// Warn Before Leaving Page
// -------------------------------

window.onbeforeunload = function () {

    return "Your examination is still running.";

};

// =======================================
// End of Part - 2
// =======================================

// =======================================
// Online Quiz Examination System
// Part - 3
// =======================================

// -------------------------------
// Submit Examination
// -------------------------------

function submitExam() {

    let confirmSubmit = confirm(
        "Are you sure you want to submit the examination?"
    );

    if (!confirmSubmit) {
        return;
    }

    clearInterval(timer);

    window.onbeforeunload = null;

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    questions.forEach(function(question, index){

        if(userAnswers[index] === undefined){

            unanswered++;

        }
        else if(userAnswers[index] === question.answer){

            correct++;

        }
        else{

            wrong++;

        }

    });

    let total = questions.length;

    let percentage = ((correct / total) * 100).toFixed(2);

    document.getElementById("quizPage").classList.add("hidden");

    document.getElementById("resultPage").classList.remove("hidden");

    document.getElementById("resultStudent").innerHTML =
        studentName + " (" + studentId + ")";

    document.getElementById("totalQuestions").innerHTML = total;

    document.getElementById("correctAnswers").innerHTML = correct;

    document.getElementById("wrongAnswers").innerHTML = wrong;

    document.getElementById("unanswered").innerHTML = unanswered;

    document.getElementById("score").innerHTML =
        correct + " / " + total;

    document.getElementById("percentage").innerHTML =
        percentage + "%";

    let status = document.getElementById("status");

    if (percentage >= 40) {

        status.innerHTML = "🎉 PASS";

        status.style.color = "green";

    } else {

        status.innerHTML = "❌ FAIL";

        status.style.color = "red";

    }

}

// -------------------------------
// Auto Submit
// -------------------------------

function autoSubmit() {

    clearInterval(timer);

    window.onbeforeunload = null;

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    questions.forEach(function(question, index){

        if(userAnswers[index] === undefined){

            unanswered++;

        }
        else if(userAnswers[index] === question.answer){

            correct++;

        }
        else{

            wrong++;

        }

    });

    let total = questions.length;

    let percentage = ((correct / total) * 100).toFixed(2);

    document.getElementById("quizPage").classList.add("hidden");

    document.getElementById("resultPage").classList.remove("hidden");

    document.getElementById("resultStudent").innerHTML =
        studentName + " (" + studentId + ")";

    document.getElementById("totalQuestions").innerHTML = total;

    document.getElementById("correctAnswers").innerHTML = correct;

    document.getElementById("wrongAnswers").innerHTML = wrong;

    document.getElementById("unanswered").innerHTML = unanswered;

    document.getElementById("score").innerHTML =
        correct + " / " + total;

    document.getElementById("percentage").innerHTML =
        percentage + "%";

    let status = document.getElementById("status");

    if (percentage >= 40) {

        status.innerHTML = "🎉 PASS";

        status.style.color = "green";

    } else {

        status.innerHTML = "❌ FAIL";

        status.style.color = "red";

    }

}

// -------------------------------
// Restart Examination
// -------------------------------

function restartExam(){

    location.reload();

}