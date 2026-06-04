import * as THREE from "three";
import { Object3D } from "three";
import audioAnalyzer from "../AudioAnalyzer";
import { params } from "../constant/params";
import vertexShader from "../GLSL/Texture/vertexShader.glsl?raw";
import fragmentShader from "../GLSL/Texture/fragmentShader.glsl?raw";

class Monolith extends Object3D {
	constructor(skyColor = 0x0000ff, floorColor = 0x00ff00) {
		super();
		const geometry = new THREE.BoxGeometry(
			params.object.monolith.size.width,
			params.object.monolith.size.height,
			params.object.monolith.size.depth
		);

		this.shaderMaterial = new THREE.ShaderMaterial({
			uniforms: THREE.UniformsUtils.merge([
				THREE.UniformsLib.lights, // ← Ajouter ça
				{
					uSkyPosition: new THREE.Uniform(
						params.object.monolith.size.height
					),
					uColorFloor: new THREE.Uniform(new THREE.Color(floorColor)),
					uColorSky: new THREE.Uniform(new THREE.Color(skyColor)),
				},
			]),
			lights: true, // ← Activer l'éclairage
			fragmentShader: fragmentShader,
			vertexShader: vertexShader,
		});

		this.cubeMaterial = new THREE.MeshPhongMaterial({
			color: 0xffffff,
		});
		this.mesh = new THREE.Mesh(geometry, this.shaderMaterial);
		this.add(this.mesh);

		this.position.set(
			params.object.monolith.position.x,
			params.object.monolith.size.height / 2 +
				params.object.monolith.position.y,
			params.object.monolith.position.z
		);

		this.volume = 0;
		this.kick = false;

		this.cubes = [];
		this.counter = 0;
		this.cubesMaxCount = 8;
		this.cubesMinSize = 0.5;
		this.cubesMaxSize = 1;
		this.cubesMinDepth = 0.25;
		this.cubesMaxDepth = 0.6;

		this.rotationValue = Math.PI / 2;
		this.rotationDestination = null;

		this.rotation.y = Math.PI / 4;
	}

	setColorSky(color) {
		this.mesh.material.uniforms.uColorSky.value.set(color);
	}

	setColorFloor(color) {
		this.mesh.material.uniforms.uColorFloor.value.set(color);
	}

	manageCubes() {
		this.kick = audioAnalyzer.getKick();

		if (this.kick) {
			if (this.counter >= this.cubesMaxCount) {
				this.cubes.forEach((cube) => this.remove(cube));
				this.cubes = [];
				this.counter = 0;
			} else {
				this.counter++;
				const cubeSize =
					Math.random() * (this.cubesMaxSize - this.cubesMinSize) +
					this.cubesMinSize;
				const cubeDepth =
					Math.random() * (this.cubesMaxDepth - this.cubesMinDepth) +
					this.cubesMinDepth;
				const cubeGeometry = new THREE.BoxGeometry(
					cubeSize,
					cubeSize,
					cubeSize
				);

				const cubeMaterial = new THREE.MeshBasicMaterial({
					color: 0xffffff,
				});

				const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

				const offsetX =
					(Math.random() > 0.5 ? 1 : -1) *
					(params.object.monolith.size.width / 2);
				const offsetY =
					(Math.random() - 0.5) * params.object.monolith.size.height;
				const offsetZ =
					(Math.random() > 0.5 ? 1 : -1) *
					(params.object.monolith.size.depth / 2);
				cubeMesh.position.set(
					this.mesh.position.x + offsetX,
					this.mesh.position.y + offsetY,
					this.mesh.position.z + offsetZ
				);

				this.cubes.push(cubeMesh);
				this.add(cubeMesh);
			}
			// console.log(this.counter);
		}
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
			this.manageCubes();
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
