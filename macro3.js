var pokeballs = 5;
var pokemonCaught = 0;
var berries = 0;
var gameStatus = "inRound";

var grass1 = document.querySelector("#grass1");
var grass2 = document.querySelector("#grass2");
var grass3 = document.querySelector("#grass3");

var inventory = document.querySelector("#inventory");
var pokeCounter = document.querySelector("#pokemonCounter");
var berryCounter = document.querySelector("#berryCounter");

var playAgain = document.querySelector("#playAgain");
var progress = document.querySelector("#progress");
var prevResults = document.querySelector("#entries");

var startOver = document.querySelector("#startOver");

const pokemon = [
    {name:'Pikachu', image:'assignment03_images/images/pikachu.png'}, 
    {name:'Bulbasaur', image:'assignment03_images/images/bulbasaur.png'},
    {name:'Charmander', image:'assignment03_images/images/charmander.png'},
    {name:'Eevee', image:'assignment03_images/images/eevee.png'},
    {name:'Squirtle', image:'assignment03_images/images/squirtle.png'}
]

const specialItem = [
    {name:'Mimikyu', image:'assignment03_images/images/Mimikyu.png'}, 
    {name:'Three Pokeballs', image:'assignment03_images/images/pokeballs3.png'},
    {name:'Berry', image:'assignment03_images/images/berry.png'}
]
var encounter = [];



//hover over
grass1.addEventListener('click', clicked(grass1));
grass2.addEventListener('click', clicked(grass2));
grass3.addEventListener('click', clicked(grass3));
startOver.addEventListener('click', function(){
    pokeballs = 5;
    pokemonCaught = 0;
    berries = 0;
    gameStatus = "inRound";
    entries.innerHTML = "";
    progress.innerText= "Your Progress here";
    grass1.src = "assignment03_images/images/grass.png";
    grass2.src = "assignment03_images/images/grass.png";
    grass3.src = "assignment03_images/images/grass.png";
    grass1.style.display = "inline";
    grass2.style.display = "inline";
    grass3.style.display = "inline";
    inventory.innerHTML = "<p>Pokeballs left: " + pokeballs + "</p>";
    pokeCounter.innerHTML = "<p>Pokemons caught: " + pokemonCaught + "</p>";
    berryCounter.innerHTML = "<p>Berries found: " + berries + "</p>";
    playAgain.style.display = "inline";
});

function clicked(object){
    return function(){
        if(gameStatus == "inRound" || gameStatus == "inSpecialRound"){
            //choosing encounters for each grass 
            encounter[0] = parseInt(Math.random() * 3);

            while(encounter[1] != encounter[0]){
                encounter[1] = parseInt(Math.random() * 3);
            }

            while(encounter[2] != encounter[1] && encounter[2] != encounter[0]){
                encounter[2] = parseInt(Math.random() * 3);
            }

            //item found
            let currentEncounter = 0;
            if(object == grass1){
                currentEncounter = encounter[0];
            }
            else if(object == grass2){
                currentEncounter = encounter[1];
            }
            else{
                currentEncounter = encounter[2];
            }
            console.log(currentEncounter);

            //disappear
            object.style.display = "none";

            //pokeballs
            if(currentEncounter == 0){
                object.style.display = "inline";
                object.src = "assignment03_images/images/pokeballs.png";
                pokeballs = pokeballs + 2;
                progress.innerText= "Found 2 Pokeballs!";
                entries.innerHTML = "Found 2 Pokeballs!</br>" + entries.innerHTML;

            }
            
            //Pokemon
            else if(currentEncounter == 1){
                object.style.display = "inline";
                if(gameStatus == "inSpecialRound"){
                    //Special Encounter
                    let specialEncounter = parseInt(Math.random() * 3);
                    object.src = specialItem[specialEncounter].image;
                    if(specialItem[specialEncounter].name == "Mimikyu"){
                        progress.innerText= "You caught a(n) Mimikyu";
                        pokemonCaught = pokemonCaught + 1;
                        pokeballs = pokeballs - 1;
                        entries.innerHTML = "You caught a(n) Mimikyu!<br>" + entries.innerHTML;
                    }
                    else if(specialItem[specialEncounter].name == "Three Pokeballs"){
                        pokeballs = pokeballs + 3;
                        progress.innerText= "Found 3 Pokeballs!";
                        entries.innerHTML = "Found 3 Pokeballs!</br>" + entries.innerHTML;
                    }
                    else{
                        berries = berries + 1;
                        progress.innerText= "Found a Berry!";
                        entries.innerHTML = "Found a Berry!</br>" + entries.innerHTML;
                    }  
                }
                else{
                    //catching Pokemon
                    let choosePokemon = parseInt(Math.random() * 5);
                    object.src = pokemon[choosePokemon].image;
                    progress.innerText= "You caught a(n) " + pokemon[choosePokemon].name;
                    pokemonCaught = pokemonCaught + 1;
                    pokeballs = pokeballs - 1;
                    entries.innerHTML = "You caught a(n) " + pokemon[choosePokemon].name + "!<br>" + entries.innerHTML;
                }
            }
            else{
                //Nothing
                progress.innerText = "You found Nothing!";
                entries.innerHTML = "You found Nothing!</br>" + entries.innerHTML;
                pokeballs = pokeballs - 1;
            }

            //Inventory check
            inventory.innerHTML = "<p>Pokeballs left: " + pokeballs + "</p>";
            pokeCounter.innerHTML = "<p>Pokemons caught: " + pokemonCaught + "</p>";
            berryCounter.innerHTML = "<p>Berries found: " + berries + "</p>";

            //roundover
            gameStatus = "roundOver";

            //Game Over
            if(pokeballs == 0){
                playAgain.style.display = "none";
            }
        }    

    }
}

playAgain.addEventListener('click', function(){
    grass1.src = "assignment03_images/images/grass.png";
    grass2.src = "assignment03_images/images/grass.png";
    grass3.src = "assignment03_images/images/grass.png";
    grass1.style.display = "inline";
    grass2.style.display = "inline";
    grass3.style.display = "inline";
    let specialChance = parseInt(Math.random() * 5);
    if(specialChance == 4){
        gameStatus = "inSpecialRound";
        progress.innerText= "You're in 'Super Item' mode!";
    }
    else{
        gameStatus = "inRound";
    }
})


