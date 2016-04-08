concentration = {

  shapes: ['triangle', 'square', 'circle', 'parallelogram', 'pentagon', 'octagon', 'hexagon', 'rectangle'],
  animals: ['sheep', 'cow', 'cat', 'pig', 'bird', 'octopus', 'fox', 'dog'],
  space: ['crab1', 'crab2', 'eagle', 'jupiter', 'ldwarf', 'm1', 'mars', 'medusa', 'mercury', 'moon', 'nebula', 'oefner', 'pillars', 'pleiades', 'saturn', 'sun', 'tdwarf', 'ydwarf'],
  cInterval: '',
  animation: '',
  numGames: 0,

  initialize: function() {
    this.cleanOldCards();
    this.deck = [];
    this.moves = 0;
    this.activeCard = undefined;
    this.matches = 0;
    this.busy = false;
    this.o = 0;
    this.y = -(document.getElementsByTagName('body')[0].clientWidth/2);
    this.checkTheme();
    this.numSymbols = this.deckTheme.length;
    this.resetButton();
    this.timer();
    this.populateCards();
    this.shuffleCards();
    this.displayCards();
  },

  // This format of method definitions was introduced in ES6, but
  // unfortunately isn't universally supported.
  // Most modern browsers will run it but it will throw an error on older browsers.
  resetButton() {
    resetButton = document.querySelector(".reset button");
    resetButton.addEventListener("click", function() {clearInterval(concentration.cInterval); concentration.playGame()});
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
    appendSeconds.innerHTML = "00";
    appendMinutes.innerHTML = "00";
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
      document.body.style.backgroundImage = "url('images/backgrounds/shapesbackground.png')"
    }
    else if (anButton.checked) {
      this.theme = "animals";
      this.deckTheme = this.animals.slice(0, this.animals.length);
      playArea.style.width = "480px";
            document.body.style.backgroundImage = "url('images/backgrounds/animalsbackground.png')"
    }
    else if (spButton.checked) {
      this.theme = "space";
      this.deckTheme = this.space.slice(0, this.space.length);
      playArea.style.width = "720px";
            document.body.style.backgroundImage = "url('images/backgrounds/spacebackground.png')"
    }
    shButton.addEventListener("click", function() {if (!concentration.busy){clearInterval(concentration.cInterval); concentration.playGame()}});
    anButton.addEventListener("click", function() {if (!concentration.busy){clearInterval(concentration.cInterval); concentration.playGame()}});
    spButton.addEventListener("click", function() {if (!concentration.busy){clearInterval(concentration.cInterval); concentration.playGame()}});
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
      var cardCont = document.createElement("div");
      cardCont.classList.add("card-container", "con" + i);
      document.querySelector(".card-area").appendChild(cardCont);

      // card front
      var cardID = this.deck[i];
      var cardDiv = document.createElement("div");
      cardDiv.classList.add(cardID, "card");
      document.querySelector(".con"+ i).appendChild(cardDiv);
      var imageLoc = "url(images/" + this.theme + "/" + cardID + ".jpg)";
      cardDiv.style.backgroundImage = imageLoc;

      // card back
      var cardBack = document.createElement("div");
      cardBack.classList.add("layer", cardID);
      document.querySelector(".con" + i).appendChild(cardBack);

      // card listener
      cardBack.addEventListener("click", this.playCard);
    }
  },

  // Great use of commenting to increase the readability of the code! :+1:
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
      // It might be nice to break out the contents of this if statement into
      // a separate function and pass it the current context with .bind().
      // Two shorter functions are generally better than one really long
      // espcially if it has a bunch of nested blocks.
        this.style.opacity = 0;
        // if no match: wait 1 second, flip both back over
        if ((activeCard != this.classList[1]) || (first === this)){
          concentration.busy = true;
          var self = this;
          setTimeout(function() {first.style.opacity = 1; self.style.opacity = 1; concentration.busy = false;}, 1000)
        }
        else {
          concentration.matches++;
          this.style.opacity = 0.6;
          first.style.opacity = 0.6;
          this.removeEventListener("click", concentration.playCard)
          first.removeEventListener("click", concentration.playCard)
          if(concentration.matches===concentration.numSymbols){
            concentration.winnerIsYou();
          }
        }
      }
    }
  },

  winnerIsYou: function(){
    this.busy=true;
    this.startWinningAnimation();
    clearInterval(this.cInterval);
    this.numGames++;
    winMessage = document.createElement("div");
    winMessage.classList.add("message");
    winMessage.innerHTML = "Game " + this.numGames + ": It took you " + minutes + " minutes and " + seconds + " seconds to complete the " + this.theme + " board!";
    document.querySelector(".messages").appendChild(winMessage);
    setTimeout(this.playGame, 10000);
  },

  startWinningAnimation: function() {
    var congrats = document.createElement("div");
    congrats.classList.add("congrats", "row");
    document.body.appendChild(congrats)
    var woo = document.createElement("div");
    woo.classList.add("moveme");
    woo.innerHTML = "woohoo! you found all the matches!";
    congrats.appendChild(woo);
    concentration.animation = setInterval(concentration.winningAnimation, 1);
  },

  // It's awesome that you added this animation! Typically it's considered
  // a best practice to do animations with CSS instad of with javascript.
  // This is because javascript animations can 'tie up the callstack' a.k.a.
  // they can prevent javascript from running other functions while they are
  // taking place. CSS animations can be triggered with javascript by adding
  // and removing CSS classes that contain the CSS animation. I made a codepen to
  // illustrate how this could be accomplished http://codepen.io/crosset/pen/NNXLWO
  winningAnimation() {
    var maxY = document.getElementsByTagName('body')[0].clientWidth;
    toMove = document.querySelector(".moveme");
    toMove.style.margin="0px 0px 0px " + concentration.y + "px";
    concentration.y ++;
    if (concentration.y < 300 && concentration.o < 1.0){
      concentration.o += 0.005;
      toMove.style.opacity = concentration.o;
    }
    else if (concentration.y > maxY - 400){
      concentration.o -= 0.005;
      toMove.style.opacity = concentration.o;
    }
    if (concentration.y > maxY - 250){
      clearInterval(concentration.animation);
      document.querySelector(".congrats").removeChild(toMove);
      document.body.removeChild(document.querySelector(".congrats"))
    }
  },

  playGame() {
    concentration.initialize();
  }
}

pageSettings.showInstructions();
concentration.playGame();
