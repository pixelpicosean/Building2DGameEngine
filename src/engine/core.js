const Gfx = require('engine/Gfx');

const querySelector = (selector) =>
  selector.charAt(0) === '#' ?
    document.getElementById(selector.substr(1)) :
    document.getElementsByTagName(selector);

const core = {
  Game: null,

  Width: 0,
  Height: 0,

  main: function(canvasID, GameClass, width, height) {
    document.addEventListener('DOMContentLoaded', () => {
      // Initialize Gfx
      const canvas = querySelector(canvasID);
      canvas.width = this.Width = width;
      canvas.height = this.Height = height;

      Gfx.InitializeWebGL(canvas);

      // Start the game
      this.Game = new GameClass();
    });
  },
};

module.exports = core;
