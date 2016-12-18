const core = require('engine/core');
const loader = require('engine/loader');
const audio = require('engine/audio');
const Game = require('engine/Game');

const SystemInput = require('engine/input');

const gfx = require('engine/gfx');
const TextureShader = require('engine/gfx/TextureShader');
const TextureRenderable = require('engine/gfx/TextureRenderable');
const Camera = require('engine/gfx/Camera');

const SimpleVS = require('./shaders/Simple.vert');
const SimpleFS = require('./shaders/Simple.frag');

const mat4 = require('engine/gfx/gl-matrix/mat4');
const vec2 = require('engine/gfx/gl-matrix/vec2');

loader.add('test.json');
loader.add('9.png');
loader.add('AM2R-04.mp3');

class WebGL2DGame extends Game {
  constructor() {
    super();

    this.addSystem(new SystemInput);

    this.sysInput
      .bind('LEFT', 'left')
      .bind('RIGHT', 'right')

    // Initialize
    const gl = gfx.gl;
    const shader = new TextureShader(gl, SimpleVS, SimpleFS);

    // Create a camera
    this.camera = new Camera(
      gl,
      vec2.fromValues(20, 60),  // Center
      20,                       // Width of the world
      [20, 40, 600, 300]        // Viewport
    );

    // Create objects
    this.blueBox = new TextureRenderable(shader, loader.resources['9.png'].texture);
    this.blueBox.x = 20;
    this.blueBox.y = 60;
    this.blueBox.rotation = 0.2;
    this.blueBox.scaleX = 5;
    this.blueBox.scaleY = 5;

    console.log(this.blueBox.texture);
  }
  awake() {
    super.awake();

    console.log(loader.resources['test.json'].data);

    audio.sounds['AM2R-04.mp3'].volume(0.5).play();
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
  }
}

module.exports = WebGL2DGame;
