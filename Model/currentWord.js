class CurrentWord extends gameLogic {
  constructor(){
    this.word = this.retrieveWord()
    this.wordLength = this.word.length
    this.guessedLetters = []
  }

  storeLetter(){
    //If letter hasn't already been guessed
      //checkLetter()
    //Else
      //return false
  }

  checkLetter(){
    //If the current entered letter is in the current word
      //If completed word
        //incrementScore
      //storeLetter()
    //Else
      //storeGuessedLetter()
  }

  storeGuessedLetter(){
    //If length > 1
      //push to guessedLetters
      //Sort guessedLetters
    //Else
      //push to gussedLetters
  }
}
