import Stats from "three/examples/jsm/libs/stats.module.js";
import Scene from "./Scene.js";
import * as THREE from "three";
import { params } from "../constant/params.js";
import sharedRender from "../Render.js";
import vertexShader from '../GLSL/Transition/vertexShader.glsl?raw';
import fragmentShader from '../GLSL/Transition/fragmentShader.glsl?raw';

class ViewingScene extends Scene {
	constructor() {
		super(params.sceneView.bgColor, params.sceneView.cubeColor);
	}

	addObject() {
		// const light = new THREE.DirectionalLight(0xffffff, 1);
		// light.position.set(0, 0, 1);
		// this.scene.add(light);
		// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		// this.scene.add(ambientLight);

		const shadersMaterial = new THREE.ShaderMaterial({
            uniforms: {
                // uMap: new THREE.Uniform(),
                // uSize: new THREE.Uniform(2),
                // uTime : new THREE.Uniform(0),
                // uAudioFrequency: new THREE.Uniform(0),
                // uFreqAigu: new THREE.Uniform(0),
                uTextureBass: { value: sharedRender.renderBass.texture },
                uTextureHigh: { value: sharedRender.renderHigh.texture },
            },
            // side: THREE.DoubleSide,
            fragmentShader: fragmentShader,
            vertexShader: vertexShader,
        });

		const geometry = new THREE.PlaneGeometry(this.width, this.height);
		const material = new THREE.MeshBasicMaterial({
			map: sharedRender.renderBass.texture,
		});
		const plane = new THREE.Mesh(geometry, shadersMaterial);
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
		sharedRender.addScene(this);
	}

	tick = (time) => {
		this.stats.begin();

		this.render();
		this.stats.end();
	};
}

export default ViewingScene;
