import { Component, Property } from '@wonderlandengine/api';

/**
 * OptionButton
 * -------------
 * Represents a single clickable button inside the Options menu.
 * When clicked, it notifies the parent Options component using its assigned ID.
 */
export class OptionButton extends Component {
    static TypeName = 'optionButton';

    static Properties = {
        /** Button ID (index used by the Options component and set in the editor individually) */
        id: Property.int(0),
    };

    start() {
        // Get the cursor-target component to detect clicks
        const target = this.object.getComponent('cursor-target');

        // Bind click handler to preserve 'this'
        target.addClickFunction(this.onClick.bind(this));

        // Reference to the parent Options component
        this.options = this.object.parent.getComponent('options');
        if (!this.options) {
            console.warn(`[OptionButton] Parent of ${this.object.name} has no Options component`);
        }
    }

    /** Called when this button is clicked */
    onClick() {
        if (!this.options) return;
        this.options.optionClick(this.id);
    }
}

