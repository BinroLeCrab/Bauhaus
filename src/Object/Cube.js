class Cubes {
    constructor() {
        this.cubes = [];
    }

    addCube(size, position, color) {
        const cube = {
            size: size,
            position: position,
            color: color,
        };
        this.cubes.push(cube);
    }

    resetCubes() {
        this.cubes.forEach((cube) => this.remove(cube));
        this.cubes = [];
    }
}