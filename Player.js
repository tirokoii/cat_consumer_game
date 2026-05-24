import GameObject from './GameObject.js'

export default class Player extends GameObject {
    constructor(game, x, y, width, height, color) {
        super(game, x, y, width, height)
        this.color = color
        this.catLength = []
        this.width = game.columnWidth
        this.height = game.rowHeight
        this.x = 0
        this.y = 0
        
        this.SPEED = 0.1

        this.directionX = 0
        this.directionY = 0
        this.lastDirection = [1, 0]

    }

    update(deltaTime) {

        if (this.game.inputHandler.keys.has('ArrowUp')) {
            this.directionY = -1
            this.lastDirection = [0, this.directionY]
        } else if (this.game.inputHandler.keys.has('ArrowDown')) {
            this.directionY = 1
            this.lastDirection = [0, this.directionY]
        } else {
            this.directionY = this.lastDirection[1]
        }

        if (this.game.inputHandler.keys.has('ArrowLeft')) {
            this.directionX = -1
            this.lastDirection = [this.directionX, 0]
        } else if (this.game.inputHandler.keys.has('ArrowRight')) {
            this.directionX = 1
            this.lastDirection = [this.directionX, 0]
        } else {
            this.directionX = this.lastDirection[0]
        }

        this.x += this.SPEED * this.directionX * deltaTime
        this.y += this.SPEED * this.directionY * deltaTime

        for (let i = 0; i <= this.game.boardPositions.length - 1; i++) {
            let position = this.game.boardPositions[i]
        }
    }

    draw(ctx) {
        // Rita spelaren som en rektangel
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}