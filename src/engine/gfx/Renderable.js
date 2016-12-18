const Transform = require('./Transform');

class Renderable extends Transform {
  constructor(shader) {
    super();

    this.shader = shader;
    this.color = [1.0, 1.0, 1.0, 1.0];
  }
  draw(gl, viewTransform) {
    this.shader.activate(this.color, viewTransform);
    this.shader.setTransform(this.matrix);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

module.exports = Renderable;
