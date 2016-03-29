concentration = {

  shapes: ['triangle', 'square', 'circle', 'parallelogram', 'pentagon', 'octagon', 'hexagon', 'rectangle'],
  animals: ['sheep', 'cow', 'cat', 'pig', 'bird', 'octopus', 'fox', 'dog'],
  space: ['crab1', 'crab2', 'eagle', 'jupiter', 'ldwarf', 'm1', 'mars', 'medusa', 'mercury', 'moon', 'nebula', 'oefner', 'pillars', 'pleiades', 'saturn', 'sun', 'tdwarf', 'ydwarf'],
  cInterval: '',

  initialize: function() {
    this.cleanOldCards();
    this.deck = [];
    this.moves = 0;
    this.activeCard = undefined;
    this.matches = 0;
    this.busy = false;
    this.checkTheme();
    this.numSymbols = this.deckTheme.length;
    this.timer();
    this.populateCards();
    this.shuffleCards();
    this.displayCards();
  },

  cleanOldCards: function() {
    oldCards = document.querySelectorAll(".card-container")
    if (oldCards.length > 0) {
      for (i = 0; i < oldCards.length; i++){
        document.querySelector(".card-area").removeChild(oldCards[i]);
      }
    }
  },

  timer: function() {
    seconds = 00;
    minutes = 00;
    var appendSeconds = document.querySelector(".seconds");
    var appendMinutes = document.querySelector(".minutes");
    this.cInterval = setInterval(startTimer, 1000);
    function startTimer() {
      seconds++;
      if (seconds < 10) {
        appendSeconds.innerHTML = "0" + seconds;
      }
      else if (seconds < 60) {
        appendSeconds.innerHTML = seconds;
      }
      else if (seconds > 60) {
        minutes++;
        appendMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        appendSeconds.innerHTML = "00";
      }
    }
  },

  checkTheme: function() {
    shButton = document.querySelector("#shapes-button");
    anButton = document.querySelector("#animals-button");
    spButton = document.querySelector("#space-button");
    playArea = document.querySelector(".card-area");
    if (shButton.checked) {
      this.theme = "shapes";
      this.deckTheme = this.shapes.slice(0, this.shapes.length);
      playArea.style.width = "480px";
    }
    else if (anButton.checked) {
      this.theme = "animals";
      this.deckTheme = this.animals.slice(0, this.animals.length);
      playArea.style.width = "480px";
    }
    else if (spButton.checked) {
      this.theme = "space";
      this.deckTheme = this.space.slice(0, this.space.length);
      playArea.style.width = "720px";
    }
    shButton.addEventListener("click", function() {clearInterval(concentration.cInterval); concentration.playGame()});
    anButton.addEventListener("click", function() {clearInterval(concentration.cInterval); concentration.playGame()});
    spButton.addEventListener("click", function() {clearInterval(concentration.cInterval); concentration.playGame()});
  },

  populateCards: function() {
    for (var i = 0; i < this.numSymbols; i++){
      this.deck.push(this.deckTheme[i]);
      this.deck.push(this.deckTheme[i]);
    }
  },

  shuffleCards: function() {
    var deckRaw = this.deck.slice(0, this.deck.length);
    this.deck = []
    while (deckRaw.length > 0){
      var newCard = parseInt(Math.random() * deckRaw.length)
      this.deck.push(deckRaw[newCard]);
      deckRaw.splice(newCard, 1);
    }
  },

  displayCards: function(){
    for(var i = 0; i < this.deck.length; i++){
      // card slot
      cardCont = document.createElement("div");
      cardCont.classList.add("card-container", "con" + parseInt(i));
      document.querySelector(".card-area").appendChild(cardCont);

      // card front
      cardID = this.deck[i];
      cardDiv = document.createElement("div");
      cardDiv.classList.add(cardID, "card");
      document.querySelector(".con"+ parseInt(i)).appendChild(cardDiv);
      imageLoc = "url(images/" + this.theme + "/" + cardID + ".jpg)";
      cardDiv.style.backgroundImage = imageLoc;

      // card back
      cardBack = document.createElement("div");
      cardBack.classList.add("layer", cardID);
      document.querySelector(".con" + parseInt(i)).appendChild(cardBack);

      // card listener
      cardBack.addEventListener("click", this.playCard);
    }
  },

  playCard: function() {
    if (concentration.busy === false){
      concentration.moves++;
      //  player chooses first card
      if ((concentration.moves % 2) === 1) {
        this.style.opacity = 0;
        // activeCard gets clicked card's class
        activeCard = this.classList[1];
        first = this;
      }
      //  player chooses second card
      if ((concentration.moves % 2) === 0){
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
    clearInterval(this.cInterval);
    winMessage = document.createElement("div");
    winMessage.classList.add("message");
    winMessage.innerHTML = "It took you " + minutes + " minutes and " + seconds + " seconds!";
    document.querySelector(".messages").appendChild(winMessage);
    setTimeout(this.playGame, 5000);
  },

  playGame() {
    concentration.initialize();
  }
}

pageSettings.showInstructions();
concentration.playGame();
