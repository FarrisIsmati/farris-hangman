class GameLogic {
  constructor(){
    this.words = this.retreiveWords()
    this.usedWords = []
    this.score = 0
  }

  retreiveWords(){
    return words.slice('')
  }

  createRandomNum(){
    return Math.floor(Math.random()*this.words.length)
  }

  retrieveWord(){
    if (this.words.length > 1) {
      let randomNum = this.createRandomNum()
      let currentWord = this.words[randomNum]
      this.usedWords.push(currentWord)
      this.removeWord(randomNum)
    } else {
      this.words = this.retreiveWords()
    }
  }

  removeWord(pos){
    this.words.splice(pos, 1)
  }

  incrementScore(){
    this.score += 1
  }
}
