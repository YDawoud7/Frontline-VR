import {Component, Property} from '@wonderlandengine/api';
import { enable, disable, tpPlayerHere } from './utils.js'
/**
 * checkBreathing
 */
export class CheckBreathing extends Component {
    static TypeName = 'checkBreathing';
    /* Properties that are configurable in the editor */
    static Properties = {
        hand: Property.object(),
        player: Property.object(),
        head: Property.object(),
    };

    start() {
        disable(this.hand);

        this.rotationLock = null;
    }

    checkBreathing(time) {
        // Save player's original world position
        this.initPos = this.player.getPositionWorld();

        // Move player near the CPR target
        // this.tpPlayerHere();
        tpPlayerHere(this.object, this.player);

        enable(this.hand);
        setTimeout(() => this.stopCheck(), time*1000);
    }

    stopCheck() {
        disable(this.hand);
        this.player.setPositionWorld(this.initPos);
        this.rotationLock = null;
    }


    // tpPlayerHere() {
    //     const targetPos = this.object.getPositionWorld();

    //     // Offset to position player realistically near target
    //     targetPos[0] += 0.4;
    //     targetPos[1] -= 1.1;
    //     targetPos[2] += 0.4;

    //     this.player.setPositionWorld(targetPos);

    //     // Set the head to face the correct direction (hard-coded quaternion FOR NOW)
    //     const correctRotation = [-0.3637621, 0.4249738, 0.1916963, 0.8064285];
    //     this.rotationLock = correctRotation;

    //     // this.head.setRotationLocal(correctRotation);
    // }

    update(dt) {
        if (this.rotationLock != null) {
            // console.log("HII");
            // console.log(this.rotationLock);
            this.head.setRotationLocal(this.rotationLock);
        }
    }
}
