//Need to add guess limit (word length + 3)
//Need to add guess word correctly
class GameLogic {
  constructor(){
    this.words = this.retreiveWords()
    this.usedWords = []
    this.currentWord = ''
    this.score = 0
    this.incorGuess = []
    this.corGuess = []
  }

  //retrieves a new set of words
  retreiveWords(){
    return words.slice('')
  }

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

  //Increments score
  incrementScore(){
    this.score += 1
  }

  //Store guessed letters for current word
  storeLetter(letter){
    let curLetter = letter.toUpperCase()
    //If you haven't already guessed the letter
    if (this.incorGuess.indexOf(curLetter) === -1 || this.corGuess.indexOf(curLetter) === -1){
      //If correctly guessed store in correctly guessed else store in incorrectly guessed
      if (this.checkLetter(letter)) {
        this.storeGuessedLetter(this.corGuess, letter)
      } else {
        this.storeGuessedLetter(this.incorGuess, letter)
      }
    } else {
      return false
    }
  }

  //Check if letter matches with letter in the word
  checkLetter(letter){
    console.log(this.currentWord)
    let re = new RegExp(letter, 'i')
    if (re.exec(this.currentWord)){
      //If COMPLETED word
        //INCREMENT score
        //NEW WORD?
      //Else
        //RETURN TRUE
      return true
    } else {
      return false
    }
  }

  storeGuessedLetter(arr, letter){
    if (arr.length > 1){
      arr.push(letter)
      arr.sort()
    } else {
      arr.push(letter)
    }
  }
}
