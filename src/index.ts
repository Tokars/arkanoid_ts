import { CanvasView } from "./view/CanvasView";
import { Ball } from "./view/sprites/Ball";
import { Brick } from "./view/sprites/Brick";
import { Paddle } from "./view/sprites/Paddle";


//Images:
import PADDLE_IMAGE from './images/paddle.png'
import BALL_IMAGE from './images/ball.png'
import BRICK_IMAGE from './images/ball.png'

import {

    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_STARTX,
    BALL_SPEED,
    BALL_SIZE,
    BALL_STARTX,
    BALL_STARTY


} from './setup'

// Helpers

import { createBricks } from "./helpers"


let gameOver = false
let score = 0


function setGameOver(view: CanvasView) {
    view.drawInfo('Game Over!')
    gameOver = false
}

function setGameWin(view: CanvasView) {
    view.drawInfo('Game Won!')
    gameOver = false
}

function gameLoop(
    view: CanvasView,
    bricks: Brick[]
    // paddle: Paddle,
    // ball: Ball
) {

    view.clear()
    view.drawBricks(bricks)

    requestAnimationFrame(() => gameLoop(view, bricks))
}

function startGame(v: CanvasView) {
    // Reset 
    score = 0
    v.drawInfo('')
    v.drawScore(0)

    const bricks = createBricks();
    gameLoop(v, bricks)
}


// Create a view.
const view = new CanvasView('#playField')
view.initStartBtn(startGame)
 


console.log("done")