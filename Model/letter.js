class Letter{
  constructor(){
    this.word = ''
    this.currentLetter = ''
    this.correctLetters = []
    this.incorrectLetters = []
    this.validLetter = false
  }

  _validateLetter(letter) {
    let re = new RegExp(/^[a-zA-Z]+$/, "i")
    if (re.exec(letter) && letter != "") {
      return true
    } else {
      return false
    }
  }

  setWord(word){
    this.word = word
  }

  submitLetter(letter){
    if (this._checkIfEntered(letter)){
      if (this._validateLetter(letter)){
        this._storeLetter(this.corGuess, letter)
        if (this._checkCompletion()){
          //DO SOMETHING
        }
      } else {
        this._storeLetter(this.incorGuess, letter)
      }
    }
  }

  _storeLetter(arr, letter){
    arr.push(letter)
  }

  _checkIfEntered(letter){
    if (this.incorrectLetters.indexOf(letter) === -1 && this.correctLetters.indexOf(letter) === -1){
      return true
    } else {
      return false
    }
  }

  _checkCompletion(){
    let seen = {}
    let reducedArr = this.word.split('').filter(function(item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    })
    if (reducedArr.length === this.correctLetters.length){
      return true
    } else {
      return false
    }
  }

  getCorrectLetters(){
    return this.correctLetters
  }

  getIncorrectLetters(){
    return this.incorrectLetters
  }
}
