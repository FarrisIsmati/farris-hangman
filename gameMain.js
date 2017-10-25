let game1 = new GameView()
game1.retrieveWord()

//NEXT BUTTON
$('#next').on('click', function() {
  if (game1.victory === true){
    $('#next').css('color', 'white')
    game1.retrieveWord()
    game1.victory = false
  }
})

//SUBMIT BUTTON
$('#submit').on('click', function() {
  game1.submitLetter()
})

//TEXTBOX INPUT
//Validates keypress
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
