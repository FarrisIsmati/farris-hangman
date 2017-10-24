var words = require('../Model/words')
var Game = require('../Model/gameLogic');
var Game1 = new Game()

describe('Retrieve Word', function() {
  it('is a class that is defined', function () {
    expect(Game).toBeDefined()
  })
});
