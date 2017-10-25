class InteractDOM {
  constructor(){

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

  hideHangman(){
    for (let i = 1; i <= 7; i++){
      $(`#hang-${i}`).removeClass('show')
      $(`#hang-${i}`).addClass('hide')
    }
  }

  setCurrentWord (currentWord) {
    $('.correct-guess').remove()
    for (let i = 0; i < currentWord.length; i++){
      $('.correct-guess-holder').append($(`<div class="correct-guess">
        <p class="correct-guess-letter">${currentWord[i]}</p>
      </div>`))
    }
  }

  setIncorrectGuess (arr) {
    $('.incorrect-guess').remove()
    for (let i = 0; i < arr.length; i++){
      $('.incorrect-guess-holder').append($(`
        <p class="incorrect-guess">${arr[i]}</p>`
      ))
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
}
