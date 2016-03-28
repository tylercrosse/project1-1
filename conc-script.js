// pseudocode - concentration

// lists of potential card faces
var shapes = ['triangle', 'square', 'circle', 'parallelogram', 'pentagon', 'octagon', 'hexagon', 'rectangle'];

// deck variables
var numCards = 16;
var numSymbols = numCards / 2;
var deckRaw = [];
var deck = [];
deckTheme = shapes;

// populate cards
function populateCards() {
  for (var i = 0; i < numSymbols; i++){
    deckRaw.push(deckTheme[i]);
    deckRaw.push(deckTheme[i]);
  }
}

// shuffle cards
function shuffleCards() {
  i = 0
  while (i < deckRaw.length){
    var newCard = parseInt(Math.random() * deckRaw.length)
    deck.push(deckRaw[newCard]);
    deckRaw.splice(newCard, 1);
  }
}

// display cards
function displayCards(){
  for(var i = 0; i < deck.length; i++){
    // make card slot
    cardCont = document.createElement("div");
    cardCont.classList.add("card-container", "con" + parseInt(i));
    document.querySelector(".card-area").appendChild(cardCont);

    // make card back
    cardBack = document.createElement("div");
    cardBack.classList.add("layer");
    document.querySelector(".con" + parseInt(i)).appendChild(cardBack);

    // make card front
    cardID = deck[i];
    cardDiv = document.createElement("div");
    cardDiv.classList.add(cardID, "card");
    document.querySelector(".con"+ parseInt(i)).appendChild(cardDiv);
    cardDiv.innerHTML = cardID;
  }
}

// rounds:
//  player chooses first card

//  player chooses second card
//  check for match
//   if no match: wait 2 seconds, flip back over
//   else do nothing
// if all matches are made, leave round loop. otherwise, restart

// begin new game



populateCards();
shuffleCards();
console.log(deck);
displayCards()
