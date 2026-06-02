import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";

class Scene {
	constructor(bgColor = 0x000000, cubeColor = 0x00ff00) {
		this.bgColor = bgColor;
		this.cubeColor = cubeColor;
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.setupScene();
		this.setupCamera();
		this.setupRenderer();
		this.addCube();
		this.setupControls();
		window.addEventListener("resize", this.onResize);
	}

	init() {
		this.setupStats();
		this.renderer.setAnimationLoop(this.tick);
	}

	setupScene() {
		this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.bgColor);
	}

	setupCamera() {
		this.camera = new THREE.PerspectiveCamera(
			75,
			this.width / this.height,
			0.1,
			1000
		);

		this.camera.position.z = 5;
	}

	setupControls() {
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
	}

	setupRenderer() {
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(this.width, this.height);
		document.body.appendChild(this.renderer.domElement);
	}

	addCube() {
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({ color: this.cubeColor });
		this.cube = new THREE.Mesh(geometry, material);
		this.scene.add(this.cube);
	}

	setupStats() {
		this.stats = new Stats();
		document.body.appendChild(this.stats.dom);
	}

	render() {
		this.renderer.render(this.scene, this.camera);
	}

	tick = (time) => {
		this.stats.begin();
		this.render();
		this.stats.end();
	};

	onResize = () => {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.renderer.setSize(this.width, this.height);
		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();
	};
}

export default Scene;
