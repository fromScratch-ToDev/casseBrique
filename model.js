const windowWidth = 300;
const windowHeight = 300;

class Player{
    static life = 3;
}

class Brick{
    static #ligne = 0;
    static #column = 0;
    static width = 20;
    static height = 10;
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
        }
    }
} 

class Barbell{
    static width = 50;
    static height = 20;
    static coordX = (windowWidth)/2;
    static coordY = windowHeight - (Barbell.height /2);
}

class Ball{
    static #coordX = Barbell.coordX;
    static #coordY = Barbell.coordY - (Barbell.height/2);
    static #speedX = 0;
    static #speedY = 0;
    static isThrow = false;
    
    static getCoordX(){
        return Ball.#coordX;
    }
    static getCoordY(){
        return Ball.#coordY;
    }
   
    static Throwing(){
        Ball.#speedX = 0;
        Ball.#speedY = -2;
        Ball.isThrow = true;
    }
    static WallCollision(){
        // collision latérale
        if(Ball.#coordX < 0  || Ball.#coordX > windowWidth){
            Ball.#speedX *= -1;
        }
        // colission en haut
        if(Ball.#coordY < 0){
            Ball.#speedY *= -1;
        }
        // colission en bas
        if(Ball.#coordY > windowHeight){
            Player.life --;
            Ball.#coordX = Barbell.coordX;
            Ball.#coordY = Barbell.coordY - (Barbell.height)/2;
            Ball.isThrow = false;
        }
    }
    static BrickCollision(){
        // à implémenter
    }
    static BarbellCollision(){
        // à implémenter
    }
    static Move(){
        Ball.#coordX += Ball.#speedX;
        Ball.#coordY += Ball.#speedY;
    }
}

console.table(Brick.matrixBrick);

while (Player.life != 0) {
    if (Ball.isThrow === false) {
        Ball.Throwing();
    }
    Ball.Move()
    Ball.WallCollision()
    console.log(Ball.getCoordX(), Ball.getCoordY());
}

export {Player, Brick}