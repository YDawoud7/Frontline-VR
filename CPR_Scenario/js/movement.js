import { Component, Property } from '@wonderlandengine/api';

/**
 * KeyboardMovement
 * ----------------
 * Allows movement of an object using keyboard input (WASD + Q/E for vertical).
 * Movement is based on the player's head orientation (ignoring pitch),
 * so "forward" always means the direction the player is facing horizontally.
 */
export class KeyboardMovement extends Component {
    static TypeName = 'keyboardMovement';

    static Properties = {
        speed: Property.float(1.0),  // Movement speed multiplier
        head: Property.object(),     // Reference to head object (for facing direction)
    };

    /** Stores movement input for each axis: [x, y, z] */
    translateVector = [0, 0, 0];

    start() {
        // Listen for key presses
        window.addEventListener("keydown", (e) => {
            if (e.repeat) return; // Ignore held-down repeats
            switch (e.key) {
                case "w": this.forward(); break;
                case "a": this.left(); break;
                case "s": this.backward(); break;
                case "d": this.right(); break;
                case "e": this.up(); break;
                case "q": this.down(); break;
            }
        });

        // Listen for key releases (reverse their effect)
        window.addEventListener("keyup", (e) => {
            switch (e.key) {
                case "w": this.backward(); break;
                case "a": this.right(); break;
                case "s": this.forward(); break;
                case "d": this.left(); break;
                case "e": this.down(); break;
                case "q": this.up(); break;
            }
        });
    }

    update(dt) {
        // Get the head's forward direction in world space
        const forward = [0, 0, -1];
        this.head.getForwardWorld(forward);

        // Ignore pitch by flattening the Y component
        forward[1] = 0;

        // Normalize forward vector (keep consistent speed)
        const fLen = Math.hypot(forward[0], forward[2]);
        forward[0] /= fLen;
        forward[2] /= fLen;

        // Compute right vector by rotating forward 90° around Y
        const right = [-forward[2], 0, forward[0]];

        // Combine input direction (translateVector) with orientation
        const move = [
            right[0] * this.translateVector[0] + forward[0] * this.translateVector[2],
            this.translateVector[1],
            right[2] * this.translateVector[0] + forward[2] * this.translateVector[2],
        ];

        // Apply the movement to the object
        this.object.translateWorld([
            this.speed * move[0] * dt,
            this.speed * move[1] * dt,
            this.speed * move[2] * dt
        ]);
    }

    // Input helper functions
    forward()  { this.translateVector[2] += 1; }
    backward() { this.translateVector[2] -= 1; }
    left()     { this.translateVector[0] -= 1; }
    right()    { this.translateVector[0] += 1; }
    up()       { this.translateVector[1] += 1; }
    down()     { this.translateVector[1] -= 1; }
}
