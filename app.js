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
let timeLeft = 0;

let quizTimer;

//Submit Button Click Event
Submit.addEventListener("click", function(){
	//0.chek if its submit or nextquestion function and still have question what is not asked already
	if (Submit.innerHTML === "Submit") {
		//1.check if there is a selected option
		if (optionI !== undefined) {	

			//2.check if it is a correct answer
			if (GetAnswerResult()) {
				//correct answer -> set icon, and hinghlight
				ShowIcons(true);
				HighlightCorrect(true);
				//if its not the last question loop again
				if(questionIndex.length < 5){
					CountDown(false);
				}
				//last question correct answer
				else if(questionIndex.length === 5){
					ShowIcons(true);
					HighlightCorrect(true);
					//goes to the last 5 seconds and hoes to results
					CountDown(false,true,true);
				}

			}
			else{
				//false answer -> highlight correct answer, set icons
				ShowIcons(false);
				HighlightCorrect(false);
				if(questionIndex.length < 5){
					CountDown(false);
				}
				//last question wrong naswer
				else if(questionIndex.length === 5){
					ShowIcons(false);
					HighlightCorrect(false);
					//goes to the last 5 seconds and hoes to results
					CountDown(false,true,true);
				}
			}
			//4.change button Submit to Next question
			questionIndex.length < 5 ? SwitchButton(true) : SwitchButton(false,true);
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
		SwitchButton(false);
		timeLeft =0;
		ResetClasses();
		CountDown(true);
	}
	else if(Submit.innerHTML === "Result"){
		alert("done");
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
		Submit.classList.add("after-nextQuestion");
		CountDown(true);
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
		if(currentOptionElement){
		currentOptionElement.children[1].classList.add("fas", "fa-times");
		Options[GetCurrentQuizCorrectAnswer()].children[1].classList.add("fas", "fa-check");}
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
		if(currentOptionElement){
			currentOptionElement.classList.remove("option-selected");
			Options[GetCurrentQuizCorrectAnswer()].classList.add("option-selected");
			Options[GetCurrentQuizCorrectAnswer()].classList.replace("option-wrong", "options-correct");
		}else{
			Options[GetCurrentQuizCorrectAnswer()].classList.add("option-selected");
		}


	}}
function SwitchButton (SubmitPressed, last = false){
	if(!last){
		if(SubmitPressed){
			Submit.innerHTML = "Next Question";
			Submit.classList.contains("after-nextQuestion") ? 
			Submit.classList.replace("after-nextQuestion","after-answer") : 
			Submit.classList.add("after-answer");
	
		}
		else{
			Submit.innerHTML = "Submit";
			Submit.classList.contains("after-answer")?
			Submit.classList.replace("after-answer" ,"after-nextQuestion"):
			Submit.classList.add("after-nextQuestion");
		}
	}
	else{
		Submit.innerHTML = "Result";
		Submit.classList.replace("after-nextQuestion", "result");
	}
}
function ResetClasses() {
	for (let i = 0; i < Options.length; i++) {
		Options[i].classList.remove("option-selected", "option-wrong", "option-correct");
		Options[i].children[1].classList.remove("fas", "fa-check", "fa-times");
	}
}

//countdown function // checks if its a question or beforeload
function CountDown(question, reset = true, lastQuestion = false){
	//reset the last
	if (reset){
	clearInterval(quizTimer);}

	question ? timeLeft = 61 : timeLeft = 6;

	quizTimer = setInterval(function(){
	timeLeft--;
	TimerContainer.children[0].textContent = timeLeft;
	//when the time is up
	if(timeLeft === 0){
		//question loop
		if(Submit.classList.contains("after-nextQuestion")){
			if(questionIndex.length < 5){
				SwitchButton(true);
			}
			//finished with last question without an answer
			else if (questionIndex.length === 5) {
				clearInterval(quizTimer);
				HighlightCorrect(false);
				CountDown(false, false, true);
			}
			HighlightCorrect(false);
			CountDown(false, false);
		}
		//waiting for the next question
		else if (Submit.classList.contains("after-answer")){

			if(questionIndex.length < 5){
				questionIndex.push(GetRandomNumberNorRepeat(0,5));
				loadQuiz();
			}
			CountDown(true,false);
		}
		if(lastQuestion){
			//done 5 seconds waiting after last qustion
			clearInterval(quizTimer);
			alert("RESULT: GOOD JOB!"); // -> here comes what happens after went through the loop. -> print result
		}
		//stop clock
		clearInterval(quizTimer);
		//remove timer
		if (TimerContainer.children[0].textContent == 0) {
			TimerContainer.children[0].textContent = "";
		}}},1000);}

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