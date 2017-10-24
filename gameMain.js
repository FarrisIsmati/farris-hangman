let game1 = new GameView()

game1.retrieveWord()

for (let i = 0; i < game1.currentWordArr.length; i++){
  $('.correct-guess-holder').append($(`<div class="correct-guess">
    <p class="correct-guess-letter">${game1.currentWordArr[i]}</p>
  </div>`))
}

$('#submit').on('click', function() {
  game1.submitLetter()
})

$('#letterInput').on("input", function() {
    let keyInput = this.value;
    if (game1.validateKeypress(keyInput)){
      game1.validKeypress = true
    } else if (keyInput === '') {
      //Ignore this keystroke
    } else {
      game1.validKeypress = false
    }
}).keydown(function (e) {
  if (e.keyCode == 13) {
    game1.submitLetter()
  }
})
