export default class PlayerPart extends GameObject {
    constructor(game, x, y, width, height, color) {
        super(game, x, y, width, height)
        this.color = color
        
        this.SPEED = 20.0
        this.directionX = 0
        this.directionY = 0
    }

    update(deltaTime) {

    }
}