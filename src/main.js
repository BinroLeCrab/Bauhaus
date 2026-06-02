import { Pane } from "tweakpane";
import Scene from "./Scene/Scene";
import ViewingScene from "./Scene/ViewingScene";
import { params } from "./constant/params";
import sharedRender from "./Render";
import SceneBass from "./Scene/SceneBass";


sharedRender.init();
sharedRender.startAnimationLoop();

const sceneBass = new SceneBass();
sceneBass.init();

const viewingScene = new ViewingScene();
viewingScene.init();

// const scene = new Scene(params.sceneView.bgColor, params.sceneView.cubeColor);
// scene.init();

// --
let pane = new Pane();

pane.addBinding(params.sceneView, "bgColor", { view: "color" }).on("change", () => {
	viewingScene.scene.background.set(params.sceneView.bgColor);
});

pane.addBinding(params.sceneView, "cubeColor", { view: "color" }).on("change", () => {
	viewingScene.cube.material.color.set(params.sceneView.cubeColor);
});

pane.addBinding(params.camera, "fov", { min: 1, max: 180 }).on("change", () => {
	viewingScene.camera.fov = params.camera.fov;
	viewingScene.camera.updateProjectionMatrix();
});

pane.addBinding(params.camera, "near", { min: 0.1, max: 100 }).on(
	"change",
	() => {
		viewingScene.camera.near = params.camera.near;
		viewingScene.camera.updateProjectionMatrix();
	}
);

pane.addBinding(params.camera, "far", { min: 100, max: 2000 }).on(
	"change",
	() => {
		viewingScene.camera.far = params.camera.far;
		viewingScene.camera.updateProjectionMatrix();
	}
);
