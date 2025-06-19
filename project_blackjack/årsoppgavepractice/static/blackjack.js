let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0; // dette trengs pga A som har enten verdi 11 eller 1

let hidden;
let deck;

let currentMoney = 0;

let canHit = true; // lar spilleren ta kort om din sum er mindre eller samme som 21

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"] // clubs diamonds hearts spades
    deck = []

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) { //korresponderer med "cards" mappen
            deck.push(values[j] + "-" + types[i]); // A-C, K-C, A-D, K-D.. osv, løkken går gjennom alle kort kombinasjonene
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length) // math.random gir et tilfeldig nummer mellom 0-1. (0-1 * 52 => (0-51.9999) og math.floor fjerner desimalene
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function updateMoney(){
    document.getElementById("myMoney").textContent = currentMoney
}

function bet() {

}

function startGame() {
    hidden = deck.pop() //fjerner et kort fra slutten av array
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSum);
    // updateMoney()

    while (dealerSum < 17) {
        //<img>
        let cardImg = document.createElement("img"); //lager img tag
        let card = deck.pop() //får kort fra bunken
        cardImg.src = "../static/media/cards/" + card + ".png" //skaffer bilder fra folderen
        dealerSum += getValue(card); 
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img"); //lager img tag
        let card = deck.pop() //får kort fra bunken
        cardImg.src = "../static/media/cards/" + card + ".png" //skaffer bilder fra folderen
        yourSum += getValue(card); 
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    console.log(yourSum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}

function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img"); //lager img tag
    let card = deck.pop() //får kort fra bunken
    cardImg.src = "../static/media/cards/" + card + ".png" //skaffer bilder fra folderen
    yourSum += getValue(card); 
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) { // A, J, K -> 11 + 10 + 10 
        canHit = false;
    }
}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "../static/media/cards/" + hidden + ".png";

    let message = "";
    let dealerImage = "annoying-dealer.png";

    if (yourSum > 21) {
        message = "You Lost.";
        dealerImage = "dealer-win.png";
        currentMoney -= 50;
        updateMoney();
    }
    else if (dealerSum > 21) {
        message = "You Won.";
        dealerImage = "dealer-lose.png";
        currentMoney += 50;
        updateMoney();
    }
    //du og dealer <= 21 vvvv
    else if (yourSum == dealerSum) {
        message = "You Tied.";
        dealerImage = "dealer-tie.png"
        updateMoney();
    }

    else if (yourSum > dealerSum) {
        message = "You Won.";
        dealerImage = "dealer-lose.png";
        updateMoney();
        currentMoney += 50;
    }

    else if (yourSum < dealerSum) {
        message = "You Lost.";
        updateMoney();
        currentMoney -= 50;
    }


    document.querySelector(".harley").src = "static/media/dealer/" + dealerImage;

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;

    document.getElementById("playAgain").style.display = "block";

    document.getElementById("playAgain").addEventListener("click", function() {
        location.reload();
    });
}

function getValue(card) {
    let data = card.split("-"); // 4(value) C(type). så "split" på "-" betyr at koden deler opp i to så vi får en array som ["4", "C"]
    let value = data[0];

    if (isNaN(value)) { // J Q K har samme Value -- sjekker om Value har nummer, hvis ikke er det A (ess)
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {  //card er en String, hvis første nummer er "A", return 1
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

//////////////////////////////////////////////

document.getElementById("submitScore").addEventListener("submit", function(e) {
    e.preventDefault(); // Stop the form from reloading the page!

    // Grab name and score from the inputs
    const name = document.getElementById("name").value;
    const score = document.getElementById("score").value;

    // Send data to Flask using fetch()
    fetch("/save_score", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `name=${encodeURIComponent(name)}&score=${encodeURIComponent(score)}`
    })
    .then(response => response.text()) // Wait for Flask to reply
    .then(data => {
        alert(data); // Show the "Score saved!" message
    })
    .catch(error => {
        alert("Failed to save score."); // just in case something breaks
        console.error("Error:", error); // show error in console
    });
});

