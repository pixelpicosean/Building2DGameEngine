uniform mat4 uModelTransform;
uniform mat4 uViewProjTransform;

attribute vec3 aVertexPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main(void) {
  gl_Position = uViewProjTransform * uModelTransform * vec4(aVertexPosition, 1.0);

  vTexCoord = aTexCoord;
}
