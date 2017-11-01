class Game {
  constructor(){
    this.score = new Score()
    this.tries = new Tries()
    this.letter = new Letter()
    this.word = ""
    this.words = this.retrieveNewWords()
    this.usedWords = []
    this.victory = false
  }

  retrieveNewWords(){
    return words.slice("")
  }

  getNewWord(){
    let randomNum = Math.floor(Math.random()*this.words.length)
    if (this.words.length > 1) {
      //this.reset()
      this.word = this.words[randomNum]
      this.letter.setWord(this.word)
      this.storeUsedWords(randomNum)
      //this.setCurrentWord()
    } else {
      this.words = this.retrieveNewWords()
      this.getNewWord()
    }
  }

  storeUsedWords(randomNum){
    this.words.splice(randomNum, 1)
    this.usedWords.push(this.word)
  }

  victoryCondition(){
  }

  reset(){
    this.tries.resetTries()
    //this.hideHangman()
    this.word = ""
    //this.corGuess = []
    //this.incorGuess = []
  }

}

let game = new Game()
game.getNewWord()
