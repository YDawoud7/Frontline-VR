import {Component, Property} from '@wonderlandengine/api';
import { enable, disable, tpPlayerHere } from './utils';


/**
 * checkResponse
 */
export class CheckResponse extends Component {
    static TypeName = 'checkResponse';
    /* Properties that are configurable in the editor */
    static Properties = {
        hand: Property.object(),
        player: Property.object(),
        head: Property.object(),
        audio: Property.object(),
    };

    init() {
        disable(this.hand);
        // this.audio.getComponent("audio-source").volume = 0.5;
        this.checking = false;
        this.xRange = this.yRange = this.zRange = 0.01;

        this.rotationLock = null;
    }
    
    checkResponse(time) {
        // Save player's original world position
        this.initPos = this.player.getPositionWorld();

        // Move player near the CPR target
        // this.tpPlayerHere();
        tpPlayerHere(this.object, this.player);

        this.checking = true;
        this.initHandPos = this.targetPos = this.hand.getPositionWorld();
        enable(this.hand);
        setTimeout(() => this.stopCheck(), time*1000);
        this.timeElapsed = 0;
        this.movesMade = 0;

        // this.audio.getComponent("audio-source").volume = 1;
        let audioComp = this.audio.getComponent("audio-source");
        audioComp.play().then(x => console.log(x)).catch(e => console.error(e));
        // this.audio.getComponent('audio-source')
        // .play()
        // .then(() => console.log("Playback started"))
        // .catch((e) => console.error("Playback failed: " + e));
    }
    stopCheck() {
        disable(this.hand);
        this.checking = false;
        this.hand.setPositionWorld(this.initHandPos);
        this.player.setPositionWorld(this.initPos);

        this.rotationLock = null;
    }

    update(dt) {
        if (!this.checking) return;

        if (this.rotationLock != null) {
            // console.log("HII");
            // console.log(this.rotationLock);
            this.head.setRotationLocal(this.rotationLock);
        }

        this.timeElapsed += dt;

        if (Math.floor(this.timeElapsed/0.2) <= this.movesMade) {
            let timeToPos = Math.floor(this.timeElapsed/0.2)*0.2+0.2 - this.timeElapsed;
            let movesLeft = timeToPos/dt;
            let diffX = this.targetPos[0] - this.hand.getPositionWorld()[0];
            let diffY = this.targetPos[1] - this.hand.getPositionWorld()[1];
            let diffZ = this.targetPos[2] - this.hand.getPositionWorld()[2];

            this.hand.translateWorld([diffX/movesLeft, diffY/movesLeft, diffZ/movesLeft]);
        }
        else {
            this.movesMade++;

            // if (this.timeElapsed)
            let x = 2*this.xRange*Math.random()-this.xRange + this.initHandPos[0];
            let y = 2*this.yRange*Math.random()-this.yRange + this.initHandPos[1];
            let z = 2*this.zRange*Math.random()-this.zRange + this.initHandPos[2];

            this.targetPos = [x, y, z];
        }
    }

}
