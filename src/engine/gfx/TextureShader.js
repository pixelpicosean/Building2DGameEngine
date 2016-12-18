const Shader = require('./Shader');
const VertexBuffer = require('./VertexBuffer');

class TextureShader extends Shader {
  constructor(gl, vs, fs) {
    super(gl, vs, fs);

    this.aTexCoord = gl.getAttribLocation(this.program, 'aTexCoord');
  }
  activate(pixelColor, vpMatrix) {
    super.activate(pixelColor, vpMatrix);

    const gl = this.gl;

    gl.bindBuffer(gl.ARRAY_BUFFER, VertexBuffer.texCoordBuffer);
    gl.enableVertexAttribArray(this.aTexCoord);
    gl.vertexAttribPointer(this.aTexCoord, 2, gl.FLOAT, false, 0, 0);
  }
}

module.exports = TextureShader;
