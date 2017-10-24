//Need to add guess limit (word length + 3)
//Need to add guess word correctly
class GameLogic {
  constructor(){
    this.words = this.retreiveWords()
    this.usedWords = []
    this.currentWord = this.retrieveWord()
    this.score = 0
    this.incorGuess = []
    this.corGuess = []
  }

  //PRIVATE
  //retrieves a new set of words
  retreiveWords(){
    return words.slice('')
  }

  //PUBLIC
  //retrieves a current random word
  retrieveWord(){
    if (this.words.length > 1) {
      let randomNum = Math.floor(Math.random()*this.words.length)
      this.currentWord = this.words[randomNum]
      this.words.splice(randomNum, 1)
      this.usedWords.push(this.currentWord)
    } else {
      this.words = this.retreiveWords()
      this.retrieveWord()
    }
  }

  //PRIVATE
  //Increments score
  incrementScore(){
    console.log('VICTORY')
    this.score += 1
  }

  //PUBLIC
  //Store guessed letters for current word
  storeLetter(letter){
    let curLetter = letter.toUpperCase()
    //If you haven't already guessed the letter
    if (this.incorGuess.indexOf(curLetter) === -1 || this.corGuess.indexOf(curLetter) === -1){
      //If correctly guessed store in correctly guessed else store in incorrectly guessed
      if (this.checkLetter(letter)) {
        this.storeGuessedLetter(this.corGuess, letter)
        //CHECK WIN CONDITIONS
        if (this.checkCompletion()){
          this.incrementScore()
          this.reset()
          this.retrieveWord()
        }
      } else {
        this.storeGuessedLetter(this.incorGuess, letter)
      }
    } else {
      //DO NOT STORE LETTER
      return false
    }
  }

  //PRIVATE
  //Check if letter matches with letter in the word
  checkLetter(letter){
    let re = new RegExp(letter, 'i')
    if (re.exec(this.currentWord)){
      //If complete increment score and retreive new word else the letter matches
      return true
    } else {
      return false
    }
  }

  //PRIVATE
  storeGuessedLetter(arr, letter){
    if (arr.length > 1){
      arr.push(letter)
      arr.sort()
    } else {
      arr.push(letter)
    }
  }

  //PRIVATE
  checkCompletion(){
    //USE THIS TO GET NON REPEATED WORDS IN THE WORD
    let seen = {}
    let reducedArr = this.currentWord.split('').filter(function(item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    })
    //console.log(reducedArr.length + ' : ' + this.corGuess.length)
    //console.log(this.corGuess)
    if (reducedArr.length === this.corGuess.length){
      console.log('COMPLETED')
      return true
    } else {
      return false
    }
  }

  reset(){
    //EMPTY BOTH ARRAYS
    this.corGuess = []
    this.incorGuess = []
  }
}
