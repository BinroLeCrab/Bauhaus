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
		this.material = new THREE.ShaderMaterial({
			uniforms: {
				// uMap: new THREE.Uniform(),
				// uSize: new THREE.Uniform(2),
				// uTime : new THREE.Uniform(0),
				uSkyPosition: new THREE.Uniform(
					params.object.monolith.size.height
				),
				uColorFloor: new THREE.Uniform(new THREE.Color(floorColor)),
				uColorSky: new THREE.Uniform(new THREE.Color(skyColor)),
			},
			// side: THREE.DoubleSide,
			fragmentShader: fragmentShader,
			vertexShader: vertexShader,
		});
		this.mesh = new THREE.Mesh(geometry, this.material);
		this.add(this.mesh);

		this.mesh.position.set(
			params.object.monolith.position.x,
			params.object.monolith.size.height / 2 +
				params.object.monolith.position.y,
			params.object.monolith.position.z
		);

		this.volume = 0;
		this.kick = false;

		this.cubes = [];
		this.counter = 0;
		this.cubesMaxCount = 4;
		this.cubesMinSize = 0.5;
		this.cubesMaxSize = 1;
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
				this.cubes = [];
				this.children = [this.mesh];
				this.counter = 0;
			} else {
				this.counter++;
				const cubeSize = Math.random() * (this.cubesMaxSize - this.cubesMinSize) + this.cubesMinSize;
				const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
				const cubeMesh = new THREE.Mesh(cubeGeometry, this.material);
				const offsetX = (Math.random() - 0.5) * params.object.monolith.size.width;
				const offsetY = (Math.random() - 0.5) * params.object.monolith.size.height;
				const offsetZ = (Math.random() - 0.5) * params.object.monolith.size.depth;
				cubeMesh.position.set(
					this.mesh.position.x + offsetX,
					this.mesh.position.y + offsetY,
					this.mesh.position.z + offsetZ
				);
				this.cubes.push(cubeMesh);
				this.add(cubeMesh);
			}
			console.log(this.counter);
		}
	}

	tick = (time) => {
		if (params.object.monolith.animation) {
			this.manageCubes();

			this.volume = audioAnalyzer.volume;
			const scale = Math.max(
				1 + params.object.monolith.scaleVolume * this.volume,
				1.1
			);
			this.mesh.scale.set(scale, scale, scale);
		}
	};
}

export default Monolith;
