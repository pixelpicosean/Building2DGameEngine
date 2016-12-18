const Transform = require('./Transform');

class Renderable extends Transform {
  constructor(shader) {
    super();

    this.shader = shader;
    this.color = [1.0, 1.0, 1.0, 1.0];
  }
  draw(gl, vpTransform) {
    this.shader.activate(this.color, vpTransform);
    this.shader.setTransform(this.matrix);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

module.exports = Renderable;
