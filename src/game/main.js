const WebGL = require('engine/WebGL');
const VertexBuffer = require('engine/VertexBuffer');
const ShaderSupport = require('engine/ShaderSupport');

const SimpleVS = require('./VertexShader.vert');
const SimpleFS = require('./FragmentShader.frag');

document.addEventListener('DOMContentLoaded', () => {

  const gl = WebGL.initializeGL();

  VertexBuffer.initSquareBuffer();
  ShaderSupport.initSimpleShader(SimpleVS, SimpleFS);

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(ShaderSupport.simpleShader);

  gl.enableVertexAttribArray(ShaderSupport.shaderVertexPositionAttribute);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

}, false);
