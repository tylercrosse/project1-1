// pseudocode - concentration

// lists of potential card faces
var shapes = ['triangle', 'square', 'circle', 'parallelogram', 'pentagon', 'octagon', 'hexagon', 'rectangle'];

// deck variables
var numCards = 16;
var numSymbols = numCards / 2;
var deck = [];
deckTheme = shapes;
var moves = 0;
var activeCard;
var lastCard;

// populate cards
function populateCards() {
  for (var i = 0; i < numSymbols; i++){
    deck.push(deckTheme[i]);
    deck.push(deckTheme[i]);
  }
}

// shuffle cards
function shuffleCards() {
  var deckRaw = deck.slice(0, deck.length);
  deck = []
  while (deckRaw.length > 0){
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

    // make card front
    cardID = deck[i];
    cardDiv = document.createElement("div");
    cardDiv.classList.add(cardID, "card");
    document.querySelector(".con"+ parseInt(i)).appendChild(cardDiv);
    cardDiv.innerHTML = cardID;

    // make card back
    cardBack = document.createElement("div");
    cardBack.classList.add("layer", cardID);
    document.querySelector(".con" + parseInt(i)).appendChild(cardBack);

    //make card listener
    cardBack.addEventListener("click", playCard)
  }
}

function playCard() {
  moves++;
  //  player chooses first card
  if ((moves % 2) === 1) {
    // turn over card
    this.style.opacity = 0;
    // activeCard gets clicked card's class
    activeCard = this.classList[1];
    first = this;
  }
  //  player chooses second card
  if ((moves % 2) === 0){
    // turn over card
    this.style.opacity = 0;
    // check for match

    // if no match: wait 2 seconds, flip both back over
    if (activeCard != this.classList[1]){
      var self = this;
      setTimeout(function() {first.style.opacity = 1; self.style.opacity = 1}, 1000)
    }
    // else do nothing
  }
}

// round:

//  player chooses first card

if ((moves % 2) === 1) {
  // turn over card (cardBack opacity: 0)
  // activeCard gets clicked card's class
}
//  player chooses second card
if ((moves % 2) === 0){
//  check for match
//   if no match: wait 2 seconds, flip back over
//   else do nothing
}



// if all matches are made, leave round loop. otherwise, restart

// begin new game



populateCards();
shuffleCards();
console.log(deck);
displayCards()
