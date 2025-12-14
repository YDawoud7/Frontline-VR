import {Component, Property} from '@wonderlandengine/api';
import { enable, disable, tpPlayerHere } from './utils.js'
/**
 * checkBreathing
 */
export class CheckPulse extends Component {
    static TypeName = 'checkPulse';
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

    checkPulse(time) {
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

    update(dt) {
        if (this.rotationLock != null) {
            // console.log("HII");
            // console.log(this.rotationLock);
            this.head.setRotationLocal(this.rotationLock);
        }
    }
}
