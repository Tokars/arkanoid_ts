import { Vector } from "../../types";


export class Brick {
    private brickImage: HTMLImageElement = new Image();


    constructor(
        private brickWidth: number,
        private brickHeight: number,
        private position: Vector,
        private brickEnergy: number,
        image: string
    ) {
        this.brickWidth = brickWidth
        this.brickHeight = brickHeight
        this.brickEnergy = brickEnergy
        this.position = position;
        this.brickImage.src = image;

        console.log(`brick pos = x.${this.pos.x} y.${this.pos.y}`);

    }

    // Getters
    get pos(): Vector { return this.position; }
    get width(): number { return this.brickWidth; }
    get height(): number { return this.brickHeight; }
    get image(): HTMLImageElement { return this.brickImage; }
    get energy(): number { return this.brickEnergy; }

    //Setters
    set energy(nr: number) { this.brickEnergy = nr }
}