const VertexBuffer = require('./VertexBuffer');

const loader = require('engine/loader');
const textureParser = require('./loaders/textureParser');

module.exports = {
  initialize: function(canvas) {
    //
    // Properties
    //
    const gl = this.gl = canvas.getContext('webgl');


    if (!gl) {
      console.error('WebGL is not supported!');
      return;
    }

    // Allows transparency with textures
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);

    VertexBuffer.initialize(gl);

    // Use loader middlewares
    loader.use(textureParser(gl));

    return this;
  },

  clear: function(color) {
    const gl = this.gl;

    gl.clearColor(color[0], color[1], color[2], color[3]);
    gl.clear(gl.COLOR_BUFFER_BIT);

    return this;
  },
};
