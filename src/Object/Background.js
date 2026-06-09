import * as THREE from "three";
import { Object3D } from "three";
import bandManager from "./BandManager";

class Background extends Object3D {
	constructor(camera, skyColor = 0x0000ff, sceneType = 'bass') {
		super();
		this.camera = camera;
		this.distance = 10; // Distance du plane devant la caméra
		this.width = 1;
		this.height = 1;
		this.drawOY = 0;
		this.drawingWidth =  1;
		this.drawingHeight = 1;
		this.sceneType = sceneType;

		this.shape = [];

		// Créer le plane (les dimensions seront mises à jour dans tick)
		const geometry = new THREE.PlaneGeometry(1, 1);
		const material = new THREE.MeshBasicMaterial({
			color: skyColor,
		});
		this.plane = new THREE.Mesh(geometry, material);
		this.add(this.plane);

		// this.addShape();
		bandManager.registerSubscriber(this, this.sceneType);
		this.synchronizeWithCamera();

		// window.addEventListener("resize", this.synchronizeWithCamera);
	}

	addBand(bandMesh) {
		
		if (this.sceneType === 'bass') {
			bandMesh.position.y = this.drawOY;
			bandMesh.position.x = (Math.random() * this.drawingWidth) - this.drawingWidth / 2; // Position aléatoire sur l'axe X
			
			this.add(bandMesh);
		} else if (this.sceneType === 'high') {
			bandMesh.position.y = this.drawOY + ((Math.random() * this.drawingHeight) - this.drawingHeight / 2); // Position aléatoire sur l'axe Y

			this.add(bandMesh);
		}
	}

	synchronizeWithCamera() {
		if (!this.camera) return;
		console.log("Synchronizing background with camera...");
		//! Synchroniser position avec caméra
		// const cameraViewDirection = new THREE.Vector3();
		// this.camera.getWorldDirection(cameraViewDirection);
		// cameraViewDirection.multiplyScalar(this.distance);
		// this.position.copy(this.camera.position).add(cameraViewDirection);
		this.position?.set(
			0,
			5.2,
			-4
		);

		//! Adapter la taille du plane à la vue orthographic
		this.width = (this.camera.right - this.camera.left) / this.camera.zoom;
		this.height = (this.camera.top - this.camera.bottom) / this.camera.zoom;
		this.scale.set(this.width, this.height, 1);

		//! S'assurer que le plane regarde la caméra
		this.lookAt(this.camera.position);
	}

	onResize() {
		console.log(this.camera);
		this.width = window.innerWidth / this.camera.zoom;
		this.height = window.innerHeight / this.camera.zoom;
		this.scale.set(this.width, this.height, 1);
	}

	setSkyColor(color) {
		this.plane.material.color.set(color);
	}

	tick = () => {
		// this.synchronizeWithCamera();
	};
}

export default Background;
