class Letter{
  constructor(tries){
    this.tries = tries
    this.word = ''
    this.currentLetter = ''
    this.correctLetters = []
    this.incorrectLetters = []
    this.validLetter = false
  }

  validateLetter(letter) {
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
    if (this._checkIfEntered(letter) && this.validateLetter(letter)){
      if (this._checkMatch(letter)){
        this._storeLetter(this.correctLetters, letter)
        this._revealLetter(letter)
        if (this._checkCompletion()){
          //set finished word to true
        }
      } else {
        this._storeLetter(this.incorrectLetters, letter)
        this.tries.decrementTries()
      }
    }
  }

  _checkMatch(letter){
    if (this.word.indexOf(letter.toUpperCase()) != -1){
      return true
    } else {
      return false
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

  //Shows the revealed letter upon guessing correctly
  _revealLetter(letter) {
    let currentLetter = $(".correct-guess").children()
    currentLetter.each(function(){
      if (letter === this.innerHTML){
        $(this).css("opacity", 1)
      }
    })
  }

  getCorrectLetters(){
    return this.correctLetters
  }

  getIncorrectLetters(){
    return this.incorrectLetters
  }
}
