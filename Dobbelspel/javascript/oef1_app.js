// select dice images
const dice = document.querySelectorAll("#dice-container img");

// select roll button
const throwButton = document.getElementById("throwbutton");

// count amount of throws
let throws = 0;

// store how many times each score occurs
const statistics = {
    duo: 0,
    trio: 0,
    quatro: 0,
    cinqo: 0,
};

// listen when button is clicked (and execute throwDice-function))
throwButton.addEventListener("click", throwDice);

// function to roll dice and update UI
function throwDice() {

    //increase throw counter
    throws++;
    document.getElementById("throws").textContent = throws;    
    
    //store rolled values
    let values = [];

    //roll each dice separate
    dice.forEach(d => {
        let value = Math.floor(Math.random() * 6) + 1;
        values.push(value);
        d.src = `dobbelstenen/die-${value}.png`;
    });

    //calculate score
    let score = calculateScore(values);

    //show score
    document.getElementById("score").textContent = score;

    //update statistics
    if (score != "-") {
        let key = score.toLowerCase();
        statistics[key]++;
        document.getElementById(key).textContent = statistics[key];
    }
}

// function to determine highest combination
function calculateScore(values) {
    
    //object to count values
    let counts = {};

    //count equal values
    values.forEach(v => {
        counts[v] = (counts[v] || 0) + 1;
    });

    //highest number of equal values
    let max = Math.max(...Object.values(counts));

    //get score 
    if (max == 2) return "Duo";
    if (max == 3) return "Trio";
    if (max == 4) return "Quatro";
    if (max == 5) return "Cinqo";

    return "-";
}
