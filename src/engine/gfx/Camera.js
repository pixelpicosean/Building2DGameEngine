const mat4 = require('engine/gfx/gl-matrix/mat4');
const vec2 = require('engine/gfx/gl-matrix/vec2');
const vec4 = require('engine/gfx/gl-matrix/vec4');

class Camera {
  /**
   * @constructor
   * @param  {WebGL} gl        WebGL context
   * @param  {vec2} center     Center position
   * @param  {Number} width    Width of this camera
   * @param  {vec4} viewport   Viewport array: [x, y, w, h]
   */
  constructor(gl, center, width, viewport) {
    this.gl = gl;

    this.center = vec2.clone(center);

    this.width = width;

    this.viewport = vec4.clone(viewport);

    this.near = 0;
    this.far = 1000;

    // Transformation matrix
    this.viewMatrix = mat4.create();
    this.projMatrix = mat4.create();
    this.vpMatrix = mat4.create();

    this.backgroundColor = [0.8, 0.8, 0.8, 1.0];
  }

  setCenter(x, y) {
    this.center[0] = x;
    this.center[1] = y;
  }
  setViewport(viewport) {
    vec4.copy(this.viewport, viewport);
  }

  setupViewProjection() {
    const gl = this.gl;

    // Configure the viewport
    gl.viewport(
      this.viewport[0],
      this.viewport[1],
      this.viewport[2],
      this.viewport[3]
    );

    gl.scissor(
      this.viewport[0],
      this.viewport[1],
      this.viewport[2],
      this.viewport[3]
    );

    gl.clearColor(
      this.backgroundColor[0],
      this.backgroundColor[1],
      this.backgroundColor[2],
      this.backgroundColor[3]
    );

    gl.enable(gl.SCISSOR_TEST);
      gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.SCISSOR_TEST);

    // Setup view projection transform
    mat4.lookAt(this.viewMatrix,
      [this.center[0], this.center[1], 10],
      [this.center[0], this.center[1], 0],
      [0, 1, 0]
    );

    const halfWidth = this.width / 2;
    const halfHeight = halfWidth * this.viewport[3] / this.viewport[2];

    mat4.ortho(this.projMatrix,
      -halfWidth,
      +halfWidth,
      -halfHeight,
      +halfHeight,
      this.near,
      this.far
    );

    mat4.mul(this.vpMatrix, this.projMatrix, this.viewMatrix);
  }
}

module.exports = Camera;
