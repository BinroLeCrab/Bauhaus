export const params = {
	sceneView: {
		bgColor: 0x750e0e,
		cubeColor: 0xe23d3d,
	},
	sceneBass: {
		bgColor: 0xFFFFFF,
		cubeColor: 0x068cfe,
	},
	sceneHigh: {
		bgColor: 0xe8e3cf,
		cubeColor: 0xef3942,
	},

	camera: {
		fov: 75,
		near: 0.1,
		far: 1000,
		position: {
			x: 0,
			y: 3,
			z: 5,
		},
		lookAt: {
			x: 0,
			y: 3,
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
			animation: false,
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
			scaleVolume: 0.5,
		}
	}
};
