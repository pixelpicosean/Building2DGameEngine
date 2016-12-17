const core = require('engine/core');

const Gfx = require('engine/Gfx');
const Shader = require('engine/Gfx/Shader');

const SimpleVS = require('./shaders/Simple.vert');
const SimpleFS = require('./shaders/Simple.frag');

class WebGL2DGame {
  constructor() {
    // Initialize
    const gl = Gfx.gl;
    const shader = new Shader(gl, SimpleVS, SimpleFS);

    // Draw something
    Gfx.Clear([0.2, 0.6, 0.4, 1.0]);

    shader.Activate([0.6, 0.3, 0.4, 1.0]);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  }
}

core.main('#game', WebGL2DGame, 640, 480);
