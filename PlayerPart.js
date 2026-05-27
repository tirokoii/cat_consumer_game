import GameObject from "./GameObject"
import CatPart from './images/player-back.png'

export default class PlayerPart extends GameObject {
    constructor(game, x, y, width, height, color, SPEED, currentSprite, inheritedDirection = []) {
        super(game, x, y, width, height, currentSprite)
        this.color = color
        this.width = width
        this.height = height
        
        this.x = x
        this.y = y

        this.timer = 0
        this.currentSprite = CatPart

        this.SPEED = SPEED

        this.directionX = 0
        this.directionY = 0
        this.inheritedDirection = inheritedDirection

        this.lastPosition = []
    }

    update(deltaTime, playerObj) {
        // if (playerObj) {
        //     this.inheritedDirection = [playerObj.directionX, playerObj.directionY]
        // }

        // if (this.timer < 20) {
        //     this.timer += deltaTime
        // } 
        // if (this.timer > 20) {
        //     this.lastPosition = [playerObj.x - 30 * this.directionX, playerObj.y - 30 * this.directionY]
        //     this.timer = 0
        // }

        // this.x = playerObj.lastPosition[0]
        // this.y = playerObj.lastPosition[1]

        // let vM = [playerObj.x - this.x, playerObj.y - this.y]
        // let vT = Math.sqrt(vM[0] * vM[0] + vM[1] * vM[1])
        // this.directionX = vM[0] / vT
        // this.directionY = vM[1] / vT

        // this.directionX = playerObj.directionX
        // this.directionY = playerObj.directionY

        this.x = playerObj.x - 20 * this.directionX
        this.y = playerObj.y - 20 * this.directionY
        
        // this.x += this.SPEED * this.directionX * deltaTime
        // this.y += this.SPEED * this.directionY * deltaTime

    //     console.log("Speed: " + this.SPEED, "Directionx: " + this.directionX, "DirectionY: " + this.directionY)
    }
}