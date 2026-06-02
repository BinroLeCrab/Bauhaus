import { Pane } from "tweakpane";
import Scene from "./Scene/Scene";

const params = {
    bgColor: 0x750e0e,
    cubeColor: 0xe23d3d,
    camera: {
        fov: 75,
        near: 0.1,
        far: 1000
    },
}

const scene = new Scene(params.bgColor, params.cubeColor);
scene.init();

// -- 
let pane = new Pane();

pane.addBinding(params, "bgColor", { view: "color" }).on("change", () => {
    scene.scene.background.set(params.bgColor);
});

pane.addBinding(params, "cubeColor", { view: "color" }).on("change", () => {
    scene.cube.material.color.set(params.cubeColor);
});

pane.addBinding(params.camera, "fov", { min: 1, max: 180 }).on("change", () => {
    scene.camera.fov = params.camera.fov;
    scene.camera.updateProjectionMatrix();
});

pane.addBinding(params.camera, "near", { min: 0.1, max: 100 }).on("change", () => {
    scene.camera.near = params.camera.near;
    scene.camera.updateProjectionMatrix();
});

pane.addBinding(params.camera, "far", { min: 100, max: 2000 }).on("change", () => {
    scene.camera.far = params.camera.far;
    scene.camera.updateProjectionMatrix();
});