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
    const blueBox = new Renderable(shader);
    blueBox.color = [0.25, 0.25, 0.95, 1.0];

    const redBox = new Renderable(shader);
    redBox.color = [1.0, 0.25, 0.25, 1.0];

    const tlBox = new Renderable(shader);
    tlBox.color = [0.9, 0.1, 0.1, 1.0];
    const trBox = new Renderable(shader);
    trBox.color = [0.1, 0.9, 0.1, 1.0];
    const brBox = new Renderable(shader);
    brBox.color = [0.1, 0.1, 0.9, 1.0];
    const blBox = new Renderable(shader);
    blBox.color = [0.1, 0.1, 0.1, 1.0];

    // Draw
    gfx.clear([0.9, 0.9, 0.9, 1.0]);

    gl.viewport(
      20,     // x position of bottom-left corner
      40,     // y position of bottom-left corner
      600,    // width of the area
      300     // height of the area
    );
    gl.scissor(
      20,
      40,
      600,
      300
    );

    gl.enable(gl.SCISSOR_TEST);
      gfx.clear([0.8, 0.8, 0.8, 1.0]);
    gl.disable(gl.SCISSOR_TEST);

    const viewMatrix = mat4.create();
    mat4.lookAt(viewMatrix,
      [20, 60, 10],     // camera position
      [20, 60, 0],      // look at position
      [0, 1, 0]         // orientation
    );

    const projMatrix = mat4.create();
    mat4.ortho(projMatrix,
      -10,    // left
      10,     // right
      -5,     // bottom
      5,      // top
      0,      // near
      1000    // far
    );

    const vpMatrix = mat4.create();
    mat4.multiply(vpMatrix, projMatrix, viewMatrix);

    // - center blue
    blueBox.x = 20;
    blueBox.y = 60;
    blueBox.rotation = 0.2;
    blueBox.scaleX = 5;
    blueBox.scaleY = 5;
    blueBox.draw(gl, vpMatrix);

    // - center red
    redBox.x = 20;
    redBox.y = 60;
    redBox.scaleX = 2;
    redBox.scaleY = 2;
    redBox.draw(gl, vpMatrix);

    // - top left
    tlBox.x = 10;
    tlBox.y = 65;
    tlBox.draw(gl, vpMatrix);

    // - top right
    trBox.x = 30;
    trBox.y = 65;
    trBox.draw(gl, vpMatrix);

    // - bottom right
    brBox.x = 30;
    brBox.y = 55;
    brBox.draw(gl, vpMatrix);

    // - bottom left
    blBox.x = 10;
    blBox.y = 55;
    blBox.draw(gl, vpMatrix);
  }
}

core.main('#game', WebGL2DGame, 640, 480);
