import Player from './Player.js'
import PlayerPart from './PlayerPart.js'
import Item from './Item.js'
import Position from './Position.js'
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

        this.timer = 0
        this.positions = []

        this.inputHandler = new InputHandler(this)

        this.player = new Player(this, 50, 50, 50, 50, 'green')

        // Create items
        this.items = []
    }

    randomizer(value) {
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
        this.timer += deltaTime
        
        if (this.items.length < 4) {
            new Item()
            for (let i = 0; i < this.randomizer(4); i++) {
                this.items.push(new Item(
                    this, 
                    this.randomizer(this.width - 20), 
                    this.randomizer(this.height - 20), 
                    32,
                    32, 
                    "blue",
                    0,
                    this.randomizer(360)
                ))
            }
        } 
        
        // Update things (deltatime)
        this.player.update(deltaTime)
        
        this.items.forEach(item => item.update(deltaTime))
        
        if (this.timer > 110) {
            this.positions.forEach(position => position.updatePosition())
            for (let i = 0; i < this.positions.length; i++) {
                let j = this.positions.length - i - 1
                this.positions[j].updatePosition(deltaTime)
            }

            this.timer = 0
        }

        for (let i = 0; i < this.player.catLength; i++) {
            let j = this.player.catLength - i - 1
            if (j == 0) {
                this.player.catParts[j].update(deltaTime, this.positions[0])
            } else if (j < this.player.catLength) {
                this.player.catParts[j].update(deltaTime, this.positions[j - 1])
            }
        }

        // Input handling
        if (this.inputHandler.keys.has('r')) {
            this.items[0].vx += 0.001 * deltaTime
        }
        if (this.inputHandler.keys.has('b')) {
            this.items[1].vy -= 0.001 * deltaTime
        }

        // Collision with wall
        this.player.catParts.forEach(part => this.wallCollisionHandler(part))
        this.wallCollisionHandler(this.player)

        //Handle item pick up and add cat part
        this.items.forEach(item => {
            if (this.player.intersects(item) && !item.markedForDeletion) {
                item.markedForDeletion = true
                this.player.state = "eating"
                // Add cat parts
                this.player.catLength +++ 1
                if (this.player.catLength <= 1) {
                    this.player.catParts.push(new PlayerPart(
                        this.game,
                        this.player.x - this.player.width,
                        this.player.y - this.player.height,
                        this.player.width, 
                        this.player.height,
                        "orange",
                        this.player.SPEED,
                        0,
                        [this.player.directionX, this.player.directionY],
                    ))

                    this.positions.push(new Position(
                        this,
                        this.player.x, 
                        this.player.y, 
                        this.player.directionX, 
                        this.player.directionY,
                        this.player
                    ))
                } else {
                    this.player.catParts.push(new PlayerPart(
                        this.game,
                        this.player.catParts[this.player.catLength - 2].x,
                        this.player.catParts[this.player.catLength - 2].y,
                        this.player.catParts[this.player.catLength - 2].width, 
                        this.player.catParts[this.player.catLength - 2].height,
                        "orange",
                        this.player.SPEED,
                        0,
                        [this.player.catParts[this.player.catLength - 2].directionX, this.player.catParts[this.player.catLength - 2].directionY]
                    ))

                    this.positions.push(new Position(
                        this,
                        this.player.catParts[this.player.catLength - 2].x,
                        this.player.catParts[this.player.catLength - 2].y,
                        this.player.catParts[this.player.catLength - 2].directionX,
                        this.player.catParts[this.player.catLength - 2].directionY,
                        this.player.catParts[this.player.catLength - 2]
                    ))
                }

            }
        })
        
        // Delete item from list
        this.items = this.items.filter(item => !item.markedForDeletion)
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
        this.player.catParts.forEach(part => part.draw(ctx))
        this.player.draw(ctx)
    }
}