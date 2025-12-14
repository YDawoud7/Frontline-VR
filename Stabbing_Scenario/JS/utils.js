/**
 * Simple helpers to enable / disable objects and all their children.
 */

/**
 * Recursively sets an object's `active` state (and all its children).
 *
 * @param {WL.Object} object - root object
 * @param {boolean} active  - true = enable, false = disable
 */
export function setActiveRecursive(object, active) {
    if (!object) return;
    object.active = active;
    const children = object.children;
    for (let i = 0; i < children.length; i++) {
        setActiveRecursive(children[i], active);
    }
}

/** Enables an object and its children. */
export function enable(object) {
    setActiveRecursive(object, true);
}

/** Disables an object and its children. */
export function disable(object) {
    setActiveRecursive(object, false);
}

