const questions = [
    {
      question: "What programming language is commonly used for web development to make websites interactive?",
      choices: ["Java", "JavaScript", "Python"],
      correctAnswer: "JavaScript"
    },
    {
      question: "Which keyword is used to declare a variable in JavaScript?",
      choices: ["Variable", "V", "var", "let"],
      correctAnswer: "var"
    },
    {
      question: " Which of the following is used to display a message in a popup dialog in JavaScript?",
      choices: ["confirm()", "alert()", "log()", "prompt()"],
      correctAnswer: "alert()"
    },
    {
      question: "How do you write a single-line comment in JavaScript?",
      choices: ["/* This is a comment */", "' This is a comment", "// This is a comment", " <!-- This is a comment -->"],
      correctAnswer: "// This is a comment"
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 60;
  let timerInterval;
  
  const startButton = document.getElementById("start-button");
  const startScreen = document.getElementById("start-screen");
  const quizSection = document.getElementById("quiz");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices");
  const feedbackText = document.getElementById("feedback");
  const finalScore = document.getElementById("final-score");
  const initialsInput = document.getElementById("initials");
  const submitScoreButton = document.getElementById("submit-score");
  const popup = document.getElementById("popup");
  const highScoresSection = document.getElementById("high-scores");
  const highScoresList = document.getElementById("high-scores-list");
  const countdownDisplay = document.getElementById("countdown");
  
  startButton.addEventListener("click", startQuiz);
  
  function startQuiz() {
    startScreen.style.display = "none";
    quizSection.style.display = "block";
    showQuestion();
    startTimer();
  }
  
  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
  
    choicesList.innerHTML = "";
  
    currentQuestion.choices.forEach((choice, index) => {
      const li = document.createElement("li");
      const choiceButton = document.createElement("button");
      choiceButton.textContent = choice;
      choiceButton.setAttribute("data-index", index);
      choiceButton.addEventListener("click", checkAnswer);
      li.appendChild(choiceButton);
      choicesList.appendChild(li);
    });
  }
  
  function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
  }
  
  function updateTimer() {
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timerInterval);
      endQuiz();
    } else {
      document.getElementById("timer").textContent = timeLeft;
    }
  }
  
  function checkAnswer(event) {
    const selectedChoiceIndex = parseInt(event.target.getAttribute("data-index"));
    const currentQuestion = questions[currentQuestionIndex];
  
    if (currentQuestion.correctAnswer === currentQuestion.choices[selectedChoiceIndex]) {
      score++;
      showPopup("Correct!");
    } else {
      timeLeft -= 10; 
      showPopup("Incorrect!");
    }
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }
  
  
  function endQuiz() {
    quizSection.style.display = "none";
    finalScore.textContent = score;
    document.getElementById("game-over").style.display = "block";
  
    const userInitials = initialsInput.value;
    if (userInitials) {
      const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
      highScores.push({ initials: userInitials, score: score });
      localStorage.setItem("highScores", JSON.stringify(highScores));
    }
  
    displayHighScores(); 
  }
  
  function displayHighScores() {
    highScoresSection.style.display = "block";
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  
    highScoresList.innerHTML = "";
    highScores.forEach((entry, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${entry.initials}: ${entry.score}`;
      highScoresList.appendChild(li);
    });
  }
  
  submitScoreButton.addEventListener("click", endQuiz); 
  
  function showPopup(message) {
    popup.textContent = message;
    popup.style.display = "block";
    setTimeout(() => {
      popup.style.display = "none";
    }, 2000);
  }
  