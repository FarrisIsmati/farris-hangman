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
    this.tries = 0
    this.validKeypress = false
  }

  //retrieves a new set of words
  retreiveWords(){
    return words.slice('')
  }

  //retrieves a current random word
  retrieveWord(){
    let randomNum = Math.floor(Math.random()*this.words.length)
    if (this.words.length > 1) {
      this.reset()
      this.currentWord = this.words[randomNum]
      this.tries = this.setTries(this.currentWord)
      this.setUsedWords(randomNum)
      this.setCurrentWord()
    } else {
      this.words = this.retreiveWords()
      this.retrieveWord()
    }
  }

  //Store guessed letters for current word
  storeLetter(letter){
    //If you haven't already guessed the letter
    if (this.hasNotBeenEntered(letter)){
      //If correctly guessed store in correctly guessed else store in incorrectly guessed
      if (this.checkLetter(letter)) {
        this.storeGuessedLetter(this.corGuess, letter)
        this.revealLetter(letter)
        //CHECK WIN CONDITIONS
        if (this.checkCompletion()){
          this.incrementScore()
          //this.reset()
          this.retrieveWord()
        }
      } else {
        this.storeGuessedLetter(this.incorGuess, letter)
      }
    } else {
      return false
    }
  }

  setUsedWords(randomNum){
    this.words.splice(randomNum, 1)
    this.usedWords.push(this.currentWord)
  }

  setTries(word){
    return word.length + 3
  }

  incrementScore(){
    console.log('VICTORY')
    this.score += 1
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
    if (re.exec(this.currentWord)){
      //If complete increment score and retreive new word else the letter matches
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

  checkCompletion(){
    let seen = {}
    let reducedArr = this.currentWord.split('').filter(function(item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    })
    if (reducedArr.length === this.corGuess.length){
      console.log('COMPLETED')
      return true
    } else {
      return false
    }
  }

  reset(){
    this.currentWord = ''
    this.corGuess = []
    this.incorGuess = []
  }

  //---VIEW PORTION---
  get currentWordArr () {
    return this.currentWord.split('')
  }

  setCurrentWord () {
    $('.correct-guess').remove()
    for (let i = 0; i < this.currentWordArr.length; i++){
      $('.correct-guess-holder').append($(`<div class="correct-guess">
        <p class="correct-guess-letter">${this.currentWordArr[i]}</p>
      </div>`))
    }
  }

  revealLetter (letter) {
    let currentLetter = $('.correct-guess').children()
    currentLetter.each(function(){
      if (letter === this.innerHTML){
        $(this).css('opacity', 1)
      }
    })
  }

  validateKeypress (key) {
    let re = new RegExp(/^[a-zA-Z]+$/, 'i')
    if (re.exec(key)) {
      return true
    } else {
      return false
    }
  }

  submitLetter () {
    console.log(game1)
    let curLetter = $('#letterInput').val()
    if (this.validKeypress){
      this.storeLetter(curLetter.toUpperCase())
    }
  }
}
