import Canvas from "../../view/Canvas.js";
import Model from "../../model/Model.js";

export function wallCollision(){
    const ball = Model.ball;
    const barbell = Model.barbell;
    const player = Model.player;

    // collision à gauche
    if(ball.position.x <= ball.radius){
        ball.position.x = ball.radius;
        ball.velocity.x *= -1;
    }  
    // collision à droite
    else if ( ball.position.x >= Canvas.width - ball.radius){
        ball.position.x = Canvas.width - ball.radius;
        ball.velocity.x *= -1;
    }
    // colission en haut
    else if(ball.position.y <= ball.radius){
        ball.position.y = ball.radius;
        ball.velocity.y *= -1;
    }
    // colission en bas
    else if(ball.position.y >= Canvas.height+100){
        player.life --;
        ball.startPosition(barbell);
        
    }
}

export default wallCollision;