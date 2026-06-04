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
		const material = new THREE.ShaderMaterial({
			uniforms: {
				// uMap: new THREE.Uniform(),
				// uSize: new THREE.Uniform(2),
				// uTime : new THREE.Uniform(0),
				uSkyPosition: new THREE.Uniform(params.object.monolith.size.height),
				uColorFloor: new THREE.Uniform(new THREE.Color(floorColor)),
				uColorSky: new THREE.Uniform(new THREE.Color(skyColor)),
			},
			// side: THREE.DoubleSide,
			fragmentShader: fragmentShader,
			vertexShader: vertexShader,
		});
		this.mesh = new THREE.Mesh(geometry, material);
		this.add(this.mesh);

		this.mesh.position.set(
			params.object.monolith.position.x,
			params.object.monolith.size.height / 2 +
				params.object.monolith.position.y,
			params.object.monolith.position.z
		);

		this.volume = 0;
	}

	tick = (time) => {
		if (params.object.monolith.animation) {
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
