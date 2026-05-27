import GameObject from "./GameObject.js";
import Mouse from "./images/mouse.png"

export default class Item extends GameObject {
    constructor(game, x, y, width, height, color, currentSprite) {
        super(game, x, y, width, height, currentSprite)
        this.width = width
        this.height = height
        this.color = color
        this.currentSprite = Mouse
        this.markedForDeletion = false

        this.SPEED = 0 // For later if I want to make items move for more fun game-play
    }

    update(deltaTime) {
        // Don't need an update function
    }
}