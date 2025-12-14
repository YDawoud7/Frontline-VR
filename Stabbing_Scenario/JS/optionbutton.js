import { Component, Property } from '@wonderlandengine/api';

/**
 * OptionButton
 * ------------
 * One button inside our options menu.
 * Has an 'id' (0 or 1) and tells the Options component which one was clicked.
 */
export class OptionButton extends Component {
    static TypeName = 'optionButton';

    static Properties = {
        /** Button ID: 0 = first choice, 1 = second choice */
        id: Property.int(0),
    };

    start() {
        // Get the cursor-target component to detect clicks
        const target = this.object.getComponent('cursor-target');
        if (!target) {
            console.warn('OptionButton: this object needs a cursor-target component.');
            return;
        }

        // Bind click handler to preserve 'this'
        target.addClickFunction(this.onClick.bind(this));

        // Reference to the parent Options component
        this.options = this.object.parent.getComponent('options');
        if (!this.options) {
            console.warn(
                `[OptionButton] Parent of ${this.object.name} has no Options component`,
            );
        }
    }

    /** Called when this button is clicked */
    onClick() {
        if (!this.options) return;
        this.options.optionClick(this.id);
    }
}


