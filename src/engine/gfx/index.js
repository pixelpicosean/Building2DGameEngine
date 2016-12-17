const VertexBuffer = require('./VertexBuffer');

module.exports = {
  initialize: function(canvas) {
    //
    // Properties
    //
    this.gl = canvas.getContext('webgl');


    if (!this.gl) {
      console.error('WebGL is not supported!');
      return;
    }

    VertexBuffer.initialize(this.gl);

    return this;
  },

  clear: function(color) {
    const gl = this.gl;

    gl.clearColor(color[0], color[1], color[2], color[3]);
    gl.clear(gl.COLOR_BUFFER_BIT);

    return this;
  },
};
