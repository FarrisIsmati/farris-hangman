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

  toggleClass(element, class1, class2){
    if (element.hasClass(class2)){
      element.addClass(class1)
      element.removeClass(class2)
    } else {
      element.removeClass(class1)
      element.addClass(class2)
    }
  }

  callListeners(){
    this.nextBtn()
    this.submitBtn()
    this.letterValidate()
  }

  runNext(){
    this.toggleClass($('#next'), 'button-enable','button-disable')
    this.retrieveWord()
    this.victory = false
    this.setIncorrectGuess()
  }

  nextBtn() {
    let self = this
    $('#next').on('click', function() {
      if (self.victory === true){
        self.runNext()
      }
    })
  }

  submitBtn(){
    let self = this
    $('#submit').on('click', function() {
      self.submitLetter()
    })
  }

  letterValidate(){
    let self = this
    $('#letterInput').on("input", function() {
        let keyInput = $('#letterInput').val();
        if (self.validateKeypress(keyInput)){
          self.validKeypress = true
        } else if (keyInput === '') {
          //Ignore this keystroke
        } else {
          self.validKeypress = false
        }
    }).keydown(function (e) {
      if (e.keyCode == 13) {
        self.submitLetter()
      }
    })
  }

  //retrieves a current random word
  retrieveWord(){
    let randomNum = Math.floor(Math.random()*this.words.length)
    if (this.words.length > 1) {
      this.reset()
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
          this.toggleClass($('#next'),'button-enable','button-disable')
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

  decrementTries(){
    this.tries -= 1
    this.addHangman(this.tries + 1)
    if (0 === this.tries){
      this.retrieveWord()
      //this.setIncorrectGuess()
    }
  }

  addHangman(tries){
    this.toggleClass($(`#hang-${tries}`), 'show', 'hide')
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
    if (re.exec(key) && key != '') {
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
