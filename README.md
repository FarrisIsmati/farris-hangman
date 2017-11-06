# farris-hangman

Hangman game created using ES6, HTML5, CSS3, Bootstrap, jQuery, jQuery SVG

To install clone this repo and open the index.html file in a browser

This game was a learning process mainly in what not to do when it comes to classes and model/view approach with just jQuery.
After finishing the app I figured out how I would like to structure my classes where before I put most logic in two classes
leaving it hard to scale/make changes.

If I were to remake the app I would separate my classes into four. Three of the classes would be instantiated by the Game
class in its constructor. Then all the DOM logic would be separated and watch for changes in the state of the Game class.

Example of how I might approach the project if I did it again
```es6
class Game {
  constructor(){
    this.score = new Score()
    this.tries = new Tries()
    this.letter = new Letter()
    this.word = this.getNewWord()
    this.words = this.retrieveNewWords()
    this.usedWords = []
    this.victory = false
  }

  retrieveNewWords(){
  }

  getNewWord(){
  }

  storeUsedWords(){
  }

  victoryCondition(){
  }
}
```

```es6
class Score(){
  constructor(){
    this.currentScore = 0
    this.highScore = 0
  }

  incrementScore(){
  }

  decrementScore(){
  }

  getScore(){
  }

  checkHighScore(){
  }
}
```

```es6
class Tries{
  constructor(){
    this.currentTries = 7
  }

  decrementTries(){
  }

  resetTries(){
  }

  getTries(){
  }
}
```

```es6
class Letter{
  constructor(){
    this.currentLetter = getCurrentLetter()
    this.correctLetters = []
    this.incorrectLetters = []
  }

  validateLetter(){
  }

  submitLetter(){
  }

  checkIfEntered(){
  }

  checkCompletion(){
  }
}
```
<!-- ^^^ The above organization is exactly how you want to be thinking about this. Especially
the part about separating out your DOM logic into its own separate class that then watches for
changes in  -->

Note: I developed this on an old 2009 MacBook Pro with a very low resolution. All css adjustments probably wont look good on any modern desktop/laptop with a higher resolution. So if I remade the application I would put a lot more consideration on dynamic css attributes
