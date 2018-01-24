class Game {
  constructor(){
    this.tries = new Tries()
    this.score = new Score()
    this.letter = new Letter(this.tries)
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
      this.word = this.words[randomNum]
      this.letter.setWord(this.word)
      this.storeUsedWords(randomNum)
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
    this.word = ""
  }
}
