import * as THREE from "three";

const m = 5;
const n = 4;
const group = new THREE.Group();
const Color = {
    WALLBLOCK: 0x333333,
};

export function addWallBlocks(scene) {
    scene.add(group);
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.1);
            const material = new THREE.MeshStandardMaterial({
                color: Color.WALLBLOCK,
                roughness: 0.7,
                metalness: 0.0,
            });

            const object = new THREE.Mesh(geometry, material);
            object.position.set(-1 + 0.55 * i, 0.28 + 0.55 * j, -1);
            object.name = "wallblock-" + (i * n + j);

            object.castShadow = true;
            object.receiveShadow = true;

            group.add(object);
        }
    }

    return { group };
}

export function getRandomWallBlock() {
    const rand = Math.floor(Math.random() * m * n);
    return group.getObjectByName("wallblock-" + rand);
}

let prevBlock = null;
export function litWallBlock() {
    const obj = getRandomWallBlock();
    obj.material.color.setHex(getRandomColor());
    if (prevBlock) {
        prevBlock.material.color.setHex(Color.WALLBLOCK);
    }
    prevBlock = obj;
}

const highlightColors = [
    0xf05228, 0xdaa6ff, 0x3399ff, 0xd3ffce, 0x006666, 0xfdade9, 0xcbcef9,
    0x00cd00, 0xeeffee, 0x54ff9f, 0x859c27, 0x87ceff, 0x97ffff, 0xdaa520,
    0xd9d919,
];

function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * highlightColors.length);
    console.log("index", randomIndex);
    return highlightColors[randomIndex];
}
