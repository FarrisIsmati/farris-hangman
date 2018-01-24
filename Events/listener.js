class GameStarter{
  constructor(){
    this.validKeypress = false
    this.game = new Game()
  }

  //Starts up game and calls on event listeners
  startGame(){
    this.game.getNewWord()
    this.letterValidate()
    this.submitButton()
    this.setCurrentWord()
  }

  //Checks if letter is valid on input
  letterValidate(){
    let self = this
    $("#letter-input").on("input", function() {
        let input = $("#letter-input").val()
        if (self.game.letter.validateLetter(input)){
          self.validKeypress = true
        } else {
          self.validKeypress = false
        }
    }).keydown(function (e) {
      if (e.keyCode == 13) {
        self.submitLetter($("#letter-input").val())
      }
    })
  }

  //Sends letter to game class
  submitLetter () {
    if (!this.game.victory){
      if (this.validKeypress){
        this.game.letter.submitLetter($("#letter-input").val().toUpperCase())
        $("#letter-input").val("")
      }
    }
  }

  //Input button submit
  submitButton(){
    let self = this
    $("#submit").on("click", function() {
      self.submitLetter()
    })
  }

  //Sets up the current starting word in the div
  setCurrentWord(){
    $(".correct-guess").remove()
    for (let i = 0; i < this.game.word.length; i++){
      $(".correct-guess-holder").append($(`<div class="correct-guess">
        <p class="correct-guess-letter">${this.game.word[i]}</p>
      </div>`))
    }
  }
}
