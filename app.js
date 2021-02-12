const quizData = [
    {
        id: 0,
        question: "What is Norwegians's capital city?" ,
        op1: "Budapest",
        op2: "Stockholm",
        op3: "Oslo",
        op4: "Copenhagen",
        correct: "Oslo",
        asked: false
    },
    {
        id: 1,
        question: "When did the Second World War end?" ,
        op1: "1945",
        op2: "1922",
        op3: "1996",
        op4: "1938",
        correct: "1945",
        asked: false
    },
    {
        id: 2,
        question: "How many stars are there on the flag of China?" ,
        op1: "2",
        op2: "5",
        op3: "7",
        op4: "1",
        correct: "5",
        asked: false
    },
    {
        id: 3,
        question: "In 2013 which two airlines merged to become the world’s largest airline?" ,
        op1: "Air France and KLM",
        op2: "American Airlines and US Airways",
        op3: "Lufthansa and Germanwings",
        op4: "British Airways and Iberia",
        correct: "American Airlines and US Airways",
        asked: false
    },
    {
        id: 4,
        question: "Which country is the biggest coffee drinker?" ,
        op1: "Belgium",
        op2: "Switzerland",
        op3: "The Netherlands",
        op4: "Finland",
        correct: "Finland",
        asked: false

    }
] 
const QuestionText =document.getElementById("questionText");
const Options = document.getElementsByClassName("options");
console.log(Options);

//random number but nor the last
function getRandomNumberNorLast(min, max, current) {
	var next = Math.floor(Math.random() * (max - min)) + min;
	if (current === next) {
		next = getRandomNumberNorLast(min, max, count);
	}
	return next;}

//Returns a random number between min (inclusive) and max (exclusive)
function getRandomNumber(min,max){
    return Math.random() * (max - min) + min;
}