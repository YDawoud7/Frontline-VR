import { Component, Property } from '@wonderlandengine/api';
import { enable, disable } from './utils.js';

export class StabOutcome extends Component {
    static TypeName = 'stab-outcome';

    static Properties = {
        infoText:      Property.object(),

        attacker:      Property.object(),
        activeVictim:  Property.object(),
        idleVictim:    Property.object(),

        bloodSmall:    Property.object(), // normal blood under idleVictim
        bloodBig:      Property.object(), // bigger blood under idleVictim

        pressureHands: Property.object(),
        removeHands:   Property.object(),

        camera:        Property.object(),
        goodCameraPos: Property.object(),
        badCameraPos:  Property.object(),
    };

    start() {
        console.log('[StabOutcome] start() on object:', this.object.name);

        this._resolved = false;

        /* Initial visibility: final-scene stuff OFF */
        this._safeDisable(this.idleVictim, 'idleVictim');
        this._safeDisable(this.bloodSmall, 'bloodSmall');
        this._safeDisable(this.bloodBig, 'bloodBig');
        this._safeDisable(this.pressureHands, 'pressureHands');
        this._safeDisable(this.removeHands, 'removeHands');

        if (!this.attacker)      console.warn('[StabOutcome] attacker not assigned');
        if (!this.activeVictim)  console.warn('[StabOutcome] activeVictim not assigned');
        if (!this.bloodSmall)    console.warn('[StabOutcome] bloodSmall not assigned');
        if (!this.bloodBig)      console.warn('[StabOutcome] bloodBig not assigned');
        if (!this.camera)        console.warn('[StabOutcome] camera not assigned');
        if (!this.goodCameraPos) console.warn('[StabOutcome] goodCameraPos not assigned');
        if (!this.badCameraPos)  console.warn('[StabOutcome] badCameraPos not assigned');
    }

    _safeDisable(obj, name) {
        if (!obj) {
            console.warn('[StabOutcome] No object given for', name);
            return;
        }
        disable(obj);
        // console.log('[StabOutcome] Disabled', name, '(', obj.name, ')');
    }

    _safeEnable(obj, name) {
        if (!obj) {
            console.warn('[StabOutcome] No object given for', name);
            return;
        }
        enable(obj);
        // console.log('[StabOutcome] Enabled', name, '(', obj.name, ')');
    }

    _clearInfoText() {
        if (!this.infoText) return;
        const textComp = this.infoText.getComponent('text');
        if (textComp) {
            textComp.text = '';
        } else {
            console.warn('[StabOutcome] infoText has no text component');
        }
    }

    _moveCameraTo(target, label) {
        if (!this.camera) {
            console.warn('[StabOutcome] camera not set, cannot move camera');
            return;
        }
        if (!target) {
            console.warn('[StabOutcome] target camera position for', label, 'is null');
            return;
        }

        const pos = new Float32Array(3);
        const rot = new Float32Array(4);

        target.getTranslationWorld(pos);
        target.getRotationWorld(rot);

        this.camera.setTranslationWorld(pos);
        this.camera.setRotationWorld(rot);

        console.log('[StabOutcome] Moved camera to', label, 'position from', target.name);
    }

    /* Shared work for both good and bad outcomes */
    _commonSetup(label) {
        if (this._resolved) {
            console.log('[StabOutcome]', label, 'called but outcome already resolved');
            return false;
        }
        this._resolved = true;

        console.log('[StabOutcome] Resolving outcome:', label);

        // Hide attacker & standing victim
        this._safeDisable(this.attacker, 'attacker');
        this._safeDisable(this.activeVictim, 'activeVictim');

        // Show idle victim and start with SMALL blood
        this._safeEnable(this.idleVictim, 'idleVictim');
        this._safeEnable(this.bloodSmall, 'bloodSmall');
        this._safeDisable(this.bloodBig, 'bloodBig');

        // Clear text while hands animations play
        this._clearInfoText();

        return true;
    }

    chooseGood() {
        console.log('[StabOutcome] chooseGood() called');

        if (!this._commonSetup('GOOD')) return;

        // Keep small blood for good outcome

        // Camera close-up
        this._moveCameraTo(this.goodCameraPos || this.badCameraPos, 'GOOD');

        // Show and play "apply pressure" hands
        if (this.pressureHands) {
            this._safeEnable(this.pressureHands, 'pressureHands');
            const anim = this.pressureHands.getComponent('animation');
            if (anim) {
                anim.play(0);
            } else {
                console.warn('[StabOutcome] pressureHands has no animation component');
            }
        } else {
            console.warn('[StabOutcome] pressureHands object not assigned');
        }

        // Long explanation text is set later by options.js
    }

    chooseBad() {
        console.log('[StabOutcome] chooseBad() called');

        if (!this._commonSetup('BAD')) return;

        // Switch from small blood to BIG blood
        this._safeDisable(this.bloodSmall, 'bloodSmall');
        this._safeEnable(this.bloodBig, 'bloodBig');

        this._moveCameraTo(this.badCameraPos || this.goodCameraPos, 'BAD');

        if (this.removeHands) {
            this._safeEnable(this.removeHands, 'removeHands');
            const anim = this.removeHands.getComponent('animation');
            if (anim) {
                anim.play(0);
            } else {
                console.warn('[StabOutcome] removeHands has no animation component');
            }
        } else {
            console.warn('[StabOutcome] removeHands object not assigned');
        }

        // Long explanation text is set later by options.js
    }
}
