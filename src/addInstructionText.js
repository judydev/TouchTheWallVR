import { createText } from "three/examples/jsm/webxr/Text2D";
import { HandsInstructionText, Object3D } from "./setup";

export function addInstructionText(world, scene) {
    const instructionText = createText(
        "Press [Start] to start game. When blocks are randomly lit, use both hands to turn them off. ",
        0.04
    );
    instructionText.position.set(0, 1.6, -0.6);
    scene.add(instructionText);

    const exitText = createText("Exiting session...", 0.04);
    exitText.position.set(0, 1.5, -0.6);
    exitText.visible = false;
    scene.add(exitText);

    const itEntity = world.createEntity();
    itEntity.addComponent(HandsInstructionText);
    itEntity.addComponent(Object3D, { object: instructionText });
}
