class Tries{
  constructor(){
    this.currentTries = 7
  }

  decrementTries(){
    this.currentTries -= 1
  }

  resetTries(){
    this.currentTries = 7
  }

  getTries(){
    return this.currentTries
  }
}
