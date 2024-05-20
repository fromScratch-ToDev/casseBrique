const windowWidth = 600;
const windowHeight = 600;

class Player{
    static life = 3;
}

class Brick{
    static nbBrick = 90;
    static #ligne = 0;
    static #column = 0;
    static width = 40;
    static height = 20;
    static matrixBrick = new Array(6).fill().map(() => new Array(15).fill().map(() => new Brick()));
 
    constructor(){
        this.color = "blue";
        this.life = 1;
        this.ligne = Brick.#ligne;
        this.column = Brick.#column
        if (Brick.#column < 14) {
            Brick.#column ++;
        }
        else{
            Brick.#column = 0;
            Brick.#ligne ++;
        }
    }

    hurt(){
        this.life--;
        if (this.life == 0) {
            Brick.matrixBrick[this.ligne][this.column] = null
            Brick.nbBrick--;
        }
    }
} 

class Barbell{
    static width = 100;
    static height = 20;
    static coordX = (windowWidth)/2;
    static coordY = windowHeight - (Barbell.height /2);
}

class Ball{
    static #diameter = 20;
    static #radius = Ball.#diameter/2;
    static #coordX = Barbell.coordX;
    static #coordY = Barbell.coordY - (Barbell.height/2) - (Ball.#diameter/2);
    static #speed = 12;
    static #speedX = 0;
    static #speedY = 0;
    static isThrow = false;
    
    static getCoordX(){
        return Ball.#coordX;
    }
    static getCoordY(){
        return Ball.#coordY;
    }
    /**  retourne la vitesse totale de la balle **/
    static getSpeed(){
        return Ball.#speed;
    }
    static getSpeedX(){
        return Ball.#speedX;
    }
    static getSpeedY(){
        return Ball.#speedY;
    }

    static getDiameter(){
        return Ball.#diameter;
    }

    static setCoordX(coordX){
        Ball.#coordX = coordX;
    }
    static setSpeedX(speedX){
        Ball.#speedX = speedX;
    }
    static setSpeedY(speedY){
        Ball.#speedY = speedY;
    }
   
    static Throwing(){
        if (!Ball.isThrow) {
            Ball.#speedX = 0;
            Ball.#speedY = -Ball.#speed;
            Ball.isThrow = true;
        }
    }
    static WallCollision(){
        // collision latérale
        if(Ball.#coordX <= 0+Ball.#radius  || Ball.#coordX >= windowWidth-Ball.#radius){
            Ball.#speedX *= -1;
        }
        // colission en haut
        if(Ball.#coordY <= 0+Ball.#radius){
            Ball.#speedY *= -1;
        }
        // colission en bas
        if(Ball.#coordY >= windowHeight+100){
            Player.life --;
            Ball.#coordX = Barbell.coordX;
            Ball.#coordY = Barbell.coordY - (Barbell.height/2) - Ball.#radius;
            Ball.#speedX = 0;
            Ball.#speedY = 0;
            Ball.isThrow = false;
        }
    }
    static BrickCollision(){
        Brick.matrixBrick.forEach((arrayBrick, y) => {
            arrayBrick.forEach((brick, x) =>{
                if(brick instanceof Brick){

                    // points de chaque angle d'une brique
                    let pointNO = (x * Brick.width, y * Brick.height);
                    let pointNE = ((x+1) * Brick.width, y * Brick.height);
                    let pointSE = ((x+1) * Brick.width, (y+1) * Brick.height);
                    let pointSO = (x * Brick.width, (y+1) * Brick.height);

                    // test collision en bas, puis à gauche, puis à droite, puis en haut 
                    if (Ball.getCoordY() >= ((y+1) * Brick.height) && Ball.getCoordX() <= ((x+1) * Brick.width) && Ball.getCoordX() >= (x * Brick.width) && Ball.getCoordY() - ((y+1) * Brick.height) <= Ball.#radius){
                        brick.hurt();
                        Ball.setSpeedY(-Ball.getSpeedY()); 
                    } else if (Ball.getCoordX() >= ((x+1) * Brick.width) && Ball.getCoordY() <= ((y+1) * Brick.height) && Ball.getCoordY() >= (y * Brick.height) && Ball.getCoordX() - ((x+1) * Brick.width) <= Ball.#radius){
                        brick.hurt();
                        Ball.setSpeedX(-Ball.getSpeedX()); 
                    } else if (Ball.getCoordX() <= (x * Brick.width) && Ball.getCoordY() <= ((y+1) * Brick.height) && Ball.getCoordY() >= (y * Brick.height) && (x * Brick.width) - Ball.getCoordX() <= Ball.#radius ){
                        brick.hurt();
                        Ball.setSpeedX(-Ball.getSpeedX());
                    } else if (Ball.getCoordY() <= (y * Brick.height) && Ball.getCoordX() <= ((x+1) * Brick.width) && Ball.getCoordX() >= (x * Brick.width) && (y * Brick.height) - Ball.getCoordY() <= Ball.#radius) {
                        brick.hurt();
                        Ball.setSpeedY(-Ball.getSpeedY()); 
                    }
                }
            })
        });
    }
    static BarbellCollision(){
        if (Barbell.coordY - Ball.getCoordY() >= Barbell.height/2 && Barbell.coordY - Ball.getCoordY() <= Barbell.height && Ball.isThrow) {
            // la balle touche le milieu de la barre
            if (Math.abs(Barbell.coordX - Ball.getCoordX()) <= 1/10 *Barbell.width ) {
                Ball.setSpeedX(Ball.#speed * 0);
                Ball.setSpeedY(Ball.#speed * -1);
            } 
            // la barre touche le côté droit 
            else if (Barbell.coordX - Ball.getCoordX() < -1/10 *Barbell.width && Barbell.coordX - Ball.getCoordX() >= -4/10 * Barbell.width ) {
                Ball.setSpeedX(Ball.#speed*0.5);
                Ball.setSpeedY(-Ball.#speed*Math.sqrt(0.75));
            }
            // la barre touche le côté gauche 
            else if (Barbell.coordX - Ball.getCoordX() > 1/10 *Barbell.width && Barbell.coordX - Ball.getCoordX() <= 4/10 * Barbell.width ) {
                Ball.setSpeedX(-Ball.#speed*0.5);
                Ball.setSpeedY(-Ball.#speed*Math.sqrt(0.75));
            }
            // la barre touche le côté extrème droit 
            else if (Barbell.coordX - Ball.getCoordX() < -4/10 *Barbell.width && Barbell.coordX - Ball.getCoordX() >= -6/10 * Barbell.width ) {
                Ball.setSpeedX(Ball.#speed*Math.sqrt(0.5));
                Ball.setSpeedY(-Ball.#speed*Math.sqrt(0.5));
            }
             // la barre touche le côté extrème gauche 
            else if (Barbell.coordX - Ball.getCoordX() > 4/10 *Barbell.width && Barbell.coordX - Ball.getCoordX() <= 6/10 * Barbell.width ) {
                Ball.setSpeedX(-Ball.#speed*Math.sqrt(0.5));
                Ball.setSpeedY(-Ball.#speed*Math.sqrt(0.5));
            }
        }

    }
    static Move(){
        Ball.#coordX += Ball.#speedX;
        Ball.#coordY += Ball.#speedY;
        Ball.WallCollision();
        Ball.BrickCollision();
        Ball.BarbellCollision();
    }
}