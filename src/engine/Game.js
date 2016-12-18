const core = require('engine/core');

class Game {
  constructor() {
    /**
     * Desired FPS this scene should run
     * @property {Number} desiredFPS
     * @default 60
     */
    this.desiredFPS = 60;

    /**
     * Map of added systems
     * @property {Object} systems
     */
    this.systems = {};

    /**
     * List of system updating order.
     * Note: `systemOrder` should only be modified after systems added!
     * @property {Array<String>} systemOrder
     */
    this.systemOrder = [];

    /**
     * List of entities in the game world.
     * @type {Array<Entity>}
     */
    this.entities = [];
    /**
     * Holding all the named entities(has `name` been set).
     * @type {Object}
     */
    this.namedEntities = {};
    /**
     * Holding all the tagged entities(has `tag` been set).
     * @type {Object}
     */
    this.taggedEntities = {};

    /**
     * Caches update informations
     * @type {Object}
     * @private
     */
    this.updateInfo = {
      spiraling: 0,
      last: -1,
      realDelta: 0,
      deltaTime: 0,
      lastCount: 0,
      step: 0,
      slowStep: 0,
      count: 0,
    };
  }

  /**
   * Awake is called when this scene is activated.
   * @method awake
   * @memberof Game#
   */
  awake() {
    let i, sys;
    for (i = 0; i < this.systemOrder.length; i++) {
      sys = this.systemOrder[i];
      this.systems[sys] && this.systems[sys].awake();
    }
  }

  /**
   * Fixed update is called in a constant frenquence decided by `desiredFPS`.
   * @method update
   * @memberof Game#
   * @param {Number} delta    Delta time in millisecond
   * @param {Number} deltaSec Delta time in second
   */
  update(delta, deltaSec) {
    let i, sys, ent;

    // Update systems
    for (i = 0; i < this.systemOrder.length; i++) {
      sys = this.systemOrder[i];
      this.systems[sys] && this.systems[sys].update(delta, deltaSec);
    }
  }

  /**
   * Drawing method
   * @method draw
   * @memberof Game#
   * @param {Number} delta    Delta time in millisecond
   * @param {Number} deltaSec Delta time in second
   */
  draw(delta, deltaSec) {
    let i, sys, ent;

    // Update systems
    for (i = 0; i < this.systemOrder.length; i++) {
      sys = this.systemOrder[i];
      this.systems[sys] && this.systems[sys].draw(delta, deltaSec);
    }
  }

  /**
   * Freeze is called when this scene is deactivated(switched to another one)
   * @method freeze
   * @memberof Game#
   */
  freeze() {
    let i, sys;
    for (i = 0; i < this.systemOrder.length; i++) {
      sys = this.systemOrder[i];
      this.systems[sys] && this.systems[sys].freeze();
    }
  }

  /**
   * Add a system instance to this game.
   * @method addSystem
   * @memberof Game#
   * @param {System} sys System instance to add
   * @return {Game} Self for chaining
   */
  addSystem(sys) {
    if (sys.name.length === 0) {
      console.log(`System name "${sys.name}" is invalid!`);
      return this;
    }

    if (this.systemOrder.indexOf(sys.name) >= 0) {
      console.log(`System "${sys.name}" already added!`);
      return this;
    }

    this.systems[sys.name] = sys;
    this.systemOrder.push(sys.name);
    this[`sys${sys.name}`] = sys;
    sys.game = this;

    return this;
  }

  run(timestamp) {
    let updateInfo = this.updateInfo;

    if (updateInfo.last > 0) {
      updateInfo.realDelta = timestamp - updateInfo.last;
    }
    updateInfo.last = timestamp;

    // If the logic time is spiraling upwards, skip a frame entirely
    if (updateInfo.spiraling > 1) {
      // Reset the deltaTime accumulator which will cause all pending dropped frames to be permanently skipped
      updateInfo.deltaTime = 0;
      updateInfo.spiraling = 0;
    }
    else {
      // Step size
      updateInfo.step = 1000.0 / this.desiredFPS;
      updateInfo.slowStep = updateInfo.step * core.speed;
      updateInfo.slowStepSec = updateInfo.step * 0.001 * core.speed;

      // Accumulate time until the step threshold is met or exceeded... up to a limit of 3 catch-up frames at step intervals
      updateInfo.deltaTime += Math.max(Math.min(updateInfo.step * 3, updateInfo.realDelta), 0);

      // Call the game update logic multiple times if necessary to "catch up" with dropped frames
      // unless forceSingleUpdate is true
      updateInfo.count = 0;

      while (updateInfo.deltaTime >= updateInfo.step) {
        updateInfo.deltaTime -= updateInfo.step;

        // Fixed update
        this.update(updateInfo.slowStep, updateInfo.slowStepSec);

        updateInfo.count += 1;
      }

      // Detect spiraling (if the catch-up loop isn't fast enough, the number of iterations will increase constantly)
      if (updateInfo.count > updateInfo.lastCount) {
        updateInfo.spiraling += 1;
      }
      else if (updateInfo.count < updateInfo.lastCount) {
        // Looks like it caught up successfully, reset the spiral alert counter
        updateInfo.spiraling = 0;
      }

      updateInfo.lastCount = updateInfo.count;
    }

    // Draw(idle update)
    this.draw(updateInfo.realDelta, updateInfo.realDelta * 0.001);
  }
}
Game.id = 0;

module.exports = Game;
