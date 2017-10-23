class newGame {
  constructor(){
    this.playerState = {}
    this.words = retreiveWords()
    this.usedWords = []
    this.score = 0
  }

  retreiveWords(){
    //Returns all words from words.js
  }

  retrieveWord(word){
    //choose a random word
    //let curWord = new CurrentWord(word)
    //this.usedWords.push(word)
    //this.removeWord()
  }

  removeWord(word){
    //removes word
  }

  incrementScore(){
    //this.score += 1
  }

  //SILVER
  storeToLocalStorage(){
    //Store all relevant data into local storage
    //
  }
}
