var highscoresOl = getElementById("high-scores");



var currentScore = highscoresList[scoresArrIndex];

currentScore.textContent = highscoresList;




// submitBtn.addEventListener('click', function(){
//     var initials = userInitials.value;

//     var highscoresList = JSON.parse(window.localStorage.getItem('highscores')) || [];

//     var newScore = {
//         score: countDown,
//         initials: initials,
//     };

//     highscoresList.push(newScore);
//     window.localStorage.setItem('highscores', JSON.stringify(highscoresList));
    

//     window.location.href = 'highscores.html';
    
// })




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