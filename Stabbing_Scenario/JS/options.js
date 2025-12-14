import { Component, Property } from '@wonderlandengine/api';
import { enable, disable } from './utils.js';

export class Options extends Component {
    static TypeName = 'options';

    static Properties = {
        infoText: Property.object(),   // NarrationText
        outcome:  Property.object(),   // StabOutcomePanel
    };

    start() {
        console.log('[Options] start() on object:', this.object.name);

        /* Find the real choice buttons (children with a "button" component) */
        this.optionButtons = [];
        for (let i = 0; i < this.object.children.length; i++) {
            const child = this.object.children[i];
            if (child.getComponent('button')) {
                this.optionButtons.push(child);
                console.log('[Options] Found button child:', child.name);
            }
        }
        console.log('[Options] Total buttons found:', this.optionButtons.length);

        /* Your two choices + final multi-line texts */
        this.scenarioOptions = [
            [
                "Keep knife in place; apply firm pressure",
                () => {
                    console.log('[Options] GOOD choice callback');
                    const ctrl = this._getOutcomeController();
                    if (ctrl) ctrl.chooseGood();
                },
                [],
                4.0,
                "\n\nYou follow the dispatcher’s instructions.\n" +
                "Leaving the knife in place prevents massive bleeding.\n\n" +
                "You apply firm pressure around the wound\n" +
                "and keep the victim calm until the ambulance arrives."
            ],
            [
                "Remove the knife; treat wound properly",
                () => {
                    console.log('[Options] BAD choice callback');
                    const ctrl = this._getOutcomeController();
                    if (ctrl) ctrl.chooseBad();
                },
                [],
                4.0,
                "\n\n\n\nAs soon as you pull the knife out,\n" +
                "The victim begins bleeding heavily.\n\n" +
                "Without the object blocking the wound,\n" +
                "there is massive internal and external bleeding.\n" +
                "The victim loses consciousness and dies before help arrives.\n\n" +
                "In real life, removing an embedded object like this can be fatal –\n" +
                "always leave it in place and apply pressure around it."
            ]
        ];

        /* Just set labels on the buttons; StabSequence controls when panel is shown */
        this.setOptions(this.scenarioOptions);
    }

    _getOutcomeController() {
        if (!this.outcome) {
            console.warn('[Options] outcome property not assigned');
            return null;
        }
        const ctrl = this.outcome.getComponent('stab-outcome');
        if (!ctrl) {
            console.warn('[Options] outcome object has no stab-outcome component');
        }
        return ctrl;
    }

    setOptions(options, delay = 0) {
        const n = options.length;
        const nButtons = this.optionButtons.length;

        this.options = options;

        /* Enable needed buttons */
        for (let i = 0; i < n; i++) {
            enable(this.optionButtons[i]);
        }

        /* Disable any extra buttons */
        for (let i = n; i < nButtons; i++) {
            const btn = this.optionButtons[i];
            setTimeout(() => disable(btn), delay * 1000 + 5);
        }

        /* Put the label text on each button */
        for (let i = 0; i < n; i++) {
            const btn = this.optionButtons[i];
            const textComp = btn.getComponent('text');

            if (textComp) {
                textComp.text = options[i][0];
                console.log('[Options] Set label for', btn.name, '→', options[i][0]);
            } else {
                console.warn('[Options] Could not find text component for button', btn.name);
            }
        }
    }

    optionClick(id) {
        if (!this.options || !this.options[id]) {
            console.warn('[Options] optionClick with invalid id:', id);
            return;
        }

        console.log('[Options] optionClick(', id, ')');

        const delay = this.options[id][3];
        const txt   = this.options[id][4];

        /* Run the GOOD/BAD callback (moves camera + plays hands) */
        this.options[id][1]();

        /* Hide buttons */
        this.setOptions([], delay);
        disable(this.object);

        /* After delay, show the END SCREEN text (white, no colour changes) */
        setTimeout(() => {
            if (!this.infoText) return;

            const textComp = this.infoText.getComponent('text');
            if (!textComp) {
                console.warn('[Options] infoText has no text component');
                return;
            }

            textComp.text = txt;
            console.log('[Options] Set outcome text');
        }, delay * 1000);
    }
}


