export default class GameObject {
    constructor(game, x = 0, y = 0, width = 0, height = 0) {
        this.game = game
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.currentSprite = ""
        this.rotation = 0
        this.img = new Image()
        this.lastImg = 0
    }

    rotationHandler() {
        if (this.directionX == 1 && this.directionY == -1) {
            this.rotation = 225
        } else if (this.directionX == -1 && this.directionY == 1) {
            this.rotation = 45
        } else if (this.directionX == -1 && this.directionY == -1) {
            this.rotation = 135
        } else if (this.directionX == 1 && this.directionY == 1) {
            this.rotation = -45
        } else if (this.directionX == 1) {
            this.rotation = 270
        } else if (this.directionX == -1) {
            this.rotation = 90
        } else if (this.directionY == 1) {
            this.rotation = 0
        } else if (this.directionY == -1) {
            this.rotation = 180
        }
    }

    draw(ctx) {
        this.lastImg = this.img
        this.img.src = this.currentSprite

        if (this.img) {
            if (this.rotation != 0) {
                ctx.save()
                let rad = this.rotation * Math.PI / 180
                ctx.translate(this.x + this.width / 2, this.y + this.height / 2)
                ctx.rotate(rad)
                ctx.translate(-this.x - this.width / 2, -this.y -this.width / 2)
            }
            ctx.drawImage(
                this.lastImg,
                this.x,
                this.y,
                this.width,
                this.height
            )
            ctx.drawImage(
                this.img,
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