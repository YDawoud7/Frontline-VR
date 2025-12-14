/**
 * Getcprd.js
 *
 * Handles CPR animation logic — moving the player's hands and body up and down
 * while positioning the player near the CPR target.
 * */

import { Component, Property } from '@wonderlandengine/api';
import { enable, disable, tpPlayerHere } from './utils';

export class Getcprd extends Component {
    static TypeName = 'getcprd';
    static Properties = {
        cprPeriod: Property.float(0.1),   // Time for one CPR cycle (up + down)
        upDownRatio: Property.int(3),     // Ratio of up vs. down motion speed
        leftCprHand: Property.object(),   // Left hand object (activated during CPR)
        rightCprHand: Property.object(),  // Right hand object (activated during CPR)
        player: Property.object(),        // Player root object
        head: Property.object(),          // Player's head (for rotation alignment)
    };

    init() {
        this.cprSpeed = 0;
        this.timeElapsed = 0;

        // Hands are hidden until CPR starts
        disable(this.leftCprHand);
        disable(this.rightCprHand);

        // --- NEW ---
        // Tracks the net Y-axis movement to reset this.object's position
        this.currentYDisplacement = 0;

        this.rotationLock = null;
    }

    /**
     * Starts the CPR sequence.
     * Moves player into position and enables the CPR hand objects.
     * * @param {number} speed - How fast the up/down motion should be
     * @param {number} time - Duration (in seconds) before CPR ends
     */
    startCpr(speed, time) {
        // Save player's original world position
        this.initPos = this.player.getPositionWorld();

        // Move player near the CPR target
        // this.tpPlayerHere();
        tpPlayerHere(this.object, this.player);

        // Activate CPR hand visuals
        enable(this.leftCprHand);
        enable(this.rightCprHand);

        // Begin motion
        this.timeElapsed = 0;
        // --- MODIFIED ---
        // Reset displacement just before starting a new cycle
        this.currentYDisplacement = 0;
        this.cprSpeed = speed;

        // Automatically stop after `time` seconds
        setTimeout(() => this.endCpr(), time * 1000);

    }

    /**
     * Ends the CPR sequence.
     * Returns player to their original position and disables CPR visuals.
     */
    endCpr() {
        // --- MODIFIED ---
        // All reset logic is now contained *inside* this function

        // 1. Teleport player back
        this.tpPlayer(this.initPos);

        // 2. Hide hands
        disable(this.leftCprHand);
        disable(this.rightCprHand);

        // 3. Stop the update loop
        this.cprSpeed = 0;

        // 4. (THE FIX) Immediately apply the opposite translation to this.object
        // This synchronously resets its position, no matter what.
        this.object.translateWorld([0, -this.currentYDisplacement, 0]);

        // 5. Reset trackers for the next run
        this.currentYDisplacement = 0;
        this.timeElapsed = 0;

        this.rotationLock = null;
    }

    /**
     * Handles the up-and-down animation during CPR.
     * Called every frame by Wonderland Engine.
     */
    update(dt) {
        // --- MODIFIED ---
        // Simplified: This function *only* handles the "up" and "down" motion
        // while CPR is active. The reset logic is now in endCpr().
        
        if (this.rotationLock != null) {
            // console.log("HII");
            // console.log(this.rotationLock);
            this.head.setRotationLocal(this.rotationLock);
        }

        if (this.cprSpeed === 0) return;

        this.timeElapsed += dt;

        // Move up for 'upDownRatio' periods, then move down for one
        const cycle = Math.floor(this.timeElapsed / this.cprPeriod);
        const goingUp = cycle % (this.upDownRatio + 1) < this.upDownRatio;

        const direction = goingUp ? 1 : -this.upDownRatio;

        // Calculate and apply this frame's movement
        const movementY = dt * this.cprSpeed * direction;
        this.object.translateWorld([0, movementY, 0]);

        // Track the total displacement so endCpr() knows how to reset it
        this.currentYDisplacement += movementY;
    }


    /**
     * Teleports the player back to a saved world position.
     * * @param {Float32Array|number[]} to - Target position
     */
    tpPlayer(to) {
        if (!to) return;
        this.player.setPositionWorld(to);
    }
}