import * as THREE from "three";
import { Object3D } from "three";
import vertexShader from "../GLSL/Texture/vertexShader.glsl?raw";
import fragmentShader from "../GLSL/Texture/fragmentShader.glsl?raw";
import { params } from "../constant/params";

class World extends Object3D {
	constructor(skyColor = 0x0000ff, floorColor = 0x00ff00) {
		super();
		const geometry = new THREE.BoxGeometry(25, 20, 10);
		const material = new THREE.ShaderMaterial({
			uniforms: {
				// uMap: new THREE.Uniform(),
				uColorFloor: new THREE.Uniform(new THREE.Color(floorColor)),
				uColorSky: new THREE.Uniform(new THREE.Color(skyColor)),
				// uSize: new THREE.Uniform(2),
				// uTime : new THREE.Uniform(0),
				uSkyPosition: new THREE.Uniform(15),
			},
			// side: THREE.DoubleSide,
			fragmentShader: fragmentShader,
			vertexShader: vertexShader,
			side: THREE.BackSide,
		});
		this.mesh = new THREE.Mesh(geometry, material);
		this.add(this.mesh);

		const ambientLight = new THREE.AmbientLight(0xffffff, 1);
		this.add(ambientLight);

		const key = new THREE.DirectionalLight(0xffffff, 2.5);
		key.position.set(3, 4, 5);
		this.add(key);

		this.mesh.position.y = 10;
		this.mesh.position.z = 0.5;
	}

	setColor(color) {
		this.mesh.material.color.set(color);
	}
}

export default World;
