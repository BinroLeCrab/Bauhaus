import { params } from "../constant/params.js";
import sharedRender from "../Render.js";
import Scene from "./Scene.js";
import * as THREE from "three";

class SceneHigh extends Scene {
	constructor() {
		super(params.sceneHigh.bgColor, params.sceneHigh.skyColor, params.sceneHigh.floorColor, params.sceneHigh.cubeColor, params.sceneHigh.secondaryColor);
		this.renderTarget = new THREE.WebGLRenderTarget(
			this.width,
			this.height
		);
	}

	render() {
		// console.log("rendering high");
		sharedRender.renderer.setRenderTarget(sharedRender.renderHigh);
		sharedRender.renderer.render(this.scene, this.camera);
		sharedRender.renderer.setRenderTarget(null);
	}

	tick(time) {
		super.tick(time);
	};
}

// const sceneHigh = new SceneHigh();
// sceneHigh.init();
export default SceneHigh;
