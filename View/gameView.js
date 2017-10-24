class GameView extends GameLogic {
  constructor(){
    super()
    this.model = new GameLogic()
    this.validKeypress = false
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
