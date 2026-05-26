import Player from './Player.js'
import PlayerPart from './PlayerPart.js'
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

    wallCollisionHandler(playerObj) {
        if (playerObj == PlayerPart) {
            console.log(playerObj)
        }
        // Collision with walls handler
        if (playerObj.directionX > 0 && playerObj.x > this.width && playerObj > this.height) {
            playerObj.x = -this.player.width
            playerObj.y = this.width
            playerObj.directionX = -1
            playerObj.directionY = -1
        } else if (playerObj.directionX < 0 && playerObj.x + playerObj.width < 0 && playerObj.y + playerObj.height < 0) {
            playerObj.x = this.width
            playerObj.y = this.height
            playerObj.directionX = 1
            playerObj.directionY = 1
        } else {
            // Right
            if (playerObj.directionX > 0 && playerObj.x > this.width) {
                playerObj.x  = -playerObj.width
                playerObj.directionX = -1
            // Left
            } else if (playerObj.directionX < 0 && playerObj.x + playerObj.width < 0) {
                playerObj.x = this.width 
                playerObj.directionX = 1
            }
            
            //Down
            if (playerObj.directionY > 0 && playerObj.y > this.height) {
                playerObj.y = -playerObj.height
                playerObj.directionY = -1
            // Up
            } else if (playerObj.directionY < 0 && playerObj.y + playerObj.height < 0) {
                playerObj.y = this.height
                playerObj.directionY = 1
            }
        }
    }

    update(deltaTime) {
        if (this.items.length < 4) {
            for (let i = 0; i < this.randSpawner(4); i++) {
                this.items.push(new Item(this, this.randSpawner(this.width - 20), this.randSpawner(this.height  - 20), 20, 20, "blue"))
            }
        } 

        // Update (deltatime)
        this.items.forEach(item => item.update(deltaTime))
        this.player.update(deltaTime)
        this.player.catParts.forEach(part => part.update(deltaTime))

        // Input handling
        if (this.inputHandler.keys.has('r')) {
            this.items[0].vx += 0.001 * deltaTime
        }
        if (this.inputHandler.keys.has('b')) {
            this.items[1].vy -= 0.001 * deltaTime
        }

        this.wallCollisionHandler(this.player)
        this.player.catParts.forEach(part => this.wallCollisionHandler(part))

        this.items.forEach(item => {
            if (this.player.intersects(item) && !item.markedForDeletion) {
                item.markedForDeletion = true
                this.player.catLength +++ 1
                this.player.catParts.push(new PlayerPart(this.game,
                            this.player.x - this.player.width * this.player.directionX,
                            this.player.y - this.player.height * this.player.directionY,
                            this.player.width, 
                            this.player.height,
                            "orange",
                            this.player.SPEED,
                            [this.player.directionX, this.player.directionY]
                ))
            }
        })
        
        // Delete item from list
        this.items = this.items.filter(coin => !coin.markedForDeletion)
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

        this.items.forEach(item => item.draw(ctx))
        this.player.draw(ctx)
        this.player.catParts.forEach(part => part.draw(ctx))
    }
}