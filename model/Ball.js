import Brick from "./Brick.js";
import { Barbell, Player } from "../model/model.js"

const windowWidth = 600;
const windowHeight = 600;

export class Ball{
    static #diameter = 20;
    static radius = Ball.#diameter/2;
    static position;
    static velocity;
    static isThrow = false;

    static getDiameter(){
        return Ball.#diameter;
    }
   
 
    static WallCollision(){
        // collision latérale
        if(Ball.position.x <= 0+Ball.radius  || Ball.position.x >= windowWidth-Ball.radius){
            Ball.velocity.x *= -1;
        }
        // colission en haut
        if(Ball.position.y <= 0+Ball.radius){
            Ball.velocity.y *= -1;
        }
        // colission en bas
        if(Ball.position.y >= windowHeight+100){
            Player.life --;
            Ball.position.x = Barbell.coordX;
            Ball.position.y = Barbell.coordY - (Barbell.height/2) - Ball.radius;
            Ball.velocity.x = 0;
            Ball.velocity.y = 0;
            Ball.isThrow = false;
        }
    }
    
    static BarbellCollision(){
        if (Barbell.coordY - Ball.position.y >= Barbell.height/2 && Barbell.coordY - Ball.position.y <= Barbell.height && Ball.isThrow) {
            // la balle touche le milieu de la barre
            if (Math.abs(Barbell.coordX - Ball.position.x) <= 1/10 *Barbell.width ) {
                Ball.velocity.x = Ball.velocity.mag()*0;
                Ball.velocity.y = Ball.velocity.mag()*-1;
            } 
            // la barre touche le côté droit 
            else if (Barbell.coordX - Ball.position.x < -1/10 *Barbell.width && Barbell.coordX - Ball.position.x >= -4/10 * Barbell.width ) {
                Ball.velocity.x = Ball.velocity.mag()*0.5;
                Ball.velocity.y = Ball.velocity.mag()*-Math.sqrt(0.75);
            }
            // la barre touche le côté gauche 
            else if (Barbell.coordX - Ball.position.x > 1/10 *Barbell.width && Barbell.coordX - Ball.position.x <= 4/10 * Barbell.width ) {
                Ball.velocity.x = Ball.velocity.mag()*-0.5;
                Ball.velocity.y = Ball.velocity.mag()*-Math.sqrt(0.75);
            }
            // la barre touche le côté extrème droit 
            else if (Barbell.coordX - Ball.position.x < -4/10 *Barbell.width && Barbell.coordX - Ball.position.x >= -6/10 * Barbell.width ) {
                Ball.velocity.x = Ball.velocity.mag()*Math.sqrt(0.5);
                Ball.velocity.y = Ball.velocity.mag()*-Math.sqrt(0.5);
            }
             // la barre touche le côté extrème gauche 
            else if (Barbell.coordX - Ball.position.x > 4/10 *Barbell.width && Barbell.coordX - Ball.position.x <= 6/10 * Barbell.width ) {
                Ball.velocity.x = Ball.velocity.mag()*-Math.sqrt(0.5);
                Ball.velocity.y = Ball.velocity.mag()*-Math.sqrt(0.5);
            }
        }

    }
    static Move(){
        Ball.position.x += Ball.velocity.x;
        Ball.position.y += Ball.velocity.y;
        Ball.WallCollision();
        Brick.BrickCollision();
        Ball.BarbellCollision();
    }
}

export default Ball;