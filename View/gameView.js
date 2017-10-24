class GameView extends GameLogic {
  constructor(){
    super()
    this.validKeypress = false
  }

  get currentWordArr () {
    return this.currentWord.split('')
  }

  setCurrentWord () {
    for (let i = 0; i < this.currentWordArr.length; i++){
      $('.correct-guess-holder').append($(`<div class="correct-guess">
        <p class="correct-guess-letter">${game1.currentWordArr[i]}</p>
      </div>`))
    }
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
