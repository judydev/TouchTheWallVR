import * as THREE from "three";
import { createText } from "three/examples/jsm/webxr/Text2D";
import {
    Button,
    NeedCalibration,
    Object3D,
    OffsetFromCamera,
    Pressable,
} from "./setup";
import { makeButtonMesh } from "./utils/lib";

export function addButtonConsole(world, scene) {
    const floorGeometry = new THREE.PlaneGeometry(4, 4);
    const floorMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const consoleGeometry = new THREE.BoxGeometry(0.5, 0.12, 0.15);
    const consoleMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
    const consoleMesh = new THREE.Mesh(consoleGeometry, consoleMaterial);
    consoleMesh.position.set(0, 1, -0.3);
    consoleMesh.castShadow = true;
    consoleMesh.receiveShadow = true;
    scene.add(consoleMesh);

    const startButton = makeButtonMesh(0.08, 0.1, 0.08, "green");
    const startButtonText = createText("Start", 0.03);
    startButton.add(startButtonText);
    startButtonText.rotation.x = -Math.PI / 2;
    startButtonText.position.set(0, 0.051, 0);
    startButton.position.set(-0.15, 0.04, 0);
    consoleMesh.add(startButton);

    const pauseButton = makeButtonMesh(0.08, 0.1, 0.08, "yellow");
    const pauseButtonText = createText("Pause", 0.03);
    pauseButton.add(pauseButtonText);
    pauseButtonText.rotation.x = -Math.PI / 2;
    pauseButtonText.position.set(0, 0.051, 0);
    pauseButton.position.set(-0.05, 0.04, 0);
    consoleMesh.add(pauseButton);

    const resetButton = makeButtonMesh(0.08, 0.1, 0.08, 0x355c7d);
    const resetButtonText = createText("Reset", 0.03);
    resetButton.add(resetButtonText);
    resetButtonText.rotation.x = -Math.PI / 2;
    resetButtonText.position.set(0, 0.051, 0);
    resetButton.position.set(0.05, 0.04, 0);
    consoleMesh.add(resetButton);

    const exitButton = makeButtonMesh(0.08, 0.1, 0.08, 0xff0000);
    const exitButtonText = createText("Exit", 0.03);
    exitButton.add(exitButtonText);
    exitButtonText.rotation.x = -Math.PI / 2;
    exitButtonText.position.set(0, 0.051, 0);
    exitButton.position.set(0.15, 0.04, 0);
    consoleMesh.add(exitButton);

    const csEntity = world.createEntity();
    csEntity.addComponent(OffsetFromCamera, { x: 0, y: -0.4, z: -0.3 });
    csEntity.addComponent(NeedCalibration);
    csEntity.addComponent(Object3D, { object: consoleMesh });

    const sbEntity = world.createEntity();
    sbEntity.addComponent(Pressable);
    sbEntity.addComponent(Object3D, { object: startButton });
    const sbAction = function () {
        // start button action
        // TODO: 3s count down
        // TODO: 1min count down
        // lit random block (2 at the same time)
        // const rand = Math.round(Math.random() * m * n);
        // console.log("rand", rand);
        // console.log(group.getObjectByName("wallblock-" + rand));
        // const obj = group.getObjectByName("wallblock-" + rand);
        // obj.material.color.setHex(0xdaa6ff);
        // setTimeout(() => {
        //     setInterval(() => {
        //         litWallBlock(getRandomWallBlock());
        //     }, 1000);
        // }, 36000);
    };

    sbEntity.addComponent(Button, {
        action: sbAction,
        surfaceY: 0.05,
        fullPressDistance: 0.02,
    });

    const pbEntity = world.createEntity();
    pbEntity.addComponent(Pressable);
    pbEntity.addComponent(Object3D, { object: pauseButton });
    const pbAction = function () {
        // pause button action
    };

    pbEntity.addComponent(Button, {
        action: pbAction,
        surfaceY: 0.05,
        fullPressDistance: 0.02,
    });

    const rbEntity = world.createEntity();
    rbEntity.addComponent(Pressable);
    rbEntity.addComponent(Object3D, { object: resetButton });
    const rbAction = function () {
        // recalibrate
    };

    rbEntity.addComponent(Button, {
        action: rbAction,
        surfaceY: 0.05,
        fullPressDistance: 0.02,
    });

    const ebEntity = world.createEntity();
    ebEntity.addComponent(Pressable);
    ebEntity.addComponent(Object3D, { object: exitButton });
    const ebAction = function () {
        exitText.visible = true;
        setTimeout(function () {
            exitText.visible = false;
            renderer.xr.getSession().end();
        }, 2000);
    };

    ebEntity.addComponent(Button, {
        action: ebAction,
        surfaceY: 0.05,
        recoverySpeed: 0.2,
        fullPressDistance: 0.03,
    });

    return {
        floor,
        consoleMesh,
    };
}
