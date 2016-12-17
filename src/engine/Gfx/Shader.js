const VertexBuffer = require('./VertexBuffer');

function compile(gl, shader, type) {
  const compiled = gl.createShader(type);
  gl.shaderSource(compiled, shader);
  gl.compileShader(compiled);

  if (!gl.getShaderParameter(compiled, gl.COMPILE_STATUS)) {
    console.error(`A shader compiling error occurred: ${gl.getShaderInfoLog(compiled)}`);
  }

  return compiled;
}

class Shader {
  constructor(gl, vertSource, fragSource) {
    //
    // Properties
    //
    this.gl = gl;

    this.Program = null;
    this.VertexPositionAttribute = null;


    // Compile vertex and fragment shaders
    const vs = compile(gl, vertSource, gl.VERTEX_SHADER);
    const fs = compile(gl, fragSource, gl.FRAGMENT_SHADER);

    // Create and link them into a program
    this.Program = gl.createProgram();
    gl.attachShader(this.Program, vs);
    gl.attachShader(this.Program, fs);
    gl.linkProgram(this.Program);

    // Check
    if (!gl.getProgramParameter(this.Program, gl.LINK_STATUS)) {
      console.error(`Error linking shader`);
    }

    // Get a reference to the `aSquareVertexPosition` attribute
    this.VertexPositionAttribute = gl.getAttribLocation(this.Program, 'aSquareVertexPosition');

    // Activates the vertex buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, VertexBuffer.GLVertexRef);

    // Describe the characteristic of the vertex position attribute
    gl.vertexAttribPointer(
      this.VertexPositionAttribute,
      3,          // each vertex element is a 3-float (x, y, z)
      gl.FLOAT,   // data type is float
      false,      // if the content is normalized vectors
      0,          // number of bytes to skip in between elements
      0           // offsets to the first element
    );
  }

  Activate() {
    const gl = this.gl;

    gl.useProgram(this.Program);
    gl.enableVertexAttribArray(this.VertexPositionAttribute);

    return this;
  }
};

module.exports = Shader;
