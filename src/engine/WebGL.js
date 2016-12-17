const WebGL = {
  gl: null,

  initializeGL: function() {
    const canvas = document.getElementById('game');

    const gl = this.gl = canvas.getContext('webgl');

    if (gl) {
      gl.clearColor(0.0, 0.8, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    else {
      console.error(`WebGL is not supported!`);
    }

    return gl;
  },

  clearCanvas: function() {
    const gl = this.gl;

    gl.clear(gl.COLOR_BUFFER_BIT);
  },

  draw: function() {},
};

module.exports = WebGL;
