class Texture {
  constructor(gl, image) {
    this.gl = gl;

    // Create a WebGL texture object
    this.textureID = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, this.textureID);

    /* type, LOD, internal format, data color format, data format, data */
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    gl.bindTexture(gl.TEXTURE_2D, null);
  }
  activate() {
    const gl = this.gl;

    gl.bindTexture(gl.TEXTURE_2D, this.textureID);

    // Prevent texture wrappings
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // Scale filter (nearest for pixel art)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

    return this;
  }
  deactivate() {
    const gl = this.gl;

    gl.bindTexture(gl.TEXTURE_2D, null);
  }
}

module.exports = Texture;
