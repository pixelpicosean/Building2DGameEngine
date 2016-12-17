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

    this.program = null;

    // Attributes
    this.aVertexPosition = null;
    this.uPixelColor = null;


    // 1. Compile vertex and fragment shaders
    const vs = compile(gl, vertSource, gl.VERTEX_SHADER);
    const fs = compile(gl, fragSource, gl.FRAGMENT_SHADER);

    // 2. Create and link them into a program
    this.program = gl.createProgram();
    gl.attachShader(this.program, vs);
    gl.attachShader(this.program, fs);
    gl.linkProgram(this.program);

    // 3. Check
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(`Error linking shader`);
    }

    // 4. Get a reference to the attributes
    this.aVertexPosition = gl.getAttribLocation(this.program, 'aVertexPosition');
    this.uPixelColor = gl.getUniformLocation(this.program, 'uPixelColor');

    // 5. Activates the vertex buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, VertexBuffer.buffer);

    // 6. Describe the characteristic of the vertex position attribute
    gl.vertexAttribPointer(
      this.aVertexPosition,
      3,          // each vertex element is a 3-float (x, y, z)
      gl.FLOAT,   // data type is float
      false,      // if the content is normalized vectors
      0,          // number of bytes to skip in between elements
      0           // offsets to the first element
    );
  }

  activate(pixelColor) {
    const gl = this.gl;

    gl.useProgram(this.program);
    gl.enableVertexAttribArray(this.aVertexPosition);
    gl.uniform4fv(this.uPixelColor, pixelColor);

    return this;
  }
};

module.exports = Shader;
