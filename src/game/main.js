const core = require('engine/core');
const Game = require('engine/Game');

const SystemInput = require('engine/input');

const gfx = require('engine/gfx');
const Shader = require('engine/gfx/Shader');
const Renderable = require('engine/gfx/Renderable');
const Camera = require('engine/gfx/Camera');

const SimpleVS = require('./shaders/Simple.vert');
const SimpleFS = require('./shaders/Simple.frag');

const mat4 = require('engine/gfx/gl-matrix/mat4');
const vec2 = require('engine/gfx/gl-matrix/vec2');

class WebGL2DGame extends Game {
  constructor() {
    super();

    this.addSystem(new SystemInput);

    this.sysInput
      .bind('LEFT', 'left')
      .bind('RIGHT', 'right')

    // Initialize
    const gl = gfx.gl;
    const shader = new Shader(gl, SimpleVS, SimpleFS);

    // Create a camera
    this.camera = new Camera(
      gl,
      vec2.fromValues(20, 60),  // Center
      20,                       // Width of the world
      [20, 40, 600, 300]        // Viewport
    );

    // Create objects
    this.blueBox = new Renderable(shader);
    this.blueBox.color = [0.25, 0.25, 0.95, 1.0];
    this.blueBox.x = 20;
    this.blueBox.y = 60;
    this.blueBox.rotation = 0.2;
    this.blueBox.scaleX = 5;
    this.blueBox.scaleY = 5;

    this.redBox = new Renderable(shader);
    this.redBox.color = [1.0, 0.25, 0.25, 1.0];
    this.redBox.x = 20;
    this.redBox.y = 60;
    this.redBox.scaleX = 2;
    this.redBox.scaleY = 2;

    this.tlBox = new Renderable(shader);
    this.tlBox.color = [0.9, 0.1, 0.1, 1.0];
    this.tlBox.x = 10;
    this.tlBox.y = 65;
    this.trBox = new Renderable(shader);
    this.trBox.color = [0.1, 0.9, 0.1, 1.0];
    this.trBox.x = 30;
    this.trBox.y = 65;
    this.brBox = new Renderable(shader);
    this.brBox.color = [0.1, 0.1, 0.9, 1.0];
    this.brBox.x = 30;
    this.brBox.y = 55;
    this.blBox = new Renderable(shader);
    this.blBox.color = [0.1, 0.1, 0.1, 1.0];
    this.blBox.x = 10;
    this.blBox.y = 55;
  }
  update(dt, sec) {
    super.update(dt, sec);

    this.blueBox.rotation += sec;

    if (this.sysInput.state('left')) {
      this.blueBox.x -= sec * 10;
    }
    else if (this.sysInput.state('right')) {
      this.blueBox.x += sec * 10;
    }
  }
  draw(dt, sec) {
    super.draw(dt, sec);

    const gl = gfx.gl;

    gfx.clear([0.9, 0.9, 0.9, 1.0]);

    this.camera.setupViewProjection();
    const vpMatrix = this.camera.vpMatrix;

    this.blueBox.draw(gl, vpMatrix);
    this.redBox.draw(gl, vpMatrix);

    this.tlBox.draw(gl, vpMatrix);
    this.trBox.draw(gl, vpMatrix);
    this.brBox.draw(gl, vpMatrix);
    this.blBox.draw(gl, vpMatrix);
  }
}

core.main('#game', WebGL2DGame, 640, 480);
