//Need to add guess limit (word length + 3)
//Need to add guess word correctly

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
  }

  //PRIVATE
  //retrieves a new set of words
  retreiveWords(){
    return words.slice('')
  }

  setUsedWords(randomNum){
    this.words.splice(randomNum, 1)
    this.usedWords.push(this.currentWord)
  }

  //PUBLIC
  //retrieves a current random word
  retrieveWord(){
    console.log('RUN THIS RETREIVE WORD FUNCITON!')
    if (this.words.length > 1) {
      let randomNum = Math.floor(Math.random()*this.words.length)
      this.currentWord = this.words[randomNum]
      this.setUsedWords(randomNum)
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

  hasNotBeenEntered(letter){
    if (this.incorGuess.indexOf(letter) === -1 && this.corGuess.indexOf(letter) === -1){
      return true
    } else {
      return false
    }
  }

  //PUBLIC
  //Store guessed letters for current word
  storeLetter(letter){
    let curLetter = letter.toUpperCase()
    //If you haven't already guessed the letter
    if (this.hasNotBeenEntered(curLetter)){
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
    let curLetter = letter.toUpperCase()
    if (arr.length > 1){
      arr.push(curLetter)
      arr.sort()
    } else {
      arr.push(curLetter)
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

  //Private
  reset(){
    //EMPTY BOTH ARRAYS
    this.corGuess = []
    this.incorGuess = []
  }
}
