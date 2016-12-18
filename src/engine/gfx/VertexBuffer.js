const VertexBuffer = {
  initialize: function(gl) {
    //
    // Properties
    //
    this.meshBuffer = null;
    this.texCoordBuffer = null;


    const vertices = [
      +0.5, +0.5, 0.0,
      -0.5, +0.5, 0.0,
      +0.5, -0.5, 0.0,
      -0.5, -0.5, 0.0,
    ];

    const texCoords = [
      1.0, 1.0,
      0.0, 1.0,
      1.0, 0.0,
      0.0, 0.0,
    ];

    // Step A: Create a buffer for our vertex positions
    this.meshBuffer = gl.createBuffer();

    // - Activate vertexBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.meshBuffer);

    // - Load vertices into the vertexBuffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Step B: Create a buffer for texture coordinates
    this.texCoordBuffer = gl.createBuffer();

    // Activate texCoordBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);

    // Load texture coordinates
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);
  },
};

module.exports = VertexBuffer;
