uniform mat4 uModelTransform;
uniform mat4 uViewTransform;
attribute vec3 aVertexPosition;

void main(void) {
  gl_Position = uViewTransform * uModelTransform * vec4(aVertexPosition, 1.0);
}
