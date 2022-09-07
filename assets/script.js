var startBtn = document.getElementById("start-button");
var startPage = document.getElementById("start-page");
var timerElement = document.getElementById("time");
var questionsDiv = document.getElementById("questions-div");
var countDown;
var questionArrIndex = 0;
var choicesDiv = document.getElementById("choice-div");
var choicesClass = document.querySelector(".class");
var feedbackDiv = document.getElementById("feedback");
var endScreenDiv = document.getElementById("end-screen");
var userInitials = document.getElementById("initials");
var submitBtn = document.getElementById("submit");


startBtn.addEventListener("click", startGame);

if(endScreenDiv.style.display === "none"){
    endScreenDiv.style.display = "block";
}
else{
    endScreenDiv.style.display = "none"
}

function startGame() {
    countDown = 72;
    time;

    if(startPage.style.display === "none"){
        startPage.style.display = "block";
    }
    else{
        startPage.style.display = "none"
    }
    
    displayQuestions();
    
}



function displayQuestions(){
    var currentQuestion = questions[questionArrIndex];

    var stateQuestion = document.getElementById("question-sentence");
    //printing the key from the question object onto the screen
    stateQuestion.textContent = currentQuestion.title;

    choicesDiv.innerHTML = ' ';

    for (var i = 0; i < currentQuestion.choices.length; i++)
    {
        var choice = currentQuestion.choices[i];
        var choiceBtn = document.createElement('button');
        choiceBtn.setAttribute('class', 'choice');
        choiceBtn.setAttribute('value', choice);

        choiceBtn.textContent = i + 1 + '. ' + choice;

        choiceBtn.style.backgroundColor = "blueviolet"; 
        choiceBtn.style.color = "white"; 
        choiceBtn.style.borderRadius = "8px";
        choiceBtn.style.display = "block";
        choiceBtn.style.marginLeft = "130px"

        choicesDiv.appendChild(choiceBtn);
    }
}



function userPick(e){
    var choiceBtn = e.target;
    if(!choiceBtn.matches('.choice'))
    {
        return;
    }
    var buttons = e.target;

    feedbackDiv.innerHTML = ' ';

    if((choiceBtn.value) === (questions[questionArrIndex].answers))
    {
        feedbackDiv.textContent = "Correct!";
    }
    else{
        
        countDown -= 15;
        if(countDown < 0){
            countDown = 0;
        }
        
        timerElement.textContent = countDown;
        
        feedbackDiv.textContent = "Wrong!";
    }
    
    questionArrIndex++;
    

    if(!(questionArrIndex === questions.length))
    {
        displayQuestions();
        
    }
    else{
        endScreen();
    }
}



function endScreen(){
    clearInterval(time);
    var score = countDown;
    
    
    var finalScore = document.getElementById("final-score");
    finalScore.textContent = score;
    
    if(questionsDiv.style.display === "none"){
        questionsDiv.style.display = "block";
    }
    else{
        questionsDiv.style.display = "none"
    }

    if(feedbackDiv.style.display === "none"){
        feedbackDiv.style.display = "block";
    }
    else{
        feedbackDiv.style.display = "none"
    }
    
    endScreenDiv.style.display = "block";
}

submitBtn.addEventListener('click', function(){
    var initials = userInitials.value;

    // var highscoresList = JSON.parse(window.localStorage.getItem('highscores')) || [];


    var highscoresList = [];
    
    
    var newScore = {
        score: countDown,
        initials: initials,
    };

    highscoresList.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscoresList));
    

    window.location.href = 'highscores.html';
    
})

var time = setInterval(function timer(){
    countDown--;
    timerElement.textContent = countDown;

    if(countDown <= 0)
    {
        clearInterval(time);
        endScreen();
    }
}, 1000);
    


choicesDiv.onclick = userPick;