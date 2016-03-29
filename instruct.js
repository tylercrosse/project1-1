pageSettings = {
  showInstructions: function() {
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
  }
}
