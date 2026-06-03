import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { params } from "../constant/params";
import sharedRender from "../Render";
import Monolith from "../Object/Monolith";
import World from "../Object/World";

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

		this.camera.position.set(
            params.camera.position.x,
            params.camera.position.y,
            params.camera.position.z
        );

		
	}

	setupControls() {
		this.controls = new OrbitControls(this.camera, sharedRender.renderer.domElement);

		this.camera.lookAt(
            params.camera.lookAt.x,
            params.camera.lookAt.y,
            params.camera.lookAt.z
        );

		// this.controls.update();
	}

	addObject() {
		this.world = new World(this.bgColor);
		this.scene.add(this.world);
		this.monolith = new Monolith(this.cubeColor);
		this.scene.add(this.monolith);
	}

	render() {
		sharedRender.renderer.render(this.scene, this.camera);
	}

	tick(time) {
        this.monolith.tick(time);
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
