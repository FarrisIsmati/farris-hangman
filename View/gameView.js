class GameView extends GameLogic {
  constructor(){
    super()
    this.validKeypress = false
  }

  get currentWordArr () {
    return this.currentWord.split('')
  }

  get numberOfTries () {
    return this.tries
  }

  callListeners(){
    this.nextBtn()
    this.submitBtn()
    this.letterValidate()
  }

  nextBtn() {
    $('#next').on('click', function() {
      if (game1.victory === true){
        $('#next').css('color', 'white')
        game1.retrieveWord()
        game1.victory = false
        game1.setIncorrectGuess()
      }
    })
  }

  submitBtn(){
    $('#submit').on('click', function() {
      game1.submitLetter()
    })
  }

  letterValidate(){
    $('#letterInput').on("input", function() {
        let keyInput = this.value;
        if (game1.validateKeypress(keyInput)){
          game1.validKeypress = true
        } else if (keyInput === '') {
          //Ignore this keystroke
        } else {
          game1.validKeypress = false
        }
    }).keydown(function (e) {
      if (e.keyCode == 13) {
        game1.submitLetter()
      }
    })
  }

  //retrieves a current random word
  retrieveWord(){
    let randomNum = Math.floor(Math.random()*this.words.length)
    if (this.words.length > 1) {
      this.reset()
      this.setTries()
      this.currentWord = this.words[randomNum]
      this.setUsedWords(randomNum)
      this.setCurrentWord()
    } else {
      this.words = this.retreiveWords()
      this.retrieveWord()
    }
  }

  //Store guessed letters for current word
  storeLetter(letter){
    if (this.hasNotBeenEntered(letter)){
      console.log(game1)
      if (this.checkLetter(letter)) {
        this.storeGuessedLetter(this.corGuess, letter)
        this.revealLetter(letter)
        if (this.checkCompletion()){
          this.incrementScore()
          this.victory = true
          $('#next').css('color', 'black')
        }
      } else {
        this.storeGuessedLetter(this.incorGuess, letter)
        this.decrementTries()
        this.setIncorrectGuess()
      }
    } else {
      return false
    }
  }

  setTries() {
    this.tries = 7
    $('#number-of-tries').text(this.numberOfTries)
  }

  decrementTries(){
    this.tries -= 1
    $('#number-of-tries').text(this.numberOfTries)
    if (0 === this.tries){
      this.retrieveWord()
      //this.setIncorrectGuess()
    }
  }

  incrementScore(){
    this.score += 1
  }

  setIncorrectGuess () {
    $('.incorrect-guess').remove()
    for (let i = 0; i < this.incorGuess.length; i++){
      $('.incorrect-guess-holder').append($(`
        <p class="incorrect-guess">${this.incorGuess[i]}</p>`
      ))
    }
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
    if (!this.victory){
      let inputBox = $('#letterInput')
      if (this.validKeypress){
        this.storeLetter(inputBox.val().toUpperCase())
        inputBox.val('')
      }
    }
  }
}
