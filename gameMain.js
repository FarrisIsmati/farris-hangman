let game1 = new GameView()

game1.retrieveWord()

$('#submit').on('click', function() {
  let curLetter = $('#letterInput').val()
  if (game1.validKeypress){
    game1.storeLetter(curLetter)
    console.log(game1)
  }
})

$('#letterInput').on("input", function() {
    let keyInput = this.value;
    if (game1.validateKeypress(keyInput)){
      console.log('You may enter that!')
      game1.validKeypress = true
    } else if (keyInput === '') {
      //Ignore this keystroke
    } else {
      console.log('You cannot enter that :(')
      game1.validKeypress = false
    }
});
