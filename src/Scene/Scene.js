import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { params } from "../constant/params";
import sharedRender from "../Render";

class Scene {
	constructor(bgColor = 0x000000, cubeColor = 0x00ff00) {
		this.bgColor = bgColor;
		this.cubeColor = cubeColor;
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.setupScene();
		this.setupCamera();
		this.addObject();
		this.setupControls();
        window.addEventListener("resize", this.onResize);
	}

	init() {
        console.log("Initializing scene...");
		sharedRender.addScene(this);
	}

	setupScene() {
		this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.bgColor);
	}

	setupCamera() {
		this.camera = new THREE.PerspectiveCamera(
			params.camera.fov,
			this.width / this.height,
			params.camera.near,
			params.camera.far
		);

		this.camera.position.z = 5;
	}

	setupControls() {
		this.controls = new OrbitControls(this.camera, sharedRender.renderer.domElement);
	}

	addObject() {
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({ color: this.cubeColor });
		this.cube = new THREE.Mesh(geometry, material);
		this.scene.add(this.cube);
	}

	render() {
        console.log("rendering scene");
		sharedRender.renderer.render(this.scene, this.camera);
	}

	tick = (time) => {
        this.cube.rotation.x = time / 2000;
		this.render();
	};

	onResize = () => {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();
	};
}

export default Scene;
