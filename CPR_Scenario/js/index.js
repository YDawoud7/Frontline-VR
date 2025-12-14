/**
 * /!\ This file is auto-generated.
 *
 * This is the entry point of your standalone application.
 *
 * There are multiple tags used by the editor to inject code automatically:
 *     - `wle:auto-imports:start` and `wle:auto-imports:end`: The list of import statements
 *     - `wle:auto-register:start` and `wle:auto-register:end`: The list of component to register
 */

/* wle:auto-imports:start */
import {AudioListener} from '@wonderlandengine/components';
import {AudioSource} from '@wonderlandengine/components';
import {Cursor} from '@wonderlandengine/components';
import {CursorTarget} from '@wonderlandengine/components';
import {FingerCursor} from '@wonderlandengine/components';
import {HandTracking} from '@wonderlandengine/components';
import {MouseLookComponent} from '@wonderlandengine/components';
import {PlayerHeight} from '@wonderlandengine/components';
import {TeleportComponent} from '@wonderlandengine/components';
import {VrModeActiveSwitch} from '@wonderlandengine/components';
import {ButtonComponent} from './button.js';
import {CheckBreathing} from './checkBreathing.js';
import {CheckPulse} from './checkPulse.js';
import {CheckResponse} from './checkResponse.js';
import {EnableOnStart} from './enableOnStart.js';
import {Getcprd} from './getcprd.js';
import {LookAround} from './lookAround.js';
import {KeyboardMovement} from './movement.js';
import {OptionButton} from './optionButton.js';
import {Options} from './options.js';
import {StartCPRButton} from './startCPRButton.js';
import {SummaryOverlay} from './summaryOverlay.js';
import {SwitchScene} from './switchScene.js';
import {WakeUp} from './wakeUp.js';
import {WalkAndCollapse} from './walkAndCollapse.js';
/* wle:auto-imports:end */

export default function(engine) {
/* wle:auto-register:start */
engine.registerComponent(AudioListener);
engine.registerComponent(AudioSource);
engine.registerComponent(Cursor);
engine.registerComponent(CursorTarget);
engine.registerComponent(FingerCursor);
engine.registerComponent(HandTracking);
engine.registerComponent(MouseLookComponent);
engine.registerComponent(PlayerHeight);
engine.registerComponent(TeleportComponent);
engine.registerComponent(VrModeActiveSwitch);
engine.registerComponent(ButtonComponent);
engine.registerComponent(CheckBreathing);
engine.registerComponent(CheckPulse);
engine.registerComponent(CheckResponse);
engine.registerComponent(EnableOnStart);
engine.registerComponent(Getcprd);
engine.registerComponent(LookAround);
engine.registerComponent(KeyboardMovement);
engine.registerComponent(OptionButton);
engine.registerComponent(Options);
engine.registerComponent(StartCPRButton);
engine.registerComponent(SummaryOverlay);
engine.registerComponent(SwitchScene);
engine.registerComponent(WakeUp);
engine.registerComponent(WalkAndCollapse);
/* wle:auto-register:end */
}
