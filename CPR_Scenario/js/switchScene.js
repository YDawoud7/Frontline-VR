import {Component, Property} from '@wonderlandengine/api';
import { disable } from './utils';

/**
 * switchScene
 */
export class SwitchScene extends Component {
    static TypeName = 'switchScene';
    /* Properties that are configurable in the editor */
    static Properties = {
        bin: Property.string(),
    };

    init() {
        const target = this.object.getComponent('cursor-target');
        target.addClickFunction(this.switchScene.bind(this));
    }


    switchScene() {
        this.engine.loadMainScene(this.bin);
    }
}
