import {Component, Property} from '@wonderlandengine/api';

/**
 * wakeUp
 */
export class WakeUp extends Component {
    static TypeName = 'wakeUp';
    /* Properties that are configurable in the editor */

    static Properties = {
        // wakeAnim: Property.animation(),
        wakeAnimContainer: Property.object(),
        playerHead: Property.object(),
        player: Property.object(),
        options: Property.object(),
    };

    wakeUp() {
        // this.player.setPositionWorld([2.3205652236938477, 0, 2.514319896697998]);
        this.player.setPositionWorld(this.options.getComponent("options").getStartPos());
        this.playerHead.lookAt(this.object.parent.getPositionWorld());

        this.anim = this.object.getComponent("animation");
        // this.anim.animation = this.wakeAnim;
        this.anim.animation = this.wakeAnimContainer.getComponent("animation").animation;
        this.anim.playCount = 1;
        this.anim.play();
    }
}
