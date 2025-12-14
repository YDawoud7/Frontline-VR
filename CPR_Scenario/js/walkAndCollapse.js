import { Component, Property } from '@wonderlandengine/api';
import { enable } from './utils';

export class WalkAndCollapse extends Component {
    static TypeName = 'walkAndCollapse';

    static Properties = {
        walkAnim: Property.animation(),   // Animation to play while walking
        walkCount: Property.int(1),       // Number of times to loop the walking animation
        walkSpeed: Property.float(2),     // Speed of walking movement
        optionsPanel: Property.object(),  // Reference to the options panel (used after collapse)
        initDelay: Property.float(5), // temp
    };

    finished = false;

    start() {
        // Get references to the object's animation and options components
        this.anim = this.object.getComponent("animation");
        this.options = this.optionsPanel?.getComponent("options");

        this.collapseAnim = this.anim.animation;   // Save the starting animation (set in editor) as the collapse animation
        this.anim.animation = null;
    }

    startWalking() {
        if (this.anim) {
            this.options.tpToPosition();
            setTimeout(() => {
                this.anim.animation = this.walkAnim;       // Switch to the walking animation
                this.anim.playCount = this.walkCount;      // Play the walk animation a set number of times
                this.anim.play();                  // Start the animation   
            }, 0);
        }
    }

    update(dt) {
        // If currently playing the walking animation
        if (this.anim.animation == null) return;
        if (this.anim.animation == this.walkAnim) {
            // this.head.lookAt(this.object.parent.getPositionWorld());
            // Check if the walk animation finished its set number of loops
            if (this.anim.iteration > this.walkCount - 1) {
                this.anim.animation = this.collapseAnim;  // Switch to collapse animation
                this.anim.playCount = 1;                  // Play it once
                this.anim.play();
                return;
            }

            // Get the parent's forward direction in world space
            const forward = [0, 0, 0];
            this.object.parent.getForwardWorld(forward);

            // Move the parent object forward (relative to its facing direction)
            this.object.parent.translateWorld([
                -forward[0] * this.walkSpeed * dt,
                0,
                -forward[2] * this.walkSpeed * dt
            ]);
        }

        // If the collapse animation has finished and hasn't been marked complete yet
        else if (!this.finished && this.anim.position == this.collapseAnim.duration) {
            this.finished = true;
            enable(this.optionsPanel);
            this.options.enable();
        }
    }
}
