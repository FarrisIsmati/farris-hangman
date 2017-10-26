class GameLogic {
  constructor(){
    //Main game logic
    this.words = this.retreiveWords()
    this.usedWords = []
    this.score = 0

    //Current Word
    this.currentWord = ''
    this.incorGuess = []
    this.corGuess = []
    this.tries = 7
    this.validKeypress = false
    this.victory = false
  }

  retreiveWords(){
    return words.slice('')
  }

  //Increment to Used
  setUsedWords(randomNum){
    this.words.splice(randomNum, 1)
    this.usedWords.push(this.currentWord)
  }

  //Check if variable has been entered in array
  hasNotBeenEntered(letter){
    if (this.incorGuess.indexOf(letter) === -1 && this.corGuess.indexOf(letter) === -1){
      return true
    } else {
      return false
    }
  }

  //Check if letter matches with letter in the word
  checkLetter(letter){
    let re = new RegExp(letter, 'i')
    if (re.exec(this.currentWord) && letter != ''){
      return true
    } else {
      return false
    }
  }

  storeGuessedLetter(arr, letter){
    if (arr.length > 1){
      arr.push(letter)
    } else {
      arr.push(letter)
    }
  }

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
