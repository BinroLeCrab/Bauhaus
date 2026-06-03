import * as THREE from "three";
import { Object3D } from "three";

class World extends Object3D {
	constructor(color = 0x1e1e1e) {
		super();
		const geometry = new THREE.BoxGeometry(25, 20, 10);
		const material = new THREE.MeshPhongMaterial({
			color: color,
			side: THREE.BackSide,
		});
		this.mesh = new THREE.Mesh(geometry, material);
		this.add(this.mesh);

		const ambientLight = new THREE.AmbientLight(0xffffff, 1);
		this.add(ambientLight);

		const key = new THREE.DirectionalLight(0xffffff, 2.5);
		key.position.set(3, 4, 5);
		this.add(key);

		this.mesh.position.y = 10;
        this.mesh.position.z = 0.5;
	}

    setColor(color) {
        this.mesh.material.color.set(color);
    }
}

export default World;
