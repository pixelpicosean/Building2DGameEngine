const core = require('engine/core');

const gfx = require('engine/gfx');
const Shader = require('engine/gfx/Shader');

const Renderable = require('engine/gfx/Renderable');

const SimpleVS = require('./shaders/Simple.vert');
const SimpleFS = require('./shaders/Simple.frag');

const mat4 = require('engine/gfx/gl-matrix/mat4');
const vec3 = require('engine/gfx/gl-matrix/vec3');

class WebGL2DGame {
  constructor() {
    // Initialize
    const gl = gfx.gl;
    const shader = new Shader(gl, SimpleVS, SimpleFS);

    // Create a transform for drawing
    const t = mat4.create();

    // Create objects
    const whiteBox = new Renderable(shader);
    whiteBox.color = [1, 1, 1, 1];

    const redBox = new Renderable(shader);
    redBox.color = [1, 0, 0, 1];

    // Draw something
    gfx.clear([0.2, 0.6, 0.4, 1.0]);

    whiteBox.x = -0.25;
    whiteBox.y = +0.25;
    whiteBox.rotation = 0.2;
    whiteBox.scaleX = 1.2;
    whiteBox.scaleY = 1.2;
    whiteBox.draw(gl, t);

    redBox.x = +0.25;
    redBox.y = -0.25;
    redBox.rotation = -0.785;
    redBox.scaleX = 0.4;
    redBox.scaleY = 0.4;
    redBox.draw(gl, t);
  }
}

core.main('#game', WebGL2DGame, 640, 480);
