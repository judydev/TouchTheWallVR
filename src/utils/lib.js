// functions from three.js library
import * as THREE from "three";

export function makeButtonMesh(x, y, z, color) {
    const geometry = new THREE.BoxGeometry(x, y, z);
    const material = new THREE.MeshPhongMaterial({ color: color });
    const buttonMesh = new THREE.Mesh(geometry, material);
    buttonMesh.castShadow = true;
    buttonMesh.receiveShadow = true;
    return buttonMesh;
}
