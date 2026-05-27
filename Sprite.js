export default class Sprite {
    constructor(cofig) {
        this.image = new Image()
        this.image.src = config.image
        this.loaded = false

        this.sourceWidth = config.sourceWidth
        this.sourceHeight = config.sourceHeight

        this.sourceX = config.sourceX || 0
        this.sourceY = config.sourceY || 0

        this.image.onload = () => {
            this.loaded = true
        }

        this.image.onerror = () => {
            console.error(`Failed to load sprite: ${config.image}`)
        }
    }

    drawSingle(ctx, x, y, width, height) {
        ctx.drawImage(
            this.image,
            this.sourceX,
            this.sourceY,
            this.sourceWidth,
            this.sourceHeight,
            x,
            y,
            width,
            height
        )
    }
}