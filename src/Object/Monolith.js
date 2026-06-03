import * as THREE from "three";
import { Object3D } from "three";
import audioAnalyzer from "../AudioAnalyzer";

class Monolith extends Object3D {
    constructor( color = 0x00ff00 ) {
        super();
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: color });
        this.mesh = new THREE.Mesh(geometry, material);
        this.add(this.mesh);

        this.volume = 0;
    }

    tick = (time) => {
        this.volume = audioAnalyzer.volume;
        const scale = Math.max(1 + 1 * this.volume, 1.1);
        this.mesh.scale.set(1, scale, 1);
    }
}

export default Monolith;