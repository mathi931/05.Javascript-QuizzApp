//some data
const quizData = [
	{
		id: 0,
		question: "What is Norwegians's capital city?",
		op1: 'Budapest',
		op2: 'Stockholm',
		op3: 'Oslo',
		op4: 'Copenhagen',
		correct: 'Oslo',
		asked: false,
	},
	{
		id: 1,
		question: 'When did the Second World War end?',
		op1: '1945',
		op2: '1922',
		op3: '1996',
		op4: '1938',
		correct: '1945',
		asked: false,
	},
	{
		id: 2,
		question: 'How many stars are there on the flag of China?',
		op1: '2',
		op2: '5',
		op3: '7',
		op4: '1',
		correct: '5',
		asked: false,
	},
	{
		id: 3,
		question:
			'In 2013 which two airlines merged to become the world’s largest airline?',
		op1: 'Air France and KLM',
		op2: 'Lufthansa and Germanwings',
		op3: 'American Airlines and US Airways',
		op4: 'British Airways and Iberia',
		correct: 'American Airlines and US Airways',
		asked: false,
	},
	{
		id: 4,
		question: 'Which country is the biggest coffee drinker?',
		op1: 'Belgium',
		op2: 'Switzerland',
		op3: 'The Netherlands',
		op4: 'Finland',
		correct: 'Finland',
		asked: false,
	},
];
//elements
const QuestionText = document.getElementById('questionText');
const Options = document.getElementsByClassName('options');
const Submit = document.getElementById("button-submit");
const TimerContainer = document.querySelector('.timer-container');

// an array what helps to follow the index of the questions. The last value is the current questions ID
const questionIndex = [];
// a variable follows the option's index. if nothing is selected = undefined
let optionI;
// selected option element
let currentOptionElement;
//timer
var timeLeft;

//Submit Button Click Event
Submit.addEventListener("click", function(){
	//0.chek if its submit or nextquestion function and still have question what is not asked already
	if (Submit.innerHTML === "Submit") {
		//1.check if there is a selected option
		if (optionI !== undefined) {	

			//2.check if it is a correct answer
			if (GetAnswerResult() && questionIndex.length <= 5) {
				//correct answer -> set icon, and hinghlight
				ShowIcons(true);
				HighlightCorrect(true);
			}
			else{
				//false answer -> highlight correct answer, set icons
				ShowIcons(false);
				HighlightCorrect(false);
			}
			//4.change button Submit to Next question
			if (questionIndex.length < 5) {
				SwitchButton (false);
			}
			//last question so switch to results
			else{
				// ShowIcons(false);
				// HighlightCorrect(false);
				//print result
				//alert("DONE");
				//window.location = 'result.html';
			}
			optionI = undefined;
		}
		else {
			alert("You must select an option first!");
		}

	}
	//
	else if (Submit.innerHTML === "Next Question") {
		//5.go to next question
		questionIndex.push(GetRandomNumberNorRepeat(0,5));
		loadQuiz();
		//6.button back to Submit
		SwitchButton(true);
		ResetClasses();
	}
	
	else{
		alert("Something is wrong bro");
	}
		

});
//Screen Load Event
window.addEventListener('DOMContentLoaded', function () {

	if (window.location.href == "http://127.0.0.1:5500/index.html") {
		questionIndex.push(GetRandomNumber(0,5));
		loadQuiz();
		CountDown(true, 6);
	}
	else if (window.location.href == "http://127.0.0.1:5500/result.html") {
		
	}
});
//On Option Click Event
function OptionIsSelected(option){
	OptionClassChange(option);
}
function OptionClassChange(option){
	//first select
	if (optionI === undefined){
		option.classList.add("option-selected");
		optionI = option.id;	
	}
	//select other option
	else if (!option.className.includes("option-selected") && option.id !== optionI && option.id !== undefined) {
		Options[optionI].classList.remove("option-selected");
		option.classList.add("option-selected");
		optionI = option.id;
	}
	else if (option.className.includes("option-selected") && option.id === optionI && option.id !== undefined) {
		option.classList.remove("option-selected");
		optionI = undefined;
	}


	currentOptionElement =  option;
}


//elements & Set functions
function loadQuiz() {

	loadQuestion();
	loadOptions();
	//console.log(questionIndex[questionIndex.length - 1]);
}
function loadQuestion() {
	QuestionText.innerHTML =
		quizData[questionIndex[questionIndex.length - 1]].question;
}
function loadOptions() {
	Options[0].children[0].innerHTML =
		quizData[questionIndex[questionIndex.length - 1]].op1;
	Options[1].children[0].innerHTML =
		quizData[questionIndex[questionIndex.length - 1]].op2;
	Options[2].children[0].innerHTML =
		quizData[questionIndex[questionIndex.length - 1]].op3;
	Options[3].children[0].innerHTML =
		quizData[questionIndex[questionIndex.length - 1]].op4;
}
function ShowIcons(correct){
	if (correct) {
		currentOptionElement.children[1].classList.add("fas", "fa-check");
	}
	else {
		currentOptionElement.children[1].classList.add("fas", "fa-times");
		Options[GetCurrentQuizCorrectAnswer()].children[1].classList.add("fas", "fa-check");
	}
}
function HighlightCorrect(correct){
	//answer is correct -> highligh Options[currentIndex], hide others
	if (correct) {
		for (let i = 0; i < Options.length; i++) {
			Options[i].classList.add("option-wrong");
		}
		Options[optionI].classList.replace("option-wrong", "options-correct");
	}
	else{
		for (let i = 0; i < Options.length; i++) {
			Options[i].classList.add("option-wrong");
		}
		currentOptionElement.classList.remove("option-selected");
		Options[GetCurrentQuizCorrectAnswer()].classList.add("option-selected");
		Options[GetCurrentQuizCorrectAnswer()].classList.replace("option-wrong", "options-correct");

	}}
function SwitchButton (toSubmit){
	return toSubmit ? Submit.innerHTML = "Submit": Submit.innerHTML = "Next Question";
}
function ResetClasses() {
	for (let i = 0; i < Options.length; i++) {
		Options[i].classList.remove("option-selected", "option-wrong", "option-correct");
		Options[i].children[1].classList.remove("fas", "fa-check", "fa-times");
	}
}

//countdown function // checks if its a question or beforeload
function CountDown(question, timeleft){
    var downloadTimer = setInterval(function(){
    timeleft--;
    TimerContainer.children[0].textContent = timeleft;
    if(timeleft == 0){
		//countdown while asking a question
		if (question) {
			clearInterval(downloadTimer);
			if (TimerContainer.children[0].textContent == 0) {
				TimerContainer.children[0].textContent = "";
			}
		}
		else{

		}

    }},1000);
}
//Get functions
function GetAnswerResult(){
	return currentOptionElement.innerText === quizData[questionIndex[questionIndex.length-1]].correct ? true : false;
}
function GetCurrentQuizCorrectAnswer(){
	var correctAnswer = quizData[questionIndex[questionIndex.length-1]].correct;

	//we need the correct answer's index from the option list

	for (let i = 0; i < Options.length; i++) {
		if(Options[i].children[0].innerHTML === correctAnswer)
		{
			return i;
		}
	}
}
//random number but nor repeat to the indexArray
function GetRandomNumberNorRepeat(min, max) {
	var next = Math.floor(Math.random() * (max - min)) + min;
	if (questionIndex.includes(next)) {
		next = GetRandomNumberNorRepeat(min, max);
	}
	return next;
}
//Returns a random number between min (inclusive) and max (exclusive)
function GetRandomNumber(min, max) {
return Math.floor(Math.random() * (max - min)) + min;
}