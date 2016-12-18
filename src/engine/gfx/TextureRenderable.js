const Renderable = require('./Renderable');

class TextureRenderable extends Renderable {
  constructor(shader, texture) {
    super(shader);

    // Alpha 0: switch off tinting
    this.color[3] = 0.0;

    this.texture = texture;
  }
  draw(gl, vpMatrix) {
    this.texture.activate();

    super.draw(gl, vpMatrix);
  }
}

module.exports = TextureRenderable;
