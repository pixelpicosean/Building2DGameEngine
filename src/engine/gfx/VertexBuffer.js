const VertexBuffer = {
  initialize: function(gl) {
    //
    // Properties
    //
    this.buffer = null;


    const vertices = [
      +0.5, +0.5, 0.0,
      -0.5, +0.5, 0.0,
      +0.5, -0.5, 0.0,
      -0.5, -0.5, 0.0,
    ];

    // Step A: Create a buffer for our vertex positions
    this.buffer = gl.createBuffer();

    // Step B: Activate vertexBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

    // Step C: Load vertices into the vertexBuffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  },
};

module.exports = VertexBuffer;
