let game1 = new GameView()

$('#submit').on('click', function() {
  let curLetter = $('#letterInput').val()
})

$('#letterInput').on("input", function() {
    let keyInput = this.value;
    if (game1.validateKeypress(keyInput)){
      console.log('You may enter that!')
    } else if (keyInput === '') {
      //Ignore this keystroke
    } else {
      console.log('You cannot enter that :(')
    }
});
