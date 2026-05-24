import Player from './Player.js'
import InputHandler from './InputHandler.js'

export default class Game {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.rowAmount = 10
        this.columnAmount = 10
        this.rowHeight = height / this.rowAmount
        this.columnWidth = width / this.columnAmount
        this.boardPositions = []
        this.inputHandler = new InputHandler(this)

        this.player = new Player(this, 50, 50, 50, 50, 'green')

        // Skapa alla objekt i spelet
        this.gameObjects = [
            // Later
        ]
    }

    initlize() {
        for (let i = 0; i <= this.rowAmount; i++) {
            for (let j = 0; j <= this.columnAmount; j++) {
                this.boardPositions.push([this.rowHeight * i, this.columnWidth * j])
            }
        }
    }

    update(deltaTime) {
        // Update (deltatime)
        this.gameObjects.forEach(obj => obj.update(deltaTime))
        this.player.update(deltaTime)

        // Input handling
        if (this.inputHandler.keys.has('r')) {
            this.gameObjects[0].vx += 0.001 * deltaTime
        }
        if (this.inputHandler.keys.has('b')) {
            this.gameObjects[1].vy -= 0.001 * deltaTime
        }

        this.gameObjects.forEach(obj => {
            if (obj !== this.player && this.player.intersects(obj)) {
                // Handling collision

                // if (this.player.directionX > 0) { // Right
                //     this.player.x = obj.x - this.player.width
                // } else if (this.player.directionX < 0) {  // Left
                //     this.player.x = obj.x + obj.width
                // }
                // if (this.player.directionY > 0) { // Down
                //     this.player.y = obj.y - this.player.height
                // } else if (this.player.directionY < 0) { // Up
                //     this.player.y = obj.y + obj.height
                // }
            }
        })
    }

    draw(ctx) {
        for (let i = 0; i <= this.rowAmount; i++) {
            ctx.fillStyle = "black"
            ctx.fillRect(this.columnWidth * i, 0, 5, this.height)
        }

        for (let j = 0; j <= this.columnAmount; j++) {
            ctx.fillStyle = "red"
            ctx.fillRect(0, this.rowHeight * j, this.width, 5)
        }

        this.gameObjects.forEach(obj => obj.draw(ctx))
        this.player.draw(ctx)
    }
}