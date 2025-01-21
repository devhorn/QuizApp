let rightAnswers = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio("./sounds/success.mp3");
let AUDIO_FAIL = new Audio("./sounds/fail.mp3");

function init() {
  showQuestion();
}

function showQuestion() {
  if (gameIsover()) {
    showEndScreen();
  } else {
    updateProgressBar();
    updateQuizFooter();
    showAnswers();
  }
}

function gameIsover() {
  return currentQuestion >= questions.length;
}

function updateQuizFooter() {
  document.getElementById("questionAmount").innerHTML = questions.length;
  document.getElementById("displayedQuestion").innerHTML = currentQuestion + 1;
}

function answer(selection) {
  let selectedAnswer = selection.split("_")[1];
  let rightAnswer = questions[currentQuestion].right_answer;
  if (selectedAnswer == rightAnswer) {
    AUDIO_SUCCESS.play();
    document.getElementById(selection).parentNode.style.backgroundColor =
      "#48943e";
    rightAnswers += 1;
  } else {
    AUDIO_FAIL.play();
    document.getElementById(selection).parentNode.style.backgroundColor =
      "#eb5252";
    document.getElementById(
      `${"answer_" + rightAnswer}`
    ).parentNode.style.backgroundColor = "#48943e";
  }
  document.getElementById("next_Button").disabled = false;
}

function nextQuestion() {
  currentQuestion += 1;
  showQuestion();
  document.getElementById("next_Button").disabled = true;
  resetAnswerButton();
}

function resetAnswerButton() {
  document.getElementById("answer_1").parentNode.style.backgroundColor =
    "#f7faf8";
  document.getElementById("answer_2").parentNode.style.backgroundColor =
    "#f7faf8";
  document.getElementById("answer_3").parentNode.style.backgroundColor =
    "#f7faf8";
  document.getElementById("answer_4").parentNode.style.backgroundColor =
    "#f7faf8";
}

function replay() {
  document.getElementById("playScreen").classList.toggle("dNone");
  document.getElementById("endScreen").classList.toggle("dNone");
  currentQuestion = 0;
  rightAnswers = 0;
  showQuestion();
}

function showEndScreen() {
  document.getElementById("playScreen").classList.toggle("dNone");
  document.getElementById("endScreen").classList.toggle("dNone");
  document.getElementById("progressBar").style.width = "100%";
  document.getElementById(
    "failures"
  ).innerHTML = `${rightAnswers} von ${questions.length} Fragen richtig`;
}

function updateProgressBar() {
  let percent = (currentQuestion / questions.length) * 100;
  percent = Math.round(percent);
  document.getElementById("progressBar").style.width = `${percent + "%"}`;
}

function showAnswers() {
  let question = questions[currentQuestion];
  document.getElementById("question").innerHTML = question.question;
  document.getElementById("answer_1").innerHTML = question.answer_1;
  document.getElementById("answer_2").innerHTML = question.answer_2;
  document.getElementById("answer_3").innerHTML = question.answer_3;
  document.getElementById("answer_4").innerHTML = question.answer_4;
}
