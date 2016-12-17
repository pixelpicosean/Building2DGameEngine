class Renderable {
  constructor(shader) {
    this.shader = shader;
    this.color = [1, 1, 1, 1];
  }
  draw(gl, transform) {
    this.shader.activate(this.color);
    this.shader.setTransform(transform);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

module.exports = Renderable;
