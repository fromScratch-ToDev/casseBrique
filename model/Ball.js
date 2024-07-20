export class Ball{
    #diameter;
    
    constructor(p5){
        this.#diameter = 20;
        this.radius = this.#diameter/2;
        this.position = p5.createVector(300,570);
        this.velocity = p5.createVector(0,0);
        this.isThrow = false;
    }
   
    getDiameter(){
        return this.#diameter;
    }
    
    startPosition(barbell){
        this.position.x = barbell.coordX;
        this.position.y = barbell.coordY - (barbell.height/2) - this.radius;
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.isThrow = false;
    }
    
    Move(){
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

export default Ball;