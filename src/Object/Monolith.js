import * as THREE from "three";
import { Object3D } from "three";
import audioAnalyzer from "../AudioAnalyzer";
import { params } from "../constant/params";
import vertexShader from "../GLSL/Texture/vertexShader.glsl?raw";
import fragmentShader from "../GLSL/Texture/fragmentShader.glsl?raw";
import cubeManager from "./CubeManager";

class Monolith extends Object3D {
	constructor(
		skyColor = 0x0000ff,
		floorColor = 0x00ff00,
		secondaryColor = []
	) {
		super();

		this.skyColor = skyColor;
		this.floorColor = floorColor;
		this.secondaryColor = secondaryColor;

		this.initMaterial();
		this.createMonolith();
		this.initPosition();

		cubeManager.registerMonolith(this);

		this.cubes = [];
		this.volume = 0;

		this.rotationValue = Math.PI / 2;
		this.rotationDestination = null;

		this.rotation.y = Math.PI / 4;
	}

	initMaterial() {
		this.shaderMaterial = new THREE.ShaderMaterial({
			uniforms: THREE.UniformsUtils.merge([
				THREE.UniformsLib.lights, // ← Ajouter ça
				{
					uSkyPosition: new THREE.Uniform(
						params.object.monolith.size.height
					),
					uColorFloor: new THREE.Uniform(
						new THREE.Color(this.floorColor)
					),
					uColorSky: new THREE.Uniform(
						new THREE.Color(this.skyColor)
					),
				},
			]),
			lights: true, // ← Activer l'éclairage
			fragmentShader: fragmentShader,
			vertexShader: vertexShader,
		});

		this.cubeMaterial = [];

		this.secondaryColor.forEach((color, index) => {
			// this.cubeMaterial[index] = new THREE.ShaderMaterial({
			// 	uniforms: {
			// 		uSkyPosition: new THREE.Uniform(
			// 			params.object.monolith.size.height
			// 		),
			// 		uColorFloor: new THREE.Uniform(
			// 			new THREE.Color(this.floorColor)
			// 		),
			// 		uColorSky: new THREE.Uniform(new THREE.Color(color)),
			// 	},
			// 	fragmentShader: fragmentShader,
			// 	vertexShader: vertexShader,
			// });
			this.cubeMaterial[index] = new THREE.MeshBasicMaterial({
				color: color,
			});
			
		});
	}

	createMonolith() {
		const geometry = new THREE.BoxGeometry(
			params.object.monolith.size.width,
			params.object.monolith.size.height,
			params.object.monolith.size.depth
		);

		this.mesh = new THREE.Mesh(geometry, this.shaderMaterial);
		this.add(this.mesh);
	}

	initPosition() {
		this.position.set(
			params.object.monolith.position.x,
			params.object.monolith.size.height / 2 +
				params.object.monolith.position.y,
			params.object.monolith.position.z
		);
	}

	setColorSky(color) {
		this.mesh.material.uniforms.uColorSky.value.set(color);
	}

	setColorFloor(color) {
		this.mesh.material.uniforms.uColorFloor.value.set(color);
	}

	clearCubes() {
		this.cubes.forEach((cube) => this.remove(cube));
		this.cubes = [];
	}

	addCube(cubeData) {
		const cubeGeometry = new THREE.BoxGeometry(
			cubeData.size.width,
			cubeData.size.height,
			cubeData.size.depth
		);
		
		const cubeMesh = new THREE.Mesh(cubeGeometry, this.cubeMaterial[cubeData.color]);

		cubeMesh.position.set(
			cubeData.position.x,
			cubeData.position.y,
			cubeData.position.z
		);

		this.cubes.push(cubeMesh);
		this.add(cubeMesh);
	}

	rotatation() {
		if (audioAnalyzer.getKick() && this.rotationDestination === null) {
			this.rotationDestination = this.rotation.y + this.rotationValue;
		} else if (this.rotationDestination !== null) {
			const rotationDifference =
				this.rotationDestination - this.rotation.y;

			if (Math.abs(rotationDifference) < 0.01) {
				this.rotation.y = this.rotationDestination;
				this.rotationDestination = null;
			} else {
				this.rotation.y += rotationDifference * 0.1;
			}
		}
	}

	tick = (time) => {
		if (params.object.monolith.animation) {
			// this.manageCubes();
			this.rotatation();

			this.volume = audioAnalyzer.volume;
			const scale = Math.max(
				1 + params.object.monolith.scaleVolume * this.volume,
				1.1
			);
			this.scale.set(scale, scale, scale);
		}
	};
}

export default Monolith;
