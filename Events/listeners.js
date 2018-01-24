function callListeners() {
  //this.letterValidate()
  submitBtn()
  nextBtn()
  //this.showHighScore()
  //this.lostBtn()
  //this.animateHangman()
}

function onWin() {
  this.toggleClass($("#next"), "button-enable","button-disable")
  this.retrieveWord()
  this.victory = false
  this.setIncorrectGuess()
}

function changeHighScore(score) {
  $("#score").text(score)
  this.toggleClass($("#score"), "normal-score", "high-score")
}

function showHighScore() {
  let self = this
  $( ".header" ).mouseenter( () => {
    self.changeHighScore(self.highScore)
  }).mouseleave( () => {
    self.changeHighScore(self.score)
  })
}

function animateHangman() {
  $( "#Hangman" ).animate({
    svgTransform: "translate(40, -63) rotate(10, 10, 0)"
  }, 3500)
  $( "#Hangman" ).animate({
    svgTransform: "translate(-35, 75) rotate(-10, 20, -30)"}, 3500
  )
  setTimeout(function(){
    this.animateHangman()
  }.bind(this),1)
}

function lostBtn() {
  let self = this
  $("#fade-screen").on("click", function() {
    self.toggleClass($("#fade-screen"), "hide2","show2")
    self.retrieveWord()
    self.setIncorrectGuess()
    $("#score").text(self.score)
  })
}

function nextBtn() {
  let self = this
  $("#next").on("click", function() {
    if (self.victoryCondition === true){
      self.onWin()
    }
  })
  $(document).keypress(function(e) {
    if(e.which === 13 && self.victoryCondition === true) {
      self.onWin()
    }
  })
}


//////Start here
function submitBtn(){
  let self = this
  $("#submit").on("click", function() {
    // self.submitLetter()
    //game.letter.submitLetter
    console.log('click')
  })
}
//
// submitLetter () {
//   if (!this.victory){
//     let inputBox = $("#letter-input")
//     if (this.validKeypress){
//       this.storeLetter(inputBox.val().toUpperCase())
//       inputBox.val("")
//     }
//   }
// }
//
// letterValidate(){
//   let self = this
//   $("#letter-input").on("input", function() {
//       let keyInput = $("#letter-input").val();
//       if (self.validateLetter(keyInput)){
//         self.validKeypress = true
//       } else if (keyInput === "") {
//         //Ignore this keystroke
//       } else {
//         self.validKeypress = false
//       }
//   }).keydown(function (e) {
//     if (e.keyCode == 13) {
//       self.submitLetter()
//     }
//   })
// }
