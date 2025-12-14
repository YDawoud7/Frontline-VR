import {Component, Property} from '@wonderlandengine/api';
import { enable, disable } from './utils';

/**
 * summaryOverlay
 */
export class SummaryOverlay extends Component {
    static TypeName = 'summaryOverlay';
    /* Properties that are configurable in the editor */
    static Properties = {
        title: Property.object(),
        message1: Property.object(),
        message2: Property.object(),
        message3: Property.object(),
        message4: Property.object(),

        greenMaterial: Property.material(),
        redMaterial: Property.material(),
    };

    init() {
        this.message1Text = this.message1.getComponent("text");
        this.message2Text = this.message2.getComponent("text");
        this.message3Text = this.message3.getComponent("text");
        this.message4Text = this.message4.getComponent("text");
        this.titleText = this.title.getComponent("text");
        console.log(this.titleText);

        this.disabled = true;
    }

    showSummary(score, checkedPulse, lookedAround, earlyCPR, lateReaction) {
        console.log("showing summary");
        enable(this.object);
        this.disabled = false;

        if (score == 2) {
            this.titleText.text = "Excellent! You acted perfectly!";
        }
        else if (score >= 1) {
            this.titleText.text = "Well done!";
        }
        else {
            this.titleText.text = "You'll get better with practice!";
        }


        if (checkedPulse) {
            this.message1Text.text = "There's no need to check for pulse. Lack of a response and normal breathing is enough to indicate the need for CPR";
            this.applyStyles(this.message1Text, {color: "red"});
        }
        else {
            this.message1Text.text = "Good job not checking the pulse. Checking for breathing is far easier and is sufficient.";
            this.applyStyles(this.message1Text, {color: "green"});
        }
        if (lookedAround) {
            this.message2Text.text = "Looking around for help is the way if you're unable to perform CPR, but it wastes valuable time!";
            this.applyStyles(this.message2Text, {color: "red"});
        }
        else {
            this.message2Text.text = "Great job staying focused on the task and not stopping to look for help.";
            this.applyStyles(this.message2Text, {color: "green"});
        }
        if (earlyCPR) {
            this.message3Text.text = "Don't perform CPR until you've quickly confirmed it's required (no response and no/irregular breathing)";
            this.applyStyles(this.message3Text, {color: "red"});
        }
        else {
            this.message3Text.text = "You started compressions at the right time after ensuring it was needed. Excellent!";
            this.applyStyles(this.message3Text, {color: "green"});
        }
        if (lateReaction) {
            this.message4Text.text = "Don't hesitate or wait for instructions. Every second is crucial!";
            this.applyStyles(this.message4Text, {color: 'red'});
        }
        else {
            this.message4Text.text = "Well done following your instincts and not delaying action!";
            this.applyStyles(this.message4Text, {color: 'green'});
        }
    }

    applyStyles(text, {color}) {
        if (color == 'green') {
            text.material = this.greenMaterial;
        }
        else text.material = this.redMaterial;
    }

    update(dt) {
        if (this.disabled) disable(this.object);
    }
}
