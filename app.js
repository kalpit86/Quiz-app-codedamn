const questions = [
    {
      questionText: "In which country was the first cricket match played?",
      options:  ['a. England', 'b. India', 'c. Australia', 'd. South Africa'],
      answer: 'a. England',
    },
    {
      questionText: "What is the maximum number of players allowed in a cricket team?",
      options: ['a. 10', 'b. 11', 'c. 12', 'd. 13'],
      answer: 'b. 11',
    },

    {
      questionText: 'Who is known as the "God of Cricket"?',
      options: ['a. Sachin Tendulkar', 'b. Ricky Ponting', 'c. Brian Lara', 'd. Steve Waugh'],
      answer: 'a. Sachin Tendulkar',
    },

    {
      questionText:
        "Which country has won the most number of ICC Cricket World Cup titles?",
      options:['a. Australia', 'b. India', 'c. West Indies', 'd. England'],
      answer: 'a. Australia',
    },
    {
      questionText:
        "Which of the following is NOT a type of delivery in cricket?",
      options: ['a. Bouncer', 'b. Yorker', 'c. Spinner', 'd. Hurler'],
      answer: 'd. Hurler',
    }
  ]; 
let score = 0;
let time = 30;
let quesNum = 0;

const startBtn = document.getElementById('start').addEventListener('click',startQuiz);

const scoreBoard = document.getElementById("highscore").addEventListener("click",displayScores);

function displayScores(){
  document.getElementById("quizEnd").classList.add("hidden");
  document.querySelector(".player").classList.add("hidden");
  document.getElementById("scoreBoard").classList.remove("hidden");
  let lastPlayers = [];
  for(let i =0; i<localStorage.length; i++){
        let keyValue = localStorage.key(i)
        lastPlayers.push(` ${JSON.parse(keyValue)} - ${JSON.parse(localStorage.getItem(keyValue))}`);
  }
   lastPlayers.sort(function(a, b){return a-b});
  document.getElementById('savedScores').textContent = `${[...lastPlayers]} \n` ;
  document.getElementById("goBack").addEventListener("click",function(){
    restart();
  })
  document.getElementById("clearScore").addEventListener("click",function(){
     localStorage.clear();
     restart();
  })
}

function getQuestion(i){
  if(quesNum >= 5 || time == 0){
     time = 0;
     quizEnd();
  }
  else{
  let answer = questions[i].answer;
  document.querySelector(".question").textContent = questions[i].questionText;
  let arr = questions[i].options
  for(let a = 0; a < arr.length; a++){
    document.querySelectorAll(".option")[a].textContent = `${arr[a]}`;
    document.querySelectorAll(".option")[a].addEventListener("click",optionSelect);
  }

  function optionSelect(){
    if(this.textContent == answer){
      score += 5;
      document.getElementById("result").textContent = "Correct!!"
      document.getElementById("result").style.display = "inline-block"
      for(let b = 0; b < arr.length; b++){
       document.querySelectorAll(".option")[b].removeEventListener("click",optionSelect);
      }
      document.getElementById("next").classList.remove("hidden");
      document.getElementById("next").addEventListener("click",nextQuestion);
    }
    else{
      time -= 10;
      document.getElementById("result").innerHTML = "Incorrect!!"
      document.getElementById("result").style.display = "inline-block"
      for(let b = 0; b < arr.length; b++){
        document.querySelectorAll(".option")[b].removeEventListener("click",optionSelect);
       }
      document.getElementById("next").classList.remove("hidden")
      document.getElementById("next").addEventListener("click",nextQuestion);
    }
  }
}
}
 
function startQuiz(){
    score = 0;
    quesNum = 0;
    time = 30;
    document.querySelector("#highscore").classList.add("hidden");
    document.querySelector(".player").classList.add("hidden");
    document.querySelector("#questionTab").classList.remove("hidden");
    getQuestion(quesNum);
    const countDisplay = document.querySelector(".time")
    function counter(){
     if(time > 0){
    countDisplay.textContent = `Time: ${time}`;
    time--;
    }
    else{
    clearInterval();  
    countDisplay.textContent = "Time: "
    quizEnd();
    }
  }
   const myInterval = setInterval(counter,1000);
}

function nextQuestion(){
  document.getElementById("result").style.display = "none";
  document.getElementById("next").classList.add("hidden");
  quesNum++;
  getQuestion(quesNum);
}

const quizEnd = () => {
  document.getElementById("questionTab").classList.add("hidden");
  document.getElementById("quizEnd").classList.remove("hidden");
  document.getElementById("score").textContent = `${score}.`;
  document.getElementById("submit").addEventListener("click",function(){
    let currentScore = document.getElementById("score").textContent;
    const currentPlayer =  document.getElementById("initials").value;
    localStorage.setItem(JSON.stringify(currentPlayer),JSON.stringify(`${currentScore}`));
    restart();
  })
  
}

function restart(){
  location.reload();
  document.getElementById("highscore").classList.remove("hidden");
  document.getElementById("scoreBoard").classList.add("hidden");
  document.querySelector(".player").classList.remove("hidden");
  
}