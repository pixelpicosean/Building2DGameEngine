const mat4 = require('engine/gfx/gl-matrix/mat4');

class Transform {
  get x() {
    return this.matrix[12];
  }
  set x(v) {
    return this.matrix[12] = v;
  }
  get y() {
    return this.matrix[13];
  }
  set y(v) {
    return this.matrix[13] = v;
  }
  get rotation() {
    return this._rotation;
  }
  set rotation(v) {
    this._rotation = v;
    this._cos = Math.cos(v);
    this._sin = Math.sin(v);

    this.matrix[0] = this._cos * this._scaleX;
    this.matrix[1] = this._sin;
    this.matrix[4] = -this._sin;
    this.matrix[5] = this._cos * this._scaleY;
  }
  get scaleX() {
    return this._scaleX;
  }
  set scaleX(v) {
    this._scaleX = v;
    this.matrix[0] = this._cos * this._scaleX;
  }
  get scaleY() {
    return this._scaleY;
  }
  set scaleY(v) {
    this._scaleY = v;
    this.matrix[5] = this._cos * this._scaleY;
  }

  constructor() {
    this.matrix = mat4.create();

    this._rotation = 0.0;
    this._scaleX = 1.0;
    this._scaleY = 1.0;

    this._cos = 1.0;
    this._sin = 0.0;
  }
}

module.exports = Transform;
