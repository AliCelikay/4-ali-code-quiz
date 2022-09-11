//not sure if all of these variables are needed
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
//list for highscores, used in printing in the highscores html page
var highscoresList;

// the function startGame is run when the startBtn is clicked
startBtn.addEventListener("click", startGame);

//this code hides the end screen if it has a display value of something other than none, if the display is assigned the value none then it displays it as a block
if(endScreenDiv.style.display === "none"){
    endScreenDiv.style.display = "block";
}
else{
    endScreenDiv.style.display = "none"
}


//start game function
function startGame() {
    countDown = 72;
    time;

    //once this function is run, if the start page style displays none, then display the page as a block, if the display is no none value in the display key, then dont display the screen(none)
    if(startPage.style.display === "none"){
        startPage.style.display = "block";
    }
    else{
        startPage.style.display = "none"
    }
    

    displayQuestions();
    
}



function displayQuestions(){
    //var is assigned to the questions array from the question.js, and the argument in questions[] is the questions Array Index set above 
    var currentQuestion = questions[questionArrIndex];

    //grabbing the question-sentence id from html
    var stateQuestion = document.getElementById("question-sentence");
    //printing the key from the question object onto the screen
    stateQuestion.textContent = currentQuestion.title;

    // adding blanks in the choicesDiv from html in order to erase the previous question choices
    choicesDiv.innerHTML = ' ';

    //looping through every currentQuestion choices for as long as the array is(.length)
    for (var i = 0; i < currentQuestion.choices.length; i++)
    {
        //the first choice index from the currentQuestion
        var choice = currentQuestion.choices[i];
        //creating a button for every choice from the currentQuestion
        var choiceBtn = document.createElement('button');

        //setting an attribute 'class'(key) of value choice
        choiceBtn.setAttribute('class', 'choice');
        // setting an attribute of 'value'(key) and assigning the value choice
        choiceBtn.setAttribute('value', choice);

        //this helps create numbering inside the buttons
        choiceBtn.textContent = i + 1 + '. ' + choice;

        //alligning the buttons towards the middle of the page
        choiceBtn.style.backgroundColor = "blueviolet"; 
        choiceBtn.style.color = "white"; 
        choiceBtn.style.borderRadius = "8px";
        choiceBtn.style.display = "block";
        choiceBtn.style.marginLeft = "130px"
        //appending the choice with the styling
        choicesDiv.appendChild(choiceBtn);
    }
}



function userPick(e){
    //there is an event and the event is assigned to choiceBtn
    var choiceBtn = e.target;

    //when the user clicks on the button, then the rest of this function will continue, however if the user does not click on the button then the function just returns blank
    if(!choiceBtn.matches('.choice'))
    {
        return;
    }

    // feedbackDiv.innerHTML = ' ';

    //if the choiceBtn value assigned from the displayQuestions function === the questions answer
    if((choiceBtn.value) === (questions[questionArrIndex].answers))
    {
        feedbackDiv.textContent = "Correct!";
    }
    else{//if it doesn not ===
        
        //changing the time
        countDown -= 15;
        if(countDown < 0){
            countDown = 0;
        }
        
        //assigning the new time
        timerElement.textContent = countDown;
        
        feedbackDiv.textContent = "Wrong!";
    }
    
    //the questionArrIndex increases, this action displays the next question from the displayQuestions function
    questionArrIndex++;
    
    // if the questionArrIndex is not equal to the full length of the amount of questions
    if(!(questionArrIndex === questions.length))
    {
        displayQuestions();
        
    }
    else{//if it is equal to the full length of the questions
        endScreen();
    }
}


//end of screen function
function endScreen(){
    //clearing the time function interval on line 187
    clearInterval(time);
    var score = countDown;
    
    
    var finalScore = document.getElementById("final-score");
    finalScore.textContent = score;
    
    //with the same logic as line 34 for the questionsDiv and the FeedbackDiv
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
    
    //displaying the end of screen div to be block
    endScreenDiv.style.display = "block";
}


//an event listener on the submitBtn
submitBtn.addEventListener('click', function(){
    //grabing the userInitials value and assigning it to
    var initials = userInitials.value;

    highscoresList = JSON.parse(window.localStorage.getItem('highscores')) || [];


    var highscoresList = [];
    
    
    var newScore = {
        score: countDown,
        initials: initials,
    };

    highscoresList.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscoresList));
    

    //
    //
    //how to open page in a new tab? target = "_blank" ?
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