import GameObject from './GameObject.js'
import PlayerPart from './PlayerPart.js'

import CatHeadNormal from './images/player-normal.png'
import CatHeadEating from './images/player-eat.png'

export default class Player extends GameObject {
    constructor(game, x, y, width, height, color, currentSprite) {
        super(game, x, y, width, height, currentSprite)
        this.color = color
        this.catLength = 0
        this.catParts = []
        this.width = game.columnWidth
        this.height = game.rowHeight
        this.x = 0
        this.y = 0
        
        this.timer = 0
        this.state = "normal"
        this.currentSprite = CatHeadNormal

        this.SPEED = 0.2

        this.directionX = 0
        this.directionY = 0
        this.lastDirection = [1, 0]
        this.lastPosition = []

    }

    update(deltaTime) {
        if (this.state == "normal") {
            this.currentSprite = CatHeadNormal
        } else if (this.state == "eating") {   
            this.currentSprite = CatHeadEating
            this.timer += deltaTime
            if (this.timer > 120) {
                this.state = "normal"
                this.timer = 0
            }
        }
        
        // Handles input that controls player
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
        
        // if (this.timer < 20) {
        //     this.timer += deltaTime
        // } 
        // if (this.timer > 20) {
        //     this.lastPosition = [this.x - 30 * this.directionX, this.y - 30 * this.directionY]
        //     this.timer = 0
        // }

        this.x += this.SPEED * this.directionX * deltaTime
        this.y += this.SPEED * this.directionY * deltaTime
        
        // for (let i = 0; i <= this.game.boardPositions.length - 1; i++) {
        //     let position = this.game.boardPositions[i]
        // }
    }
}