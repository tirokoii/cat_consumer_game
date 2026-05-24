import './style.css'
import Game from './Game.js'

const setupGame = (canvas) => {
    canvas.width = 700
    canvas.height = 700

    const ctx = canvas.getContext('2d')

    const game = new Game(canvas.width, canvas.height)
    game.initlize()
    let lastTime = 0
    let gameLoop


    const runGame = (timeStamp) => {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        game.update(deltaTime)
        game.draw(ctx)

        gameLoop = requestAnimationFrame(runGame)
    }

    gameLoop = requestAnimationFrame(runGame)
}

setupGame(document.querySelector('#cat-consumer'))