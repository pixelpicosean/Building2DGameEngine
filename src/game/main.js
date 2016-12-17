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

    mat4.translate(t, t, vec3.fromValues(-0.25, 0.25, 0.0));
    mat4.rotateZ(t, t, 0.2);
    mat4.scale(t, t, vec3.fromValues(1.2, 1.2, 1.0));
    whiteBox.draw(gl, t);

    mat4.identity(t);
    mat4.translate(t, t, vec3.fromValues(0.25, -0.25, 0.0));
    mat4.rotateZ(t, t, -0.785);
    mat4.scale(t, t, vec3.fromValues(0.4, 0.4, 1.0));
    redBox.draw(gl, t);
  }
}

core.main('#game', WebGL2DGame, 640, 480);
