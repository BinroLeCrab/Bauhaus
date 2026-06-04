export const params = {
	sceneView: {
		bgColor: 0x750e0e,
		cubeColor: 0xe23d3d,
	},
	sceneBass: {
		bgColor: 0xFFFFFF,
		cubeColor: 0xf5f5f5,
		floorColor: 0x352F31,
		skyColor: 0x706a6c,
		secondaryColor: [
			0x068CFE,
			0xF60403,
			0xF3EA21,
			0x0A46E5,
			0x00E85B
		],
	},
	sceneHigh: {
		bgColor: 0xe8e3cf,
		cubeColor: 0xef3942,
		floorColor: 0x882f2f,
		skyColor: 0xf4e9d8,
		secondaryColor: [
			0x0A46E5,
			0x706a6c,
			0xF6D201,
			0x5F66A7,
			0xF28417
		],
	},

	camera: {
		fov: 90,
		near: 0.1,
		far: 1000,
		zoom: 60,
		position: {
			x: 0,
			y: -2,
			z: 5,
		},
		lookAt: {
			x: 0,
			y: 2,
			z: 0,
		},
	},
	audio: {
		frequency: 0,
		cutNumber: 32,
		bassBoost: 1,
		highBoost: 1.25,
	},
	halftone: {
		shape: 1,
		radius: 4,
		rotateR: Math.PI / 12,
		rotateB: (Math.PI / 12) * 2,
		rotateG: (Math.PI / 12) * 3,
		scatter: 0,
		blending: 0.5,
		blendingMode: 1,
		greyscale: false,
		disable: true,
	},
	object: {
		monolith: {
			animation: true,
			position: {
				x: 0,
				y: 0,
				z: -0.5,
			},
			size: {
				width: 1.75,
				height: 4,
				depth: 1.75,
			},
			scaleVolume: 0.2,
		}
	}
};
