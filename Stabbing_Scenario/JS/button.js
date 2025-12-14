import {Component, InputComponent, MeshComponent, Property} from '@wonderlandengine/api';
import {CursorTarget} from '@wonderlandengine/components';
import {AudioSource} from '@wonderlandengine/spatial-audio';

/**
 * Helper function to trigger haptic feedback pulse.
 *
 * @param {Object} object An object with 'input' component attached
 * @param {number} strength Strength from 0.0 - 1.0
 * @param {number} duration Duration in milliseconds
 */
export function hapticFeedback(object, strength, duration) {
    const input = object.getComponent(InputComponent);
    if (input && input.xrInputSource) {
        const gamepad = input.xrInputSource.gamepad;
        if (gamepad && gamepad.hapticActuators)
            for (const haptic of gamepad.hapticActuators)
                haptic.pulse(strength, duration);
    }
}

/**
 * Button component.
 *
 * Shows a 'hoverMaterial' on cursor hover, moves backward on cursor down,
 * returns to its position on cursor up, plays click/unclick sounds and haptic
 * feedback on hover.
 *
 * Use `target.onClick.add(() => {})` on the `cursor-target` component used
 * with the button to define the button's action.
 *
 * Supports interaction with `finger-cursor` component for hand tracking.
 */
export class ButtonComponent extends Component {
    static TypeName = 'button';

    static Properties = {
        /** Object that has the button's mesh attached */
        buttonMeshObject: Property.object(),
        /** Material to apply when the user hovers the button */
        hoverMaterial: Property.material(),
    };

    static onRegister(engine) {
        engine.registerComponent(AudioSource);
        engine.registerComponent(CursorTarget);
    }

    /* Position to return to when "unpressing" the button */
    returnPos = new Float32Array(3);

    start() {
        if (!this.buttonMeshObject) {
            console.error(
                'button.js: Please assign the mesh object for the button in the properties.',
            );
            return;
        }

        const meshComponent = this.buttonMeshObject.getComponent(MeshComponent);
        if (!meshComponent) {
            console.warn(
                'button.js: Assigned button mesh object has no mesh component.',
            );
            return;
        }

        this.mesh = meshComponent;
        this.defaultMaterial = this.mesh.material;
        this.buttonMeshObject.getTranslationLocal(this.returnPos);

        this.target =
            this.object.getComponent(CursorTarget) ||
            this.object.addComponent(CursorTarget);

        this.soundClick = this.object.addComponent(AudioSource, {
            src: 'sfx/click.wav',
            hrtf: true,
        });
        this.soundUnClick = this.object.addComponent(AudioSource, {
            src: 'sfx/unclick.wav',
            hrtf: true,
        });
    }

    onActivate() {
        this.target.onHover.add(this.onHover);
        this.target.onUnhover.add(this.onUnhover);
        this.target.onDown.add(this.onDown);
        this.target.onUp.add(this.onUp);
    }

    onDeactivate() {
        this.target.onHover.remove(this.onHover);
        this.target.onUnhover.remove(this.onUnhover);
        this.target.onDown.remove(this.onDown);
        this.target.onUp.remove(this.onUp);
    }

    /* Called by 'cursor-target' */
    onHover = (_, cursor) => {
        this.mesh.material = this.hoverMaterial;
        hapticFeedback(cursor.object, 0.3, 40);
    };

    /* Called by 'cursor-target' */
    onDown = (_, cursor) => {
        this.buttonMeshObject.translateLocal([0.0, -0.1, 0.0]);
        this.soundClick.play();
        hapticFeedback(cursor.object, 1.0, 20);
    };

    /* Called by 'cursor-target' */
    onUp = (_, cursor) => {
        this.buttonMeshObject.setTranslationLocal(this.returnPos);
        this.soundUnClick.play();
        hapticFeedback(cursor.object, 0.7, 20);
    };

    /* Called by 'cursor-target' */
    onUnhover = (_, cursor) => {
        this.mesh.material = this.defaultMaterial;
        if (cursor.type === 'finger-cursor') {
            this.onUp(_, cursor);
        }

        hapticFeedback(cursor.object, 0.3, 50);
    };
}

