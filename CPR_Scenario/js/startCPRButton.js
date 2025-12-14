import {Component, Property} from '@wonderlandengine/api';
import { disable } from './utils';

/**
 * startCPRButton
 */
export class StartCPRButton extends Component {
    static TypeName = 'startCPRButton';
    /* Properties that are configurable in the editor */
    static Properties = {
        remy: Property.object(),
    };

    start() {
        // console.log("im here");

        const target = this.object.getComponent('cursor-target');

        target.addClickFunction(this.onClick.bind(this));
    }
    onClick() {
        this.remy.getComponent("walkAndCollapse").startWalking();
        disable(this.object.parent);
    }
}
