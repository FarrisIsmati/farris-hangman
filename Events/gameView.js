class GameView extends GameLogic {
  constructor() {
    super()

    this.validKeypress = false
  }

  //GETTERS AND SETTERS

  get currentWordArr () {
    return this.currentWord.split("")
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

  //EVENT LISTENERS

  callListeners() {
    this.letterValidate()
    this.submitBtn()
    this.nextBtn()
    this.showHighScore()
    this.lostBtn()
    this.animateHangman()
  }

  onWin() {
    this.toggleClass($("#next"), "button-enable","button-disable")
    this.retrieveWord()
    this.victory = false
    this.setIncorrectGuess()
  }

  changeHighScore(score) {
    $("#score").text(score)
    this.toggleClass($("#score"), "normal-score", "high-score")
  }

  showHighScore() {
    let self = this
    $( ".header" ).mouseenter( () => {
      self.changeHighScore(self.highScore)
    }).mouseleave( () => {
      self.changeHighScore(self.score)
    })
  }

  animateHangman() {
    $( "#Hangman" ).animate({
      svgTransform: "translate(40, -63) rotate(10, 10, 0)"
    }, 3500)
    $( "#Hangman" ).animate({
      svgTransform: "translate(-35, 75) rotate(-10, 20, -30)"}, 3500
    )
    setTimeout(function(){
      this.animateHangman()
    }.bind(this),1)
  }

  lostBtn() {
    let self = this
    $("#fade-screen").on("click", function() {
      self.toggleClass($("#fade-screen"), "hide2","show2")
      self.retrieveWord()
      self.setIncorrectGuess()
      $("#score").text(self.score)
    })
  }

  nextBtn() {
    let self = this
    $("#next").on("click", function() {
      if (self.victoryCondition === true){
        self.onWin()
      }
    })
    $(document).keypress(function(e) {
      if(e.which === 13 && self.victoryCondition === true) {
        self.onWin()
      }
    })
  }

  submitBtn(){
    let self = this
    $("#submit").on("click", function() {
      self.submitLetter()
    })
  }

  //DOM MANIPULATION

  addHangman(tries){
    this.toggleClass($(`#hang-${tries}`), "show", "hide")
  }

  hideHangman(){
    for (let i = 1; i <= 7; i++){
      $(`#hang-${i}`).removeClass("show")
      $(`#hang-${i}`).addClass("hide")
    }
  }

  setIncorrectGuess () {
    $(".incorrect-guess").remove()
    for (let i = 0; i < this.incorGuess.length; i++){
      $(".incorrect-guess-holder").append(
        $(`<p class="incorrect-guess">${this.incorGuess[i]}</p>`
      ))
    }
  }

  setCurrentWord () {
    $(".correct-guess").remove()
    for (let i = 0; i < this.currentWordArr.length; i++){
      $(".correct-guess-holder").append($(`<div class="correct-guess">
        <p class="correct-guess-letter">${this.currentWordArr[i]}</p>
      </div>`))
    }
  }

  revealLetter (letter) {
    let currentLetter = $(".correct-guess").children()
    currentLetter.each(function(){
      if (letter === this.innerHTML){
        $(this).css("opacity", 1)
      }
    })
  }

  //KEYPRESS VALIDATION

  validateLetter (key) {
    let re = new RegExp(/^[a-zA-Z]+$/, "i")
    if (re.exec(key) && key != "") {
      return true
    } else {
      return false
    }
  }

  letterValidate(){
    let self = this
    $("#letter-input").on("input", function() {
        let keyInput = $("#letter-input").val();
        if (self.validateLetter(keyInput)){
          self.validKeypress = true
        } else if (keyInput === "") {
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

  submitLetter () {
    if (!this.victory){
      let inputBox = $("#letter-input")
      if (this.validKeypress){
        this.storeLetter(inputBox.val().toUpperCase())
        inputBox.val("")
      }
    }
  }

  //RETRIVAL OF WORDS

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

  //LETTER STORAGE & WINNING

  storeLetter(letter){
    if (this.hasNotBeenEntered(letter) && letter != ""){
      if (this.checkLetter(letter)) {
        this.storeGuessedLetter(this.corGuess, letter)
        this.revealLetter(letter)
        if (this.checkCompletion()){
          this.incrementScore()
          setTimeout(function(){
            this.setVictoryTrue ()
          }.bind(this), 100);
          this.toggleClass($("#next"),"button-enable","button-disable")
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

  //SCORING & LOSING

  decrementTries(){
    this.tries -= 1
    this.addHangman(this.tries + 1)
    if (0 === this.tries){
      this.score = 0
      setTimeout(function(){
        this.toggleClass($("#fade-screen"), "hide2","show2")
      }.bind(this), 500)
    }
  }

  incrementScore(){
    this.score += 1
    this.setHighScore()
    $("#score").text(this.score)
    setTimeout(function(){
      $("#score").addClass("increment-score")
    }, 50)
    setTimeout(function(){
      $("#score").removeClass("increment-score")
    }, 300)
  }

  setHighScore(){
    let self = this
    if (this.highScore < this.score){
      this.highScore = this.score
      $('#high-score').text(self.highScore)
    }
  }

  //CSS Class

  toggleClass(element, class1, class2){
    if (element.hasClass(class2)){
      element.addClass(class1)
      element.removeClass(class2)
    } else {
      element.removeClass(class1)
      element.addClass(class2)
    }
  }

  //DEFAULT SETTING

  reset(){
    this.tries = 7
    this.hideHangman()
    this.currentWord = ""
    this.corGuess = []
    this.incorGuess = []
  }
}
