//Variables 
let start = document.querySelector("#Start");
let easy = document.querySelector("#easy");
let medium = document.querySelector("#medium");
let hard = document.querySelector("#hard");
easy.dataset.size = 12;
medium.dataset.size = 20;
hard.dataset.size = 30;
if(localStorage.length == 0){
    localStorage.setItem("best", -1);
    localStorage.setItem("bestPlayer", "");
}
let gameSize;

//Displays
let startScreen = document.querySelector("#startScreen");
let gameDisplay = document.querySelector("#gameDisplay");
let gameOver = document.querySelector("#gameOver");
let playAgain = document.querySelector("#playAgain");
playAgain.addEventListener("click", resetGame);

//Time
let timer = document.querySelector("#timer");
let playerTime = 0;
let gameTimer;

//Pokeballs
let allPokeballs;
let imagesDisplay = document.querySelector("#imagesDisplay");

//currently testing a match
let testMatch = false;

//Sounds
let wrong = document.querySelector("#wrong");
let correct = document.querySelector("#correct");

const assets = ['snorlax.png', 'electrabuzz.png', 'chansey.png', 'oddish.png',
    'pikachu.png', 'paras.png', 'arcanine.png', 'ponita.png',
    'venonat.png', 'eggsecute.png', 'machop.png', 'pidgey.png',
    'psyduck.png', 'tauros.png', 'vulpix.png', 'gloom.png',
    'krabby.png', 'butterfree.png', 'bulbasaur.png', 'clefairy.png',
    'koffing.png', 'goldeen.png', 'magikarp.png', 'beedrill.png',
    'lapras.png', 'meowth.png', 'ekans.png', 'jigglypuff.png',
    'horsea.png', 'polywog.png', 'sandshrew.png', 'rattata.png',
    'gengar.png', 'eevee.png', 'bellsprout.png', 'squirtle.png',
    'seel.png', 'caterpie.png']


    start.addEventListener('click', chooseDifficulty);
easy.addEventListener('click', startGame(easy.dataset.size));
medium.addEventListener('click', startGame(medium.dataset.size));
hard.addEventListener('click', startGame(hard.dataset.size));

function chooseDifficulty(){
    start.style.display = "none";
    easy.style.display = "inline";
    medium.style.display = "inline";
    hard.style.display = "inline";
}

//start Game Function
function startGame(size){
    return function(){
        if(size == 12){
            imagesDisplay.style.width = "320px";
        }
        else if(size == 20){
            imagesDisplay.style.width = "400px";
        }
        else{
            imagesDisplay.style.width = "480px";
        }
        gameSize = size;

        startScreen.style.display = "none";
        gameDisplay.style.display = "flex";
        for(let i = 0; i < size; i++){
            let newPoke = document.createElement("img");
            newPoke.src = "assignment04_images/pokeball.png";
            newPoke.classList.add("pokeball");
            newPoke.dataset.pokePNG = "";
            newPoke.dataset.found = "false";
            newPoke.addEventListener("click", uncover(newPoke));
            imagesDisplay.appendChild(newPoke);
        }

        allPokeballs = document.getElementsByClassName("pokeball");
        let usedImages = []; 
        for(let i = 0; i < (size/2); i++){
            let randPoke = parseInt(Math.random() * assets.length); 
            while(usedImages.includes(randPoke)){
                randPoke = parseInt(Math.random() * assets.length); 
            }
            usedImages.push(randPoke);

            for(let j = 0; j < 2; j++){
                let matchToken = parseInt(Math.random() * allPokeballs.length);
                while(allPokeballs[matchToken].dataset.pokePNG != ""){
                    matchToken = parseInt(Math.random() * allPokeballs.length);
                }
                allPokeballs[matchToken].dataset.pokePNG = assets[randPoke];
            }
        }
        gameTimer = setInterval(gameTimerFunc, 500);
    }
}

function uncover(obj){
    return function(){
        if(testMatch == false){
            if(obj.dataset.found == "false"){
                obj.classList.add("uncovered");
                obj.src = "assignment04_images/" + obj.dataset.pokePNG;
                let uncoveredCount = document.getElementsByClassName("uncovered");
                if(uncoveredCount.length == 2){
                    testMatch = true;
                    let myTimer = setTimeout(reset, 500);
                }
            }
        }
    }
}

function reset(){
    let uncoveredCount = document.getElementsByClassName("uncovered");
    if(uncoveredCount[0].dataset.pokePNG != uncoveredCount[1].dataset.pokePNG){
        wrong.play();
        for(let i = 0; i < uncoveredCount.length; i++){
            uncoveredCount[i].src = "assignment04_images/pokeball.png";
        }
    }
    else{
        correct.play();
        uncoveredCount[0].dataset.found = "true";
        uncoveredCount[1].dataset.found = "true";
    }
    uncoveredCount[0].classList.remove("uncovered");
    uncoveredCount[0].classList.remove("uncovered");
    testMatch = false;

    let counter = 0;
    let allFound = 0;

    while(counter < gameSize){
        if(allPokeballs[counter].dataset.found == "true"){
            allFound++;
        }
        counter ++;
    }

    if(allFound == gameSize){
        clearInterval(gameTimer);
        let highScore = localStorage.getItem("best");
        let bestTime = document.getElementById("bestTime");
        let enterName = document.getElementById("enterName");
        if(highScore == -1 ||highScore > playerTime){
            localStorage.setItem("best", playerTime);
            enterName.style.display = "inline";
            bestTime.innerText = "Best Time:" + localStorage.getItem("best");
        }
        else{
            enterName.style.display = "none";
            bestTime.innerText = "Best Time:" + localStorage.getItem("best");
            bestTime.innerText += " - " + localStorage.getItem("bestPlayer");
            
        }
        gameOver.style.display = "inline";
        gameDisplay.style.display = "none";
        yourTime = document.getElementById("yourTime");
        yourTime.innerText = "Your Time:" + playerTime; 
    }

}

function gameTimerFunc(){
    playerTime++;
    timer.innerText = "Time:" + playerTime;
}

function resetGame(){
    playerTime = 0;
    gameOver.style.display = "none";
    startScreen.style.display = "inline";
    imagesDisplay.innerHTML = "";
    timer.innerText = "Time:" + playerTime;
    if(fname.value != ""){
        localStorage.setItem("bestPlayer", fname.value);
    }
    fname.value = "";
}