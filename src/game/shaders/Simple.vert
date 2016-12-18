uniform mat4 uModelTransform;
uniform mat4 uViewProjTransform;
attribute vec3 aVertexPosition;

void main(void) {
  gl_Position = uViewProjTransform * uModelTransform * vec4(aVertexPosition, 1.0);
}
