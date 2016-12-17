uniform mat4 uModelTransform;
attribute vec3 aVertexPosition;

void main(void) {
  gl_Position = uModelTransform * vec4(aVertexPosition, 1.0);
}
