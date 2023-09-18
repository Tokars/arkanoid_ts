import { CanvasView } from "./view/CanvasView";
import { Ball } from "./view/sprites/Ball";
import { Brick } from "./view/sprites/Brick";
import { Paddle } from "./view/sprites/Paddle";
import { Collision } from "./Collision";

//Images:
import PADDLE_IMAGE from "/src/images/paddle.png"
import BALL_IMAGE from '/src/images/ball.png'

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
    bricks: Brick[],
    paddle: Paddle,
    ball: Ball,
    collision: Collision
) {

    view.clear()
    view.drawBricks(bricks)
    view.drawSprite(paddle)
    view.drawSprite(ball)

    // Move paddle.
    if (
        (paddle.isMovingLeft && paddle.pos.x > 0) ||
        (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)
    ) { paddle.movePaddle() }

    // Move ball
    ball.moveBall()
    collision.checkBallCollision(ball, paddle, view)
    const collidingBrick = collision.isCollideBricks(ball, bricks)

    if (collidingBrick) {
        score++
        view.drawScore(score)
    }

    // Game over when ball leave play field.
    if (ball.pos.y > view.canvas.height) gameOver = true
    
    if (bricks.length == 0) return setGameWin(view)
    // Return if game over and don't run the requestAnimationFrame.

    if (gameOver) return setGameOver(view)
    requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision))
}

function startGame(v: CanvasView) {
    // Reset 
    score = 0
    v.drawInfo('')
    v.drawScore(0)

    // create collision
    const collision = new Collision()

    // create bricks
    const bricks = createBricks();

    // create ball
    const ball = new Ball(BALL_SPEED, BALL_SIZE, { x: BALL_STARTX, y: BALL_STARTY }, BALL_IMAGE)

    // create paddle
    const paddle = new Paddle(
        PADDLE_SPEED,
        PADDLE_WIDTH,
        PADDLE_HEIGHT,
        {
            x: PADDLE_STARTX,
            y: view.canvas.height - PADDLE_HEIGHT - 5
        },
        PADDLE_IMAGE
    )
    gameLoop(v, bricks, paddle, ball, collision)
}


// Create a view.
const view = new CanvasView('#playField')
view.initStartBtn(startGame)

console.log("run")