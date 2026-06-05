import Stats from "three/examples/jsm/libs/stats.module.js";
import Scene from "./Scene.js";
import * as THREE from "three";
import { params } from "../constant/params.js";
import sharedRender from "../Render.js";
import vertexShader from "../GLSL/Transition/vertexShader.glsl?raw";
import fragmentShader from "../GLSL/Transition/fragmentShader.glsl?raw";
import Analyzer from "../../sounds/Analyzer.js";
import { HalftonePass, RenderPass } from "three/examples/jsm/Addons.js";
import audioAnalyzer from "../AudioAnalyzer.js";
import cubeManager from "../Object/CubeManager.js";
import bandManager from "../Object/BandManager.js";

class ViewingScene extends Scene {
	constructor() {
		super(params.sceneView.bgColor, params.sceneView.cubeColor);

		this.transitionCounter = 0;
		this.transitionDuration = 16; // Durée de la transition en secondes
		this.transitionStep = 'bass'; // 'bass' ou 'high'
	}

	addObject() {
		// const light = new THREE.DirectionalLight(0xffffff, 1);
		// light.position.set(0, 0, 1);
		// this.scene.add(light);

		this.shadersMaterial = new THREE.ShaderMaterial({
			uniforms: {
				// uMap: new THREE.Uniform(),
				// uSize: new THREE.Uniform(2),
				// uTime : new THREE.Uniform(0),
				uAudioFrequency: new THREE.Uniform(0),
				uTextureBass: { value: sharedRender.renderBass.texture },
				uTextureHigh: { value: sharedRender.renderHigh.texture },
				uAspectRatio: new THREE.Uniform(this.width / this.height),
			},
			// side: THREE.DoubleSide,
			fragmentShader: fragmentShader,
			vertexShader: vertexShader,
		});

		const geometry = new THREE.PlaneGeometry(this.width, this.height);
		const material = new THREE.MeshBasicMaterial({
			map: sharedRender.renderBass.texture,
		});
		const plane = new THREE.Mesh(geometry, this.shadersMaterial);
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

	setupPostProcessing() {
		const renderPass = new RenderPass(this.scene, this.camera);

		this.halftonePass = new HalftonePass(params.halftone);
		sharedRender.composer.addPass(renderPass);
		sharedRender.composer.addPass(this.halftonePass);
	}

	render() {
		sharedRender.composer.render();
	}

	setupStats() {
		this.stats = new Stats();
		document.body.appendChild(this.stats.dom);
	}

	setupControls() {
		this.controls = null;
	}

	init() {
		// this.setupStats();
		audioAnalyzer.init();
		this.setupPostProcessing();
		sharedRender.addScene(this);
	}

	onResize = () => {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();
		this.shadersMaterial.uniforms.uAspectRatio.value = this.width / this.height;
	};

	manageTransition() {
		if (audioAnalyzer.getKickHard()) {
			this.transitionCounter += 1;
			// console.log("Kick detected! Transition counter:", this.transitionCounter);

			if (this.transitionCounter >= this.transitionDuration) {
				this.transitionStep = this.transitionStep === 'bass' ? 'high' : 'bass';
				this.transitionCounter = 0;
				// console.log("Transition step changed to:", this.transitionStep);
			}
		}
		this.shadersMaterial.uniforms.uAudioFrequency.value = audioAnalyzer.getFrequencyBalance(this.transitionStep);
	}

	tick(time) {
		// this.stats.begin();
		if (audioAnalyzer.useAudio) {

			bandManager.tick();

			if (audioAnalyzer.getKick()) {
				cubeManager.onKick();
			}
			this.manageTransition();

			this.shadersMaterial.uniforms.uAspectRatio.value = this.width / this.height;
		} else {
			this.shadersMaterial.uniforms.uAudioFrequency.value =
				params.audio.frequency;
		}
		this.render();
		// this.stats.end();
	}
}

export default ViewingScene;
