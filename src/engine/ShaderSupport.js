const WebGL = require('engine/WebGL');

const VertexBuffer = require('./VertexBuffer');

const ShaderSupport = {
  simpleShader: null,
  shaderVertexPositionAttribute: null,

  initSimpleShader: function(vertSource, fragSource) {
    const gl = WebGL.gl;

    // Compile vertex and fragment shaders
    const vs = this.compile(vertSource, gl.VERTEX_SHADER);
    const fs = this.compile(fragSource, gl.FRAGMENT_SHADER);

    // Create and link them into a program
    this.simpleShader = gl.createProgram();
    gl.attachShader(this.simpleShader, vs);
    gl.attachShader(this.simpleShader, fs);
    gl.linkProgram(this.simpleShader);

    // Check
    if (!gl.getProgramParameter(this.simpleShader, gl.LINK_STATUS)) {
      console.error(`Error linking shader`);
    }

    // Get a reference to the `aSquareVertexPosition` attribute
    this.shaderVertexPositionAttribute = gl.getAttribLocation(this.simpleShader, 'aSquareVertexPosition');

    // Activates the vertex buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, VertexBuffer.squareVertexBuffer);

    // Describe the characteristic of the vertex position attribute
    gl.vertexAttribPointer(
      this.shaderVertexPositionAttribute,
      3,          // each vertex element is a 3-float (x, y, z)
      gl.FLOAT,   // data type is float
      false,      // if the content is normalized vectors
      0,          // number of bytes to skip in between elements
      0           // offsets to the first element
    );
  },

  compile: function(shader, type) {
    const gl = WebGL.gl;

    const compiled = gl.createShader(type);
    gl.shaderSource(compiled, shader);
    gl.compileShader(compiled);

    if (!gl.getShaderParameter(compiled, gl.COMPILE_STATUS)) {
      console.error(`A shader compiling error occurred: ${gl.getShaderInfoLog(compiled)}`);
    }

    return compiled;
  },
};

module.exports = ShaderSupport;
