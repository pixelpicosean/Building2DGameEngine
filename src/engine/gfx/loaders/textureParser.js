const Texture = require('../Texture');
const loader = require('engine/loader');
const Resource = loader.Resource;

module.exports = function(gl) {
  return function(resource, next) {
    // create a new texture if the data is an Image object
    if (resource.data && (resource.type === Resource.TYPE.IMAGE)) {
      resource.texture = new Texture(gl, resource.data);
    }

    next();
  };
};
