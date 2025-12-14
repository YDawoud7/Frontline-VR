/**
 * utils.js
 * 
 * Common utility functions for object state management in Wonderland Engine.
 * 
 */

/**
 * Recursively sets an object's `active` state (and all its children).
 * 
 * @param {WL.Object} object - The root object to toggle.
 * @param {boolean} active - Whether to activate or deactivate.
 */
export function setActiveRecursive(object, active) {
  object.active = active;
  for (let i = 0; i < object.children.length; i++) {
      setActiveRecursive(object.children[i], active);
  }
}

/**
* Enables an object and all its children.
* Equivalent to `setActiveRecursive(object, true)`.
* 
* @param {WL.Object} object - The root object to enable.
*/
export function enable(object) {
  setActiveRecursive(object, true);
}

/**
* Disables an object and all its children.
* Equivalent to `setActiveRecursive(object, false)`.
* 
* @param {WL.Object} object - The root object to disable.
*/
export function disable(object) {
  setActiveRecursive(object, false);
}

export function tpPlayerHere(target, player) {
  const targetPos = target.getPositionWorld();

  // Offset to position player realistically near target
  targetPos[0] += 0;
  targetPos[1] -= 0.7;
  targetPos[2] += 0.2;

  player.setPositionWorld(targetPos);

  // Set the head to face the correct direction (hard-coded quaternion FOR NOW)
  // const correctRotation = [-0.3637621, 0.4249738, 0.1916963, 0.8064285];
  // this.rotationLock = correctRotation;

  // this.head.setRotationLocal(correctRotation);
}