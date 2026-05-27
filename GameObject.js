export default class GameObject {
    constructor(game, x = 0, y = 0, width = 0, height = 0) {
        this.game = game
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.currentSprite = ""
    }

    draw(ctx) {
        const img = new Image()
        img.src = this.currentSprite
        if (img) {
            ctx.drawImage(
                img,
                this.x,
                this.y,
                this.width,
                this.height
            )
            ctx.restore()
            return true
        } else {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }

    intersects(other) {
        return this.x < other.x + other.width &&
               this.x + this.width > other.x &&
               this.y < other.y + other.height &&
               this.y + this.height > other.y
    }
}