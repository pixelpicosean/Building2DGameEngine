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

    // Attributes
    this.VertexPositionAttribute = null;
    this.PixelColor = null;


    // 1. Compile vertex and fragment shaders
    const vs = compile(gl, vertSource, gl.VERTEX_SHADER);
    const fs = compile(gl, fragSource, gl.FRAGMENT_SHADER);

    // 2. Create and link them into a program
    this.Program = gl.createProgram();
    gl.attachShader(this.Program, vs);
    gl.attachShader(this.Program, fs);
    gl.linkProgram(this.Program);

    // 3. Check
    if (!gl.getProgramParameter(this.Program, gl.LINK_STATUS)) {
      console.error(`Error linking shader`);
    }

    // 4. Get a reference to the attributes
    this.VertexPositionAttribute = gl.getAttribLocation(this.Program, 'aVertexPosition');
    this.PixelColor = gl.getUniformLocation(this.Program, 'uPixelColor');

    // 5. Activates the vertex buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, VertexBuffer.GLVertexRef);

    // 6. Describe the characteristic of the vertex position attribute
    gl.vertexAttribPointer(
      this.VertexPositionAttribute,
      3,          // each vertex element is a 3-float (x, y, z)
      gl.FLOAT,   // data type is float
      false,      // if the content is normalized vectors
      0,          // number of bytes to skip in between elements
      0           // offsets to the first element
    );
  }

  Activate(pixelColor) {
    const gl = this.gl;

    gl.useProgram(this.Program);
    gl.enableVertexAttribArray(this.VertexPositionAttribute);
    gl.uniform4fv(this.PixelColor, pixelColor);

    return this;
  }
};

module.exports = Shader;
