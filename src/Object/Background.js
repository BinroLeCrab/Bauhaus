import * as THREE from "three";
import { Object3D } from "three";

class Background extends Object3D {
	constructor(camera, skyColor = 0x0000ff) {
		super();
		this.camera = camera;
		this.distance = 100; // Distance du plane devant la caméra
		this.width = 1;
		this.height = 1;
		this.drawOY = 0.115;
		this.drawingWidth = 0.022;
		this.drawingHeight = 0.022;

		this.shape = [];

		// Créer le plane (les dimensions seront mises à jour dans tick)
		const geometry = new THREE.PlaneGeometry(1, 1);
		const material = new THREE.MeshBasicMaterial({
			color: skyColor,
		});
		this.plane = new THREE.Mesh(geometry, material);
		this.add(this.plane);

		// this.addShape();

		this.synchronizeWithCamera();

		window.addEventListener("resize", this.synchronizeWithCamera);
	}

	addShape() {
		// Créer une forme aléatoire
		const geometry = new THREE.PlaneGeometry(this.drawingWidth * 0.5, this.drawingHeight * 0.5);
		const material = new THREE.MeshBasicMaterial({
			color: 0x00ffff,
		});
		const shape = new THREE.Mesh(geometry, material);
		shape.position.z = 0.1; // Placer légèrement devant le plane
		shape.position.y = this.drawOY;
		this.shape.push(shape);
		this.add(shape);
	}

	synchronizeWithCamera() {
		// Synchroniser position avec caméra
		this.position.copy(this.camera.position);
		this.position.z -= this.distance;
		// Adapter la taille du plane à la vue orthographic
		this.width = this.camera.right - this.camera.left;
		this.height = this.camera.top - this.camera.bottom;
		this.scale.set(this.width, this.height, 1);
		// S'assurer que le plane regarde la caméra
		this.lookAt(this.camera.position);
	}

	setSkyColor(color) {
		this.plane.material.color.set(color);
	}

	tick = () => {
		// this.synchronizeWithCamera();
	};
}

export default Background;
