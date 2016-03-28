
concentration = {
  // lists of potential card faces - to switch, change this.theme
  // and deckTheme in initialize
  shapes: ['triangle', 'square', 'circle', 'parallelogram', 'pentagon', 'octagon', 'hexagon', 'rectangle'],
  // deck variables
  theme: "shapes",
  numCards: 16,
  numSymbols: 8,

  initialize: function() {
    console.log("Beginning game");
    oldCards = document.querySelectorAll(".card-container")
    if (oldCards.length > 0) {
      for (i = 0; i < oldCards.length; i++){
        document.querySelector(".card-area").removeChild(oldCards[i]);
      }
    }
    this.deckTheme = this.shapes.slice(0, this.shapes.length),
    this.deck = [];
    this.moves = 0;
    this.activeCard = undefined;
    this.matches = 0;
    this.busy = false;
    this.instructions();
    this.populateCards();
    this.shuffleCards();
    this.displayCards();
  },

  instructions: function() {
    instButton = document.querySelector(".inst-container button");
    instButton.addEventListener("click", function() {
      instText = document.querySelector(".inst-container p");
      if (instText.style.visibility == "visible"){
        instText.style.visibility = "hidden";
      }
      else {
        instText.style.visibility = "visible";
      }
    })
  },

  //create the deck
  populateCards: function() {
    for (var i = 0; i < this.numCards/2; i++){
      this.deck.push(this.deckTheme[i]);
      this.deck.push(this.deckTheme[i]);
    }
  },

  // shuffle cards
  shuffleCards: function() {
    var deckRaw = this.deck.slice(0, this.deck.length);
    this.deck = []
    while (deckRaw.length > 0){
      var newCard = parseInt(Math.random() * deckRaw.length)
      this.deck.push(deckRaw[newCard]);
      deckRaw.splice(newCard, 1);
    }
  },

  // display cards
  displayCards: function(){
    for(var i = 0; i < this.deck.length; i++){
      // make card slot
      cardCont = document.createElement("div");
      cardCont.classList.add("card-container", "con" + parseInt(i));
      document.querySelector(".card-area").appendChild(cardCont);

      // make card front
      cardID = this.deck[i];
      cardDiv = document.createElement("div");
      cardDiv.classList.add(cardID, "card");
      document.querySelector(".con"+ parseInt(i)).appendChild(cardDiv);
      imageLoc = "url(images/" + this.theme + "/" + cardID + ".jpg)";
      cardDiv.style.backgroundImage = imageLoc;

      // make card back
      cardBack = document.createElement("div");
      cardBack.classList.add("layer", cardID);
      document.querySelector(".con" + parseInt(i)).appendChild(cardBack);

      //make card listener
      cardBack.addEventListener("click", this.playCard);
    }
  },

  playCard: function() {
    if (concentration.busy === false){
      concentration.moves++;
      //  player chooses first card
      if ((concentration.moves % 2) === 1) {
        // turn over card
        this.style.opacity = 0;
        // activeCard gets clicked card's class
        activeCard = this.classList[1];
        first = this;
      }
      //  player chooses second card
      if ((concentration.moves % 2) === 0){
        // turn over card
        this.style.opacity = 0;
        // if no match: wait 1 second, flip both back over
        if (activeCard != this.classList[1]){
          concentration.busy = true;
          var self = this;
          setTimeout(function() {first.style.opacity = 1; self.style.opacity = 1; concentration.busy = false;}, 1000)
        }
        else {
          concentration.matches++;
          if(concentration.matches===concentration.numSymbols){
            concentration.winnerIsYou();
          }
        }
      }
    }
  },

  winnerIsYou: function(){
    console.log("woohoo! you won the game!");
    setTimeout(playGame, 5000)
  }
}

function playGame(){
  concentration.initialize();
}



playGame()
