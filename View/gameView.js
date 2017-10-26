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

  get victoryCondition () {
    return this.victory
  }

  setVictoryTrue () {
    this.victory = true
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
    this.lostBtn()
    this.letterValidate()
    this.animateHangman()
    this.showHighScore()
  }

  showHighScore() {
    let self = this
    $( '.header' ).mouseenter( () => {$('#score').text(self.highScore)
      self.toggleClass($('#score'), 'normal-score', 'high-score')} ).mouseleave( () => {$('#score').text(self.score)
    self.toggleClass($('#score'), 'normal-score', 'high-score')} );
  }

  animateHangman() {
    $( "#Hangman" ).animate({ svgTransform: 'translate(40, -63) rotate(10, 10, 0)'}, 3500)
    $( "#Hangman" ).animate({ svgTransform: 'translate(-35, 75) rotate(-10, 20, -30)'}, 3500, )
    setTimeout(function(){
      this.animateHangman()
    }.bind(this),1)
  }

  lostBtn() {
    let self = this
    $('#fade-screen').on('click', function() {
      self.toggleClass($('#fade-screen'), 'hide2','show2')
      self.retrieveWord()
      self.setIncorrectGuess()
      $('#score').text(self.score)
    })
  }

  changeWord(){
    this.toggleClass($('#next'), 'button-enable','button-disable')
    this.retrieveWord()
    this.victory = false
    this.setIncorrectGuess()
  }

  nextBtn() {
    let self = this
    $('#next').on('click', function() {
      if (self.victoryCondition === true){
        self.changeWord()
      }
    })

    $(document).keypress(function(e) {
      if(e.which === 13 && self.victoryCondition === true) {
        self.changeWord()
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
    if (this.hasNotBeenEntered(letter) && letter != ''){
      if (this.checkLetter(letter)) {
        this.storeGuessedLetter(this.corGuess, letter)
        this.revealLetter(letter)
        if (this.checkCompletion()){
          //----VICTORY----
          this.incrementScore()
          setTimeout(function(){
            this.setVictoryTrue ()
          }.bind(this), 500);

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
      this.score = 0
      setTimeout(function(){
        this.toggleClass($('#fade-screen'), 'hide2','show2')
      }.bind(this), 500)
    }
  }

  addHangman(tries){
    this.toggleClass($(`#hang-${tries}`), 'show', 'hide')
  }

  hideHangman(){
    for (let i = 1; i <= 7; i++){
      $(`#hang-${i}`).removeClass('show')
      $(`#hang-${i}`).addClass('hide')
    }
  }

  incrementScore(){
    this.score += 1
    this.setHighScore()
    $('#score').text(this.score)
    setTimeout(function(){
      $('#score').addClass('increment-score')
    }, 50)
    setTimeout(function(){
      $('#score').removeClass('increment-score')
    }, 300)
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

  reset(){
    this.tries = 7
    this.hideHangman()
    this.currentWord = ''
    this.corGuess = []
    this.incorGuess = []
  }
}
