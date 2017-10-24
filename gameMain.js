let game1 = new GameView()

$('#submit').on('click', function() {
  let curLetter = $('#letterInput').val()
})

$('#letterInput').on("input", function() {
    let keyInput = this.value;
    console.log(keyInput);
});
