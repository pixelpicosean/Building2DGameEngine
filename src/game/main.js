const core = require('engine/core');
const loader = require('engine/loader');
const Game = require('engine/Game');

const WebGL2DGame = require('./WebGL2DGame');

class Loading extends Game {
  constructor() {
    super();
  }

  awake() {
    let redraw = () => {
      console.log(`${loader.progress | 0}%`);
    };

    let h = loader.onProgress.add(redraw);
    const ready = () => {
      h.detach();
      core.setGame(WebGL2DGame, true);
    };

    loader.onComplete.once(ready);
    loader.load();
  }
}

core.main('#game', Loading, 640, 480);
