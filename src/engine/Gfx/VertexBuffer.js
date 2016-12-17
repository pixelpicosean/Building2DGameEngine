const VertexBuffer = {
  Initialize: function(gl) {
    //
    // Properties
    //
    this.GLVertexRef = null;


    const vertices = [
      +0.5, +0.5, 0.0,
      -0.5, +0.5, 0.0,
      +0.5, -0.5, 0.0,
      -0.5, -0.5, 0.0,
    ];

    // Step A: Create a buffer for our vertex positions
    this.GLVertexRef = gl.createBuffer();

    // Step B: Activate vertexBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.GLVertexRef);

    // Step C: Load vertices into the vertexBuffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  },
};

module.exports = VertexBuffer;
