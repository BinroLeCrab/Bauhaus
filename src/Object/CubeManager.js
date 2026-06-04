import { params } from "../constant/params";

class CubeManager {
	constructor() {
		this.cubes = [];
		this.maxCubes = 8;
		this.counter = 0;
		this.subscribers = [];

		this.cubesMaxCount = 8;
		this.cubesMinSize = 0.5;
		this.cubesMaxSize = 1;
		this.cubesMinDepth = 0.25;
		this.cubesMaxDepth = 0.6;

		this.minDistance = 0.5;
	}

	registerMonolith(monolith) {
		this.subscribers.push(monolith);
	}

	onKick() {
		if (this.counter >= this.maxCubes) {
			this.reset(); // Notifie tous les Monolith de supprimer
		} else {
			this.addCube(); // Notifie tous les Monolith d'ajouter
		}
	}

	reset() {
		this.cubes = [];
		this.counter = 0;
		this.subscribers.forEach((m) => m.clearCubes());
	}

	getRandomSize() {
		let size =
			Math.random() * (this.cubesMaxSize - this.cubesMinSize) +
			this.cubesMinSize;
		return {
			width: size,
			height: size,
			depth: size,
		};
	}

	getRandomPosition() {
		let position;
		// let valid = false;

		// while (!valid) {
		// 	position = {
		// 		x:
		// 			(Math.random() > 0.5 ? 1 : -1) *
		// 			(params.object.monolith.size.width / 2),
		// 		y: (Math.random() - 0.5) * params.object.monolith.size.height,
		// 		z:
		// 			(Math.random() > 0.5 ? 1 : -1) *
		// 			(params.object.monolith.size.depth / 2),
		// 	};

		// 	valid = this.cubes.every((cube) =>
		// 		Math.abs(cube.position.y - position.y) >= this.minDistance
		// 	);
		// }

		position = {
			x:
				(Math.random() > 0.5 ? 1 : -1) *
				(params.object.monolith.size.width / 2),
			y: (Math.random() - 0.5) * params.object.monolith.size.height,
			z:
				(Math.random() > 0.5 ? 1 : -1) *
				(params.object.monolith.size.depth / 2),
		};

		return position;
	}

	addCube() {
		const cubeData = {
			size: this.getRandomSize(),
			position: this.getRandomPosition(),
			color: Math.floor(Math.random() * 5),
		};
		this.cubes.push(cubeData);

		this.subscribers.forEach((m) => m.addCube(cubeData));
		this.counter++;
	}
}

const cubeManager = new CubeManager();
export default cubeManager;
