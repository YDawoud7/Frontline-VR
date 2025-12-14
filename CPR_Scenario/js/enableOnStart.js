import {Component, Property} from '@wonderlandengine/api';
import { enable } from './utils';

/**
 * enableOnStart
 */
export class EnableOnStart extends Component {
    static TypeName = 'enableOnStart';
    /* Properties that are configurable in the editor */
    static Properties = {
    };

    init() {
        setTimeout(() => enable(this.object), 0);
    }
}
