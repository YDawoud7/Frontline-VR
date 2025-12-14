import {Component, Property} from '@wonderlandengine/api';
import {enable, disable} from './utils.js';

export class StabSequence extends Component {
    static TypeName = 'stabSequence';

    static Properties = {
        attacker: Property.object(),
        victim: Property.object(),
        optionsPanel: Property.object(),
        narrationText: Property.object(),   // <-- NEW
        stabToFallDelay: Property.float(0.3),
        optionsDelay: Property.float(3.0),
    };

    start() {
        this.time = 0;
        this.victimStarted = false;
        this.optionsShown = false;

        if (this.optionsPanel) {
            disable(this.optionsPanel);     // hide options at start
        }

        this.attackerAnim = this.attacker && this.attacker.getComponent('animation');
        this.victimAnim   = this.victim   && this.victim.getComponent('animation');

        if (this.attackerAnim) {
            this.attackerAnim.playCount = 1;
            this.attackerAnim.stop && this.attackerAnim.stop();
            this.attackerAnim.play && this.attackerAnim.play();
        }

        if (this.victimAnim) {
            this.victimAnim.playCount = 1;
            this.victimAnim.stop && this.victimAnim.stop();
            // do not play yet, we start it after stabToFallDelay
        }

        this.narrationComp = null;
        if (this.narrationText) {
            this.narrationComp = this.narrationText.getComponent('text');
            if (this.narrationComp) this.narrationComp.text = '';
        }
    }

    update(dt) {
        this.time += dt;

        // victim fall
        if (!this.victimStarted && this.time >= this.stabToFallDelay && this.victimAnim) {
            this.victimAnim.play && this.victimAnim.play();
            this.victimStarted = true;
        }

        // dispatcher line + show options
        if (!this.optionsShown && this.time >= this.optionsDelay) {
            if (this.optionsPanel) enable(this.optionsPanel);

            if (this.narrationComp) {
                this.narrationComp.text =
                    "You call emergency services.\n" +
                    "The dispatcher says: 'Do NOT remove the knife.\n" +
                    "Apply firm pressure around the wound and wait for help.'";
            }

            this.optionsShown = true;
        }
    }
}

