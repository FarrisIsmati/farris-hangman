class Score {
  constructor(){
    this.currentScore = 0
    this.highScore = 0
  }

  incrementScore(){
    this.currentScore += 1
    this._setHighScore()
  }

  resetScore(){
    this.currentScore = 0
  }

  _setHighScore(){
    if (this.highScore < this.currentScore){
      this.highScore = this.currentScore
    }
  }

  getScore(){
    return this.currentScore
  }

  getHighScore(){
    return this.highScore
  }
}
