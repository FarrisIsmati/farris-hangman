class GameLogic {
  constructor(){
    this.words = this.retreiveWords()
    this.usedWords = []
    this.score = 0
    this.highScore = 0
    this.currentWord = ''
    this.incorGuess = []
    this.corGuess = []
    this.tries = 7
    this.validKeypress = false
    this.victory = false
  }

  //SETTING UP WORDS ARRAYS

  retreiveWords(){
    return words.slice('')
  }

  setUsedWords(randomNum){
    this.words.splice(randomNum, 1)
    this.usedWords.push(this.currentWord)
  }

  //LETTER CHECKING

  hasNotBeenEntered(letter){
    if (this.incorGuess.indexOf(letter) === -1 && this.corGuess.indexOf(letter) === -1){
      return true
    } else {
      return false
    }
  }

  checkLetter(letter){
    let re = new RegExp(letter, 'i')
    if (re.exec(this.currentWord) && letter != ''){
      return true
    } else {
      return false
    }
  }

  //STORING LETTERS

  storeGuessedLetter(arr, letter){
    if (arr.length > 1){
      arr.push(letter)
    } else {
      arr.push(letter)
    }
  }

  //CHECKING IF WORD IS COMPLETE

  checkCompletion(){
    let seen = {}
    let reducedArr = this.currentWord.split('').filter(function(item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    })
    if (reducedArr.length === this.corGuess.length){
      return true
    } else {
      return false
    }
  }
}
