class GameView extends GameLogic {
  constructor(){
    super()
    this.model = new GameLogic()
  }

  startGame () {

  }

  validateKeypress (key) {
    let re = new RegExp(/^[a-zA-Z]+$/, 'i')
    if (re.exec(key)) {
      return true
    } else {
      return false
    }
  }
}
