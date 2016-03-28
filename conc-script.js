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

populateCards();
shuffleCards();
console.log(deck);

// display cards

// rounds:
//  player chooses first card
//  player chooses second card
//  check for match
//   if no match: wait 2 seconds, flip back over
//   else do nothing
// if all matches are made, leave round loop. otherwise, restart

// begin new game
