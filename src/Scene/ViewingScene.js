import Stats from "three/examples/jsm/libs/stats.module.js";
import Scene from "./Scene.js";
import * as THREE from "three";
import { params } from "../constant/params.js";
import sharedRender from "../Render.js";
import vertexShader from "../GLSL/Transition/vertexShader.glsl?raw";
import fragmentShader from "../GLSL/Transition/fragmentShader.glsl?raw";
import Analyzer from "../../sounds/Analyzer.js";
import { HalftonePass, RenderPass } from "three/examples/jsm/Addons.js";

class ViewingScene extends Scene {
	constructor() {
		super(params.sceneView.bgColor, params.sceneView.cubeColor);
	}

	setupAudio() {
		this.useAudio = false;
		this.audio = new Analyzer();
		this.volume = params.audio.frequency;

		this.frequencyData = [];
		this.frequencyBalance = params.audio.frequency;

		this.audio.onAudio((a) => {
			this.volume = a.volumeSmooth;
			this.frequencyData = a.volumeByFrequency;
		});
	}

	addObject() {
		// const light = new THREE.DirectionalLight(0xffffff, 1);
		// light.position.set(0, 0, 1);
		// this.scene.add(light);
		// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		// this.scene.add(ambientLight);

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
		const params = {
			shape: 1,
			radius: 4,
			rotateR: Math.PI / 12,
			rotateB: (Math.PI / 12) * 2,
			rotateG: (Math.PI / 12) * 3,
			scatter: 0,
			blending: 1,
			blendingMode: 1,
			greyscale: false,
			disable: false,
		};
		this.halftonePass = new HalftonePass(params);
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
		this.setupStats();
		this.setupAudio();
		this.setupPostProcessing();
		sharedRender.addScene(this);
	}

	onResize = () => {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();
		this.shadersMaterial.uniforms.uAspectRatio.value =
			this.width / this.height;
	};

	calculFrequencyValue() {
		if (this.frequencyData) {
			const bassFrequency = this.frequencyData.slice(
				0,
				params.audio.cutNumber
			);
			const highFrequency = this.frequencyData.slice(
				params.audio.cutNumber
			);

			const bassAverage =
				(bassFrequency.reduce((a, b) => a + b, 0) /
					bassFrequency.length) *
				params.audio.bassBoost;
			const highAverage =
				(highFrequency.reduce((a, b) => a + b, 0) /
					highFrequency.length) *
				params.audio.highBoost;

			if (highAverage > bassAverage) {
				this.frequencyBalance = bassAverage / highAverage;
			} else {
				this.frequencyBalance = highAverage / bassAverage;
			}

			console.log(
				"Bass Average:",
				bassAverage.toFixed(2),
				"High Average:",
				highAverage.toFixed(2),
				"Frequency Balance:",
				this.frequencyBalance.toFixed(2)
			);

			this.shadersMaterial.uniforms.uAudioFrequency.value =
				this.frequencyBalance;
		}
	}

	tick = (time) => {
		this.stats.begin();
		if (this.useAudio) {
			this.calculFrequencyValue();
		} else {
			this.shadersMaterial.uniforms.uAudioFrequency.value =
				params.audio.frequency;
		}
		this.render();
		this.stats.end();
	};
}

export default ViewingScene;
