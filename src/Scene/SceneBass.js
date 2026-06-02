import { params } from "../constant/params.js";
import sharedRender from "../Render.js";
import Scene from "./Scene.js";
import * as THREE from "three";

class SceneBass extends Scene {
	constructor() {
		super(params.sceneBass.bgColor, params.sceneBass.cubeColor);
		this.renderTarget = new THREE.WebGLRenderTarget(
			this.width,
			this.height
		);
	}

	render() {
		console.log("rendering bass");
		sharedRender.renderer.setRenderTarget(sharedRender.renderBass);
		sharedRender.renderer.render(this.scene, this.camera);
		sharedRender.renderer.setRenderTarget(null);
	}

	tick = (time) => {
		this.cube.rotation.x = time / 2000;
		this.render();
		console.log("SceneBass rendering..."); // Pour voir si ça rend
	};
}

// const sceneBass = new SceneBass();
// sceneBass.init();
export default SceneBass;
