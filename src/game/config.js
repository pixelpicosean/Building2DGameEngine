module.exports = {
  /**
   * Base URL of assets.
   * @type {String}
   */
  baseUrl: 'media',

  gfx: {
    /**
     * The resolution of the renderer, used for hi-resolution
     * textures and better text rendering.
     *
     * You only need higher resolutions while using hi-res
     * textures(i.e. image@2x.png), or better Text renderering.
     * Higher resolution means larger Canvas, which may cause
     * performance issues, especially on mobile devices.
     *
     * The value can be numbers, which will be directly used
     *   by the renderer
     * Or an object with some fields:
     *   - retina {Boolean} Whether take retina into account
     *   - values {Array}   Available resolutions
     * @type {Number|Object}
     */
    resolution: {
      retina: false,
      values: [1],
    },
    /**
     * Default scale mode (linear or nearest)
     * @type {String}
     */
    scaleMode: 'nearest',
    /**
     * Sets antialias (only applicable in chrome at the moment).
     * @type {Boolean}
     */
    antialias: false,
  },
};
