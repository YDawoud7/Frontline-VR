import { Component, Property } from '@wonderlandengine/api';
import { enable, disable } from './utils';
import { summaryOverlay } from './overlay';

/**
 * Options Component
 * 
 * Handles interactive decision-making menus during the scenario (e.g., CPR flow).
 * 
 * Features:
 * - Dynamically updates available options based on player choices.
 * - Disables/reenables buttons between steps.
 * - Displays contextual feedback text for each decision.
 */
export class Options extends Component {
    static TypeName = 'options';
    static Properties = {
        remy: Property.object(),      // The CPR dummy or character (Remy)
        infoText: Property.object(),  // The on-screen feedback text object
        player: Property.object(),
        // timeLimitIndicator: Property.object(),
        timeBar: Property.object(),
        timeBarElapsed: Property.object(),
        timeLimit: Property.float(5),
        overlay: Property.object(),
        startPosition: Property.vector3(),
        outsidePosition: Property.vector3(),
    };

/**
     * The root decision tree that defines all branching options and their consequences.
     * Each option entry format:
     * [ label, onClickFunction, nextOptions[], delayInSeconds, feedbackText, points ]
     */

initOptions = [
    [
        "Perform CPR",
        () => this.earlyCPR = true,
        [],
        1,
        "Not just yet!",
        -1
    ],
    [
        "Check responsiveness",
        () => this.remy.getComponent("checkResponse").checkResponse(2),
        [
            [
                "Check Breathing",
                () => this.remy.getComponent("checkBreathing").checkBreathing(2),
                [
                    [
                        "Check Pulse",
                        () => {this.checkedPulse = true; this.remy.getComponent("checkPulse").checkPulse(2)},
                        [],
                        2,
                        "Pulse is weak. Start compressions now!",
                        -0.5
                    ],
                    [
                        "Perform CPR",
                        () => this.remy.getComponent("getcprd").startCpr(0.5, 3.1),
                        null,
                        3.1,
                        "You did it!",
                        0
                    ],
                    [
                        "Call for help",
                        () => {this.lookedAround = true; this.player.getComponent("lookAround").lookAround(2);},
                        [],
                        2,
                        "There's no time! Start compressions now!",
                        -1
                    ],
                ],
                2,
                "You tilt his head back. Breathing seems irregular.",
                0
            ],
            [
                "Check Pulse",
                () => {this.checkedPulse = true; this.remy.getComponent("checkPulse").checkPulse(2)},
                [],
                2,
                "Pulse is weak, but you need more info!",
                -0.5
            ],
            [
                "Perform CPR",
                () => this.earlyCPR = true,
                [],
                0.5,
                "Not just yet!",
                -1
            ],
        ],
        2,
        "You shake him and shout. No response.",
        0
    ],
    [
        "Look for help",
        () => {this.lookedAround = true; this.player.getComponent("lookAround").lookAround(2);},
        [],
        2,
        "Medics are on their way, but you need to act!",
        -0.5
    ],
];

    /* ----------------------------------------
       Lifecycle Methods
    ---------------------------------------- */

    init() {
        // Disable options menu initially
        this.disabled = true;
        this.started = false;
    }

    start() {
        this.tpPlayerAway();
        // setTimeout(() => summaryOverlay(this.score, this.checkedPulse, this.lookedAround, this.earlyCPR, this.lateReaction, this.engine), 2000)
        // summaryOverlay(this.score, true, false, true);

        this.checkedPulse = false;
        this.lookedAround = false;
        this.earlyCPR = false;
        this.lateReaction = false;
        // Collect button references from children
        this.optionButtons = [];
        for (let i = 0; i < this.object.children.length; i++) {
            if (this.object.children[i].getComponent("button")) {
                this.optionButtons.push(this.object.children[i]);
            }
        }

        // Initialize with root options
        this.options = [];
        this.setOptions(this.initOptions);

        this.score = 2;

        this.elapsed = null;
    }

    /* ----------------------------------------
       Core Logic
    ---------------------------------------- */

    /**
     * Updates the current active option buttons and their text.
     * Disables extra buttons after an optional delay.
     */
    setOptions(options, delay = 0) {
        const n = options.length;
        const nButtons = this.optionButtons.length;

        // Enable as many buttons as there are options
        for (let i = 0; i < n; i++) enable(this.optionButtons[i]);

        // Disable unused buttons (after delay for transitions)
        for (let i = n; i < nButtons; i++) {
            setTimeout(() => disable(this.optionButtons[i]), delay * 1000 + 5);
        }

        // Update displayed text
        this.options = options;
        for (let i = 0; i < n; i++) {
            this.optionButtons[i].children[0].children[0].getComponent("text").text = this.options[i][0];
        }
    }

    /**
     * Handles logic when a button (option) is clicked.
     */
    optionClick(id) {
        if (this.elapsed > this.timeLimit) this.lateReaction = true;
        this.elapsed = null;

        const nextOptions = this.options[id][2];
        const delay = this.options[id][3];
        const txt = this.options[id][4];
    
        this.score += this.options[id][5];

        // Execute the option’s main function
        this.options[id][1]();

        // Transition to next set of options
        // this.object.scal

        if (nextOptions && nextOptions.length != 0)
            this.setOptions(this.options[id][2], delay);

        // Disable menu during transition
        this.disabled = true;

        // Re-enable menu and show info text after delay
        setTimeout(() => {
            // console.log("does this even happen?");
            this.enable();
            // this.disabled = false;
            // this.elapsed = 0;
            this.infoText.getComponent("text").text = txt;
            if (nextOptions == null) {
                this.disable();
            }
        }, delay * 1000);
    }
    update(dt) {
        if (this.disabled) disable(this.object);
        else {enable(this.object);}
        if (this.started) {enable(this.infoText);}
        else {disable(this.infoText);}

        if (this.elapsed != null && this.elapsed <= this.timeLimit) {
            enable(this.timeBar);
            let width = this.elapsed / this.timeLimit;
            this.timeBarElapsed.setScalingLocal([width, 1.265, 1.1]);
            this.timeBarElapsed.setPositionLocal([-(1-width+0.01), 1.443, 0]);
            this.elapsed += dt;
            // this.timeLimitIndicator.getComponent("text").text = (Math.round(this.elapsed*100)/100).toString();
        }
        else {
            disable(this.timeBar);
            // this.timeLimitIndicator.getComponent("text").text = "no options";
        }
    }
    enable() {
        enable(this.object);
        this.disabled = false;
        this.started = true;
        console.log("hey there!");
        this.elapsed = 0;

        // this.tpToPosition();
    }
    disable() {
        this.tpPlayerAway();

        this.elapsed = null;
        // (animate?) summary screen
        // document.querySelector("html").innerHTML = this.score;
        this.remy.getComponent('wakeUp').wakeUp();
        setTimeout(() => {
            this.overlay.getComponent("summaryOverlay").showSummary(this.score, this.checkedPulse, this.lookedAround, this.earlyCPR, this.lateReaction);
            this.disabled = true;
            this.started = false;
        }, 2000);
        console.log(this.score);
    }

    tpPlayerAway() {
        this.player.setPositionWorld(this.outsidePosition);
    }
    tpToPosition() {
        this.player.setPositionWorld(this.startPosition);
    }
    getStartPos() {
        return this.startPosition;
    }
}
