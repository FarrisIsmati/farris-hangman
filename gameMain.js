let game1 = new GameLogic()

game1.retrieveWord()

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
