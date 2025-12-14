/**
 * Entry point for your Wonderland Engine app.
 * Registers built-in components and your custom stabbing-scenario components.
 */

import {
    AudioListener,
    Cursor,
    CursorTarget,
    FingerCursor,
    HandTracking,
    MouseLookComponent,
    PlayerHeight,
    TeleportComponent,
    VrModeActiveSwitch,
} from '@wonderlandengine/components';

/* Custom components (our own scripts) */
import {ButtonComponent} from './button.js';
import {OptionButton} from './optionbutton.js';
import {Options} from './options.js';
import {StabSequence} from './stabSequence.js';
import {StabOutcome} from './stab-outcome.js';

export default function(engine) {
    /* Register built-in components */
    engine.registerComponent(AudioListener);
    engine.registerComponent(Cursor);
    engine.registerComponent(CursorTarget);
    engine.registerComponent(FingerCursor);
    engine.registerComponent(HandTracking);
    engine.registerComponent(MouseLookComponent);
    engine.registerComponent(PlayerHeight);
    engine.registerComponent(TeleportComponent);
    engine.registerComponent(VrModeActiveSwitch);

    /* Register our custom components */
    engine.registerComponent(ButtonComponent);
    engine.registerComponent(OptionButton);
    engine.registerComponent(Options);
    engine.registerComponent(StabSequence);
    engine.registerComponent(StabOutcome);
}

