const gfx = require('engine/gfx');

const querySelector = (selector) =>
  selector.charAt(0) === '#' ?
    document.getElementById(selector.substr(1)) :
    document.getElementsByTagName(selector);

let loopId = 0;

let nextGame;
let nextGameIdx = 0;

const core = {
  games: {},
  game: null,

  width: 0,
  height: 0,

  speed: 1,

  main: function(canvasID, gameClass, width, height) {
    document.addEventListener('DOMContentLoaded', () => {
      // Initialize Gfx
      const canvas = querySelector(canvasID);
      canvas.width = this.width = width;
      canvas.height = this.height = height;

      gfx.initialize(canvas);

      // Start the loop
      loopId = requestAnimationFrame(loop);

      // Start the game
      this.setGame(gameClass, true, {});
    });
  },
  setGame: function(gameClass, newInstance = false, param = {}) {
    if (!gameClass.id) {
      gameClass.id = nextGameIdx++;
    }

    let pair = core.games[gameClass.id];

    if (!pair) {
      pair = { ctor: gameClass, inst: null, param: param };
    }
    pair.param = param;

    if (newInstance) {
      pair.inst = null;
    }

    nextGame = pair;
  },
};

const loop = (timestamp) => {
  loopId = requestAnimationFrame(loop);

  // Do not update anything when paused
  if (!core.paused) {
    // Switch to new game
    if (nextGame) {
      let pair = nextGame;
      nextGame = null;

      // Freeze current game before switching
      if (core.game) {
        core.game.freeze();
      }
      core.game = null;

      // Create instance of game if not exist
      if (!pair.inst) {
        pair.inst = new pair.ctor();
      }

      // Awake the game
      core.game = pair.inst;
      core.game.awake(pair.param);
    }

    // Update current game
    if (core.game) {
      core.game.run(timestamp);
    }
  }
};

module.exports = core;
