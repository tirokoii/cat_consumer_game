export default class Position {
    constructor(game, x, y, directionX, directionY, playerObj) {
        this.x = x
        this.y = y
        this.directionX = directionX
        this.directionY = directionY
        this.playerObj = playerObj
        this.timeElapsed = 0
    }

    updatePosition(deltaTime) {
        this.x = this.playerObj.x
        this.y = this.playerObj.y
        this.directionX = this.playerObj.directionX
        this.directionY = this.playerObj.directionY
        this.playerObj = this.playerObj
    }
}