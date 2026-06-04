import { params } from "../constant/params.js";
import sharedRender from "../Render.js";
import Scene from "./Scene.js";
import * as THREE from "three";

class SceneBass extends Scene {
	constructor() {
		super(params.sceneBass.bgColor, params.sceneBass.skyColor, params.sceneBass.floorColor);
		this.renderTarget = new THREE.WebGLRenderTarget(
			this.width,
			this.height
		);
	}

	render() {
		// console.log("rendering bass");
		sharedRender.renderer.setRenderTarget(sharedRender.renderBass);
		sharedRender.renderer.render(this.scene, this.camera);
		sharedRender.renderer.setRenderTarget(null);
	}

	tick(time) {
		super.tick(time);
	};
}

// const sceneBass = new SceneBass();
// sceneBass.init();
export default SceneBass;
