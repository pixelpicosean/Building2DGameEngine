precision mediump float;

uniform sampler2D uSampler;
uniform vec4 uPixelColor;

varying vec2 vTexCoord;

void main(void) {
  vec4 pixel = texture2D(uSampler, vTexCoord);

  // Tint the textured area. Leave transparent area as defined by the texture
  vec3 tintPixel = vec3(pixel) * (1.0 - uPixelColor.a) + vec3(uPixelColor) * uPixelColor.a;

  gl_FragColor = vec4(tintPixel, pixel.a);
}
