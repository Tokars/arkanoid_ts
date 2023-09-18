import { Brick } from "view/sprites/Brick";
import { Paddle } from "view/sprites/Paddle";
import { Ball } from "view/sprites/Ball";
import { CanvasView } from "view/CanvasView";


export class Collision {


    // check ball with bricks
    isCollideBricks(ball: Ball, bricks: Brick[]): boolean {
        let collide = false;
        bricks.forEach((brick, i) => {
            if (this.isCollideBrick(ball, brick)) {
                ball.changeYDirection()

                if (brick.energy === 1) {
                    bricks.splice(i, 1)
                }
                else brick.energy--

                collide = true
            }
        })
        return collide
    }
    isCollideBrick(ball: Ball, brick: Brick): boolean {
        if (
            ball.pos.x < brick.pos.x + brick.width &&
            ball.pos.x + ball.width > brick.pos.x &&

            ball.pos.y < brick.pos.y + brick.height &&
            ball.pos.y + brick.height > brick.pos.y
        ) {
            return true
        }
        return false
    }

    checkBallCollision(ball: Ball, paddle: Paddle, view: CanvasView): void {
        // check ball with paddle.
        if (ball.pos.x + ball.width > paddle.pos.x && ball.pos.x < paddle.pos.x + paddle.width &&
            ball.pos.y + ball.height === paddle.pos.y
        ) { ball.changeYDirection() }

        // check collision with walls.
        if (ball.pos.x > view.canvas.width - ball.width || ball.pos.x < 0) {
            ball.changeXDirection()
        }

        if (ball.pos.y < 0)
            ball.changeYDirection()
    }
}