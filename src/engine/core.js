const gfx = require('engine/gfx');

const querySelector = (selector) =>
  selector.charAt(0) === '#' ?
    document.getElementById(selector.substr(1)) :
    document.getElementsByTagName(selector);

const core = {
  game: null,

  width: 0,
  height: 0,

  main: function(canvasID, GameClass, width, height) {
    document.addEventListener('DOMContentLoaded', () => {
      // Initialize Gfx
      const canvas = querySelector(canvasID);
      canvas.width = this.width = width;
      canvas.height = this.height = height;

      gfx.initialize(canvas);

      // Start the game
      this.game = new GameClass();
    });
  },
};

module.exports = core;
