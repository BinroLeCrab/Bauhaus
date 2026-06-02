import Stats from "three/examples/jsm/libs/stats.module.js";
import Scene from "./Scene.js";
import * as THREE from "three";
import sceneBass from "./SceneBass.js";
import { params } from "../constant/params.js";

class ViewingScene extends Scene {
	constructor(bgColor, cubeColor) {
		super(bgColor, cubeColor);
	}

	addObject() {
		const light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.set(0, 0, 1);
		this.scene.add(light);
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		this.scene.add(ambientLight);
		const geometry = new THREE.PlaneGeometry(this.width, this.height);

		const material = new THREE.MeshBasicMaterial({
			map: sceneBass.renderTarget.texture,
		});
		const plane = new THREE.Mesh(geometry, material);
		plane.position.z = 1;
		this.scene.add(plane);
	}

	setupCamera() {
		this.camera = new THREE.OrthographicCamera(
			this.width / -2,
			this.width / 2,
			this.height / 2,
			this.height / -2,
			0,
			2000
		);

		this.camera.position.z = 5;
	}

	setupStats() {
		this.stats = new Stats();
		document.body.appendChild(this.stats.dom);
	}

	init() {
		this.setupStats();
		this.renderer.setAnimationLoop(this.tick);
	}

	tick = (time) => {
		this.stats.begin();

		this.render();
		this.stats.end();
	};
}

export default ViewingScene;
