import {Component, Property} from '@wonderlandengine/api';
import { tpPlayerHere } from './utils';

/**
 * lookAround
 */
export class LookAround extends Component {
    static TypeName = 'lookAround';
    /* Properties that are configurable in the editor */
    static Properties = {
        head: Property.object(),
        remy: Property.object(),
        audio: Property.object(),
    };

    init() {
        this.rotationLeft = [-0.04628576710820198, 0.7992137670516968, 0.06206337362527847, 0.5960395336151123];
        this.rotationRight = [-0.12416137754917145, -0.2525559663772583, -0.03269745036959648, 0.9590256810188293];

        this.rotationLock = null;
    }

    lookAround(time) {
        this.rot = [0, 1, 0];
        // this.tpPlayerHere();
        tpPlayerHere(this.remy, this.object);

        this.rotationLock = this.rotationRight;

        setTimeout(() => this.rotationLock = this.rotationLeft, time*1000/2);

        setTimeout(() => this.stopLooking(), time*1000);

        // this.head.getComponent("audio-source").src = this.audioSrc;
        this.audio.getComponent("audio-source").play();
    }

    stopLooking() {
        this.rotationLock = null;
        this.head.setRotationLocal([-0.3637621, 0.4249738, 0.1916963, 0.8064285]);
    }

    update(dt) {
        if (this.rotationLock) {
            this.head.setRotationLocal(this.rotationLock);
        }

        // console.log(this.head.getRotationLocal());
    }

    // tpPlayerHere() {
    //     const targetPos = this.remy.getPositionWorld();

    //     // Offset to position player realistically near target
    //     targetPos[0] += 0.4;
    //     targetPos[1] -= 1.1;
    //     targetPos[2] += 0.4;

    //     this.object.setPositionWorld(targetPos);

    //     // Set the head to face the correct direction (hard-coded quaternion FOR NOW)
    //     // const correctRotation = [-0.3637621, 0.4249738, 0.1916963, 0.8064285];
    //     // this.rotationLock = correctRotation;

    //     // this.head.setRotationLocal(correctRotation);
    // }
}
