class GameView extends GameLogic {
  constructor(){
    super()
    this.validKeypress = false
  }

  get currentWordArr () {
    return this.currentWord.split('')
  }

  validateKeypress (key) {
    let re = new RegExp(/^[a-zA-Z]+$/, 'i')
    if (re.exec(key)) {
      return true
    } else {
      return false
    }
  }

  submitLetter () {
    console.log(game1)
    let curLetter = $('#letterInput').val()
    if (this.validKeypress){
      this.storeLetter(curLetter.toUpperCase())
    }
  }

}
