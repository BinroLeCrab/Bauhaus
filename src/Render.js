import * as THREE from "three";

class Render {
	constructor() {}

	init() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.setupRenderer();
		this.setupRenderTarget();
		this.sceneToRender = [];
		window.addEventListener("resize", this.onResize);
	}

	setupRenderer() {
		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			pixelRatio: window.devicePixelRatio, // Meilleure qualité sur écrans Retina
			alpha: true, // Fond transparent
			preserveDrawingBuffer: false, // Performance
		});
		this.renderer.setSize(this.width, this.height);
		document.body.appendChild(this.renderer.domElement);
	}

	setupRenderTarget() {
		this.renderBass = new THREE.WebGLRenderTarget(this.width, this.height);

		this.renderHigh = new THREE.WebGLRenderTarget(this.width, this.height);
	}

	addScene(scene) {
		this.sceneToRender.push(scene);
	}

	startAnimationLoop() {
		this.renderer.setAnimationLoop((time) => {
			this.sceneToRender.forEach((scene) => {
				scene.tick(time);
			});
		});
	}

	onResize = () => {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.renderer.setSize(this.width, this.height);
		this.renderBass.setSize(this.width, this.height);
		this.renderHigh.setSize(this.width, this.height);
	};
}
const sharedRender = new Render();
export default sharedRender;
