import { Pane } from "tweakpane";
import Scene from "./Scene/Scene";
import ViewingScene from "./Scene/ViewingScene";
import { params } from "./constant/params";
import sharedRender from "./Render";
import SceneBass from "./Scene/SceneBass";
import SceneHigh from "./Scene/SceneHigh";


sharedRender.init();
sharedRender.startAnimationLoop();

const sceneBass = new SceneBass();
sceneBass.init();

const sceneHigh = new SceneHigh();
sceneHigh.init();

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
	sceneHigh.scene.background.set(params.sceneHigh.bgColor);
});

f2.addBinding(params.sceneHigh, "cubeColor", { view: "color" }).on("change", () => {
	sceneHigh.cube.material.color.set(params.sceneHigh.cubeColor);
});

const f3 = pane.addFolder({
  title: 'Camera',
});

f3.addBinding(params.camera, "fov", { min: 1, max: 180 }).on("change", () => {
	sceneBass.camera.fov = params.camera.fov;
	sceneBass.camera.updateProjectionMatrix();
  sceneHigh.camera.fov = params.camera.fov;
  sceneHigh.camera.updateProjectionMatrix();
});

f3.addBinding(params.camera, "near", { min: 0.1, max: 100 }).on(
	"change",
	() => {
		sceneBass.camera.near = params.camera.near;
		sceneBass.camera.updateProjectionMatrix();
    sceneHigh.camera.near = params.camera.near;
    sceneHigh.camera.updateProjectionMatrix();
	}
);

f3.addBinding(params.camera, "far", { min: 100, max: 2000 }).on(
	"change",
	() => {
		sceneBass.camera.far = params.camera.far;
		sceneBass.camera.updateProjectionMatrix();
    sceneHigh.camera.far = params.camera.far;
    sceneHigh.camera.updateProjectionMatrix();
	}
);

f3.addBinding(params.camera.position, "x", { min: -10, max: 10 }).on(
  "change",
  () => {
    sceneBass.camera.position.x = params.camera.position.x;
    sceneHigh.camera.position.x = params.camera.position.x;
  }
);
f3.addBinding(params.camera.position, "y", { min: -10, max: 10 }).on(
  "change",
  () => {
    sceneBass.camera.position.y = params.camera.position.y;
    sceneHigh.camera.position.y = params.camera.position.y;
  }
);
f3.addBinding(params.camera.position, "z", { min: -10, max: 10 }).on(
  "change",
  () => {
    sceneBass.camera.position.z = params.camera.position.z;
    sceneHigh.camera.position.z = params.camera.position.z;
  }
);

const f4 = pane.addFolder({
  title: 'Audio',
});

f4.addBinding(params.audio, "frequency", { min: 0, max: 1 });
f4.addBinding(params.audio, "cutNumber", { min: 1, max: 255, step: 1 });
f4.addBinding(params.audio, "highBoost", { min: 0, max: 5, step: 0.25 });
f4.addBinding(params.audio, "bassBoost", { min: 0, max: 5, step: 0.25 });
f4.addBinding(viewingScene, "useAudio");