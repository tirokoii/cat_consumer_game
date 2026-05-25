import Player from './Player.js'
import Item from './Item.js'
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

        // Create items
        this.items = []
    }

    randSpawner(value, itemWidth) {
        if (value > 0) {
            return Math.floor(Math.random() * (value))
        }
    }

    initlize() {
        for (let i = 0; i <= this.rowAmount; i++) {
            for (let j = 0; j <= this.columnAmount; j++) {
                this.boardPositions.push([this.rowHeight * i, this.columnWidth * j])
            }
        }
    }

    update(deltaTime) {
        if (this.items.length < 4) {
            for (let i = 0; i < 4; i++) {
                this.items.push(new Item(this, this.randSpawner(this.width - 20), this.randSpawner(this.height  - 20), 20, 20, "blue"))
            }
        } 

        // Update (deltatime)
        this.items.forEach(obj => obj.update(deltaTime))
        this.player.update(deltaTime)

        // Input handling
        if (this.inputHandler.keys.has('r')) {
            this.items[0].vx += 0.001 * deltaTime
        }
        if (this.inputHandler.keys.has('b')) {
            this.items[1].vy -= 0.001 * deltaTime
        }
        
        if (this.player.directionX > 0 && this.player.x > this.width && this.playery > this.height) {
            this.player.x = -this.player.width
            this.player.y = this.width
            this.player.directionX = -1
            this.player.directionY = -1
        } else if (this.player.directionX < 0 && this.player.x + this.player.width < 0 && this.player.y + this.player.height < 0) {
            this.player.x = this.width
            this.player.y = this.height
            this.player.directionX = 1
            this.player.directionY = 1
        } else {
            // Right
            if (this.player.directionX > 0 && this.player.x > this.width) {
                this.player.x  = -this.player.width
                this.player.directionX = -1
            // Left
            } else if (this.player.directionX < 0 && this.player.x + this.player.width < 0) {
                this.player.x = this.width 
                this.player.directionX = 1
            }
            
            //Down
            if (this.player.directionY > 0 && this.player.y > this.height) {
                this.player.y = -this.player.height
                this.player.directionY = -1
            // Up
            } else if (this.player.directionY < 0 && this.player.y + this.player.height < 0) {
                this.player.y = this.height
                this.player.directionY = 1
            }
        }

        this.items.forEach(obj => {
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

        this.items.forEach(obj => obj.draw(ctx))
        this.player.draw(ctx)
    }
}