import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import { XRControllerModelFactory } from "three/examples/jsm/webxr/XRControllerModelFactory.js";
import { OculusHandModel } from "three/examples/jsm/webxr/OculusHandModel.js";
import { World } from "three/examples/jsm/libs/ecsy.module.js";
import {
    Button,
    ButtonSystem,
    CalibrationSystem,
    FingerInputSystem,
    HandsInstructionText,
    InstructionSystem,
    NeedCalibration,
    Object3D,
    OffsetFromCamera,
    Pressable,
    Rotating,
    RotatingSystem,
} from "./setup";
import { addButtonConsole } from "./addButtonConsole";
import { addInstructionText } from "./addInstructionText";
import { addWallBlocks } from "./addWallBlocks";

export function init() {
    let camera, scene, renderer, controls;
    const world = new World();

    const container = document.createElement("div");
    document.body.appendChild(container);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x444444);

    camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        10
    );
    camera.position.set(0, 1.6, 3);
    controls = new OrbitControls(camera, container);
    controls.target.set(0, 1.6, 0);
    controls.update();

    scene.add(new THREE.HemisphereLight(0x808080, 0x606060));

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 6, 0);
    light.castShadow = true;
    light.shadow.camera.top = 2;
    light.shadow.camera.bottom = -2;
    light.shadow.camera.right = 2;
    light.shadow.camera.left = -2;
    light.shadow.mapSize.set(4096, 4096);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.xr.enabled = true;
    renderer.xr.cameraAutoUpdate = false;

    container.appendChild(renderer.domElement);

    document.body.appendChild(VRButton.createButton(renderer));

    // controllers
    const controller1 = renderer.xr.getController(0);
    scene.add(controller1);

    const controller2 = renderer.xr.getController(1);
    scene.add(controller2);

    const controllerModelFactory = new XRControllerModelFactory();

    // Hand 1
    const controllerGrip1 = renderer.xr.getControllerGrip(0);
    controllerGrip1.add(
        controllerModelFactory.createControllerModel(controllerGrip1)
    );
    scene.add(controllerGrip1);

    const hand1 = renderer.xr.getHand(0);
    const handModel1 = new OculusHandModel(hand1);
    hand1.add(handModel1);
    scene.add(hand1);

    // Hand 2
    const controllerGrip2 = renderer.xr.getControllerGrip(1);
    controllerGrip2.add(
        controllerModelFactory.createControllerModel(controllerGrip2)
    );
    scene.add(controllerGrip2);

    const hand2 = renderer.xr.getHand(1);
    const handModel2 = new OculusHandModel(hand2);
    hand2.add(handModel2);
    scene.add(hand2);

    world
        .registerComponent(Object3D)
        .registerComponent(Button)
        .registerComponent(Pressable)
        .registerComponent(Rotating)
        .registerComponent(HandsInstructionText)
        .registerComponent(OffsetFromCamera)
        .registerComponent(NeedCalibration);

    world
        .registerSystem(RotatingSystem)
        .registerSystem(InstructionSystem, {
            controllers: [controllerGrip1, controllerGrip2],
        })
        .registerSystem(CalibrationSystem, {
            renderer,
            camera,
        })
        .registerSystem(ButtonSystem, { renderer, camera })
        .registerSystem(FingerInputSystem, { hands: [handModel1, handModel2] });

    // add wall blocks
    const { group } = addWallBlocks(scene);
    // setInterval(() => {
    //     litWallBlock(getRandomWallBlock());
    // }, 1000);

    // testing
    // const rand = Math.round(Math.random() * m * n);
    // console.log("rand", rand);
    // console.log(group.getObjectByName("wallblock-" + rand));
    // const obj = group.getObjectByName("wallblock-" + rand);
    // obj.material.color.setHex(0xdaa6ff);

    // add menu buttons
    // const buttonGeometry = new THREE.BoxGeometry(0.3, 0.2, 0.1);
    // let material = new THREE.MeshPhongMaterial({ color: "green" });

    // const startButton = new THREE.Mesh(buttonGeometry, material);
    // startButton.position.set(-1.5, 1.2, -1);
    // const startButtonText = createText("Start", 0.1);
    // startButton.add(startButtonText);
    // startButtonText.position.set(0, 0, 0.05);
    // scene.add(startButton);

    // material = new THREE.MeshPhongMaterial({ color: "yellow" });
    // const pauseButton = new THREE.Mesh(buttonGeometry, material);
    // pauseButton.position.set(-1.5, 0.9, -1);
    // const pauseButtonText = createText("Pause", 0.1);
    // pauseButton.add(pauseButtonText);
    // pauseButtonText.position.set(0, 0, 0.05);
    // scene.add(pauseButton);

    // material = new THREE.MeshPhongMaterial({ color: "red" });
    // const stopButton = new THREE.Mesh(buttonGeometry, material);
    // stopButton.position.set(-1.5, 0.6, -1);
    // const stopButtonText = createText("Stop", 0.1);
    // stopButton.add(stopButtonText);
    // stopButtonText.position.set(0, 0, 0.05);
    // scene.add(stopButton);

    // buttons
    addButtonConsole(world, scene);
    addInstructionText(world, scene);

    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize);

    return {
        world,
        camera,
        scene,
        renderer,
    };
}
