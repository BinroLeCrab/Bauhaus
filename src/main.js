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
const pane = new Pane();

const f1 = pane.addFolder({
  title: 'Scene Bass Frequency',
});

f1.addBinding(params.sceneBass, "bgColor", { view: "color" }).on("change", () => {
	sceneBass.scene.background.set(params.sceneBass.bgColor);
});

f1.addBinding(params.sceneBass, "cubeColor", { view: "color" }).on("change", () => {
	sceneBass.cube.material.color.set(params.sceneBass.cubeColor);
});

const f2 = pane.addFolder({
  title: 'Scene High Frequency',
});

f2.addBinding(params.sceneHigh, "bgColor", { view: "color" }).on("change", () => {
	// sceneBass.scene.background.set(params.sceneHigh.bgColor);
});

f2.addBinding(params.sceneHigh, "cubeColor", { view: "color" }).on("change", () => {
	// sceneBass.cube.material.color.set(params.sceneHigh.cubeColor);
});

const f3 = pane.addFolder({
  title: 'Camera',
});

f3.addBinding(params.camera, "fov", { min: 1, max: 180 }).on("change", () => {
	sceneBass.camera.fov = params.camera.fov;
	sceneBass.camera.updateProjectionMatrix();
});

f3.addBinding(params.camera, "near", { min: 0.1, max: 100 }).on(
	"change",
	() => {
		sceneBass.camera.near = params.camera.near;
		sceneBass.camera.updateProjectionMatrix();
	}
);

f3.addBinding(params.camera, "far", { min: 100, max: 2000 }).on(
	"change",
	() => {
		sceneBass.camera.far = params.camera.far;
		sceneBass.camera.updateProjectionMatrix();
	}
);

f3.addBinding(params.camera.position, "x", { min: -10, max: 10 }).on(
  "change",
  () => {
    sceneBass.camera.position.x = params.camera.position.x;
  }
);
f3.addBinding(params.camera.position, "y", { min: -10, max: 10 }).on(
  "change",
  () => {
    sceneBass.camera.position.y = params.camera.position.y;
  }
);
f3.addBinding(params.camera.position, "z", { min: -10, max: 10 }).on(
  "change",
  () => {
    sceneBass.camera.position.z = params.camera.position.z;
  }
);
