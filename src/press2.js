import * as THREE from "three";
import { init } from "./init";

// setup
require("./setup");
require("./init");

const clock = new THREE.Clock();
let { world, camera, scene, renderer } = init();

// animate
renderer.setAnimationLoop(render);

function render() {
    const delta = clock.getDelta();
    const elapsedTime = clock.elapsedTime;
    renderer.xr.updateCamera(camera);
    world.execute(delta, elapsedTime);
    renderer.render(scene, camera);
}
