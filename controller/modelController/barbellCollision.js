import Model from "../../model/Model.js";

export function barbellCollision(){
    const ball = Model.ball;
    const barbell = Model.barbell;

    if (barbell.coordY - ball.position.y >= barbell.height/2 && barbell.coordY - ball.position.y <= barbell.height && ball.isThrow) {
        // la balle touche le milieu de la barre
        if (Math.abs(barbell.coordX - ball.position.x) <= 1/10 *barbell.width ) {
            ball.velocity.x = ball.velocity.mag()*0;
            ball.velocity.y = ball.velocity.mag()*-1;
        } 
        // la barre touche le côté droit 
        else if (barbell.coordX - ball.position.x < -1/10 *barbell.width && barbell.coordX - ball.position.x >= -4/10 * barbell.width ) {
            ball.velocity.x = ball.velocity.mag()*0.5;
            ball.velocity.y = ball.velocity.mag()*-Math.sqrt(0.75);
        }
        // la barre touche le côté gauche 
        else if (barbell.coordX - ball.position.x > 1/10 *barbell.width && barbell.coordX - ball.position.x <= 4/10 * barbell.width ) {
            ball.velocity.x = ball.velocity.mag()*-0.5;
            ball.velocity.y = ball.velocity.mag()*-Math.sqrt(0.75);
        }
        // la barre touche le côté extrème droit 
        else if (barbell.coordX - ball.position.x < -4/10 *barbell.width && barbell.coordX - ball.position.x >= -6/10 * barbell.width ) {
            ball.velocity.x = ball.velocity.mag()*Math.sqrt(0.5);
            ball.velocity.y = ball.velocity.mag()*-Math.sqrt(0.5);
        }
         // la barre touche le côté extrème gauche 
        else if (barbell.coordX - ball.position.x > 4/10 *barbell.width && barbell.coordX - ball.position.x <= 6/10 * barbell.width ) {
            ball.velocity.x = ball.velocity.mag()*-Math.sqrt(0.5);
            ball.velocity.y = ball.velocity.mag()*-Math.sqrt(0.5);
        }
    }

}

export default barbellCollision;
