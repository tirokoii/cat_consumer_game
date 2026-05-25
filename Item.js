import GameObject from "./GameObject.js";

export default class Item extends GameObject {
    constructor(game, x, y, width, height, color) {
        super(game, x, y, width, height)
        this.color = color
        this.markedForDeletion = false

        this.SPEED = 0 // For later if I want to make items move for more fun game-play
    }

    update(deltaTime) {
        // Don't need an update function
    }

    draw(ctx) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}