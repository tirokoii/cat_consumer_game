import GameObject from "./GameObject"

export default class PlayerPart extends GameObject {
    constructor(game, x, y, width, height, color, SPEED, inheritedDirection = []) {
        super(game, x, y, width, height)
        this.color = color
        this.width = width
        this.height = height
        
        this.x = x
        this.y = y

        this.SPEED = SPEED

        this.directionX = 0
        this.directionY = 0
        this.inheritedDirection = inheritedDirection
    }

    update(deltaTime) {
        this.directionX = this.inheritedDirection[0]
        this.directionY = this.inheritedDirection[1]
        this.x += this.SPEED * this.directionX * deltaTime
        this.y += this.SPEED * this.directionY * deltaTime
        console.log("Speed: " + this.SPEED, "Directionx: " + this.directionX, "DirectionY: " + this.directionY)

    }

    draw(ctx) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}