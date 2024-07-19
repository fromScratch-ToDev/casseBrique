import Ball from "./Ball.js";

export class Brick{
    static nbBrick = 90;
    static #ligne = 0;
    static #column = 0;
    static width = 40;
    static height = 20;
    x = 0;
    y = 0;
    static matrixBrick = new Array(6).fill().map(() => new Array(15).fill().map(() => new Brick()));
    constructor(){
        this.life = 1;
        this.x = Brick.#column * Brick.width;
        this.y = Brick.#ligne * Brick.height;
        this.ligne = Brick.#ligne;
        this.column = Brick.#column;
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

    static BrickCollision(){
        Brick.matrixBrick.forEach((arrayBrick) => {
            arrayBrick.forEach((brick) =>{
                if(brick instanceof Brick){
                    // temporary variables to set edges for testing
                    let edgeOfCollision = "";
                    let testX = Ball.position.x;
                    let testY = Ball.position.y;

                    // which edge is closest?
                    if (Ball.position.x < brick.x) {
                        edgeOfCollision = "left";
                        testX = brick.x;     
                    }
                    else if (Ball.position.x > brick.x+Brick.width) {
                        edgeOfCollision = "right"
                        testX = brick.x+Brick.width;   
                    }
                    if (Ball.position.y <  brick.y){
                        edgeOfCollision = "top"
                        testY = brick.y;     
                    } 
                    else if (Ball.position.y > brick.y+Brick.height){
                        edgeOfCollision = "bottom"
                        testY = brick.y+Brick.height;  
                    } 
                    
                    // get distance from closest edges
                    const distX = Ball.position.x-testX;
                    const distY = Ball.position.y-testY;
                    const distance = Math.sqrt( (distX*distX) + (distY*distY) );
                    
                    
                    // if the distance is less than the radius, collision!
                    if (distance <=  Ball.radius && edgeOfCollision != "") {
                        Brick.#preventOverlapping(testX, testY);

                        brick.hurt();
                        Brick.#brickCollisionResolution(edgeOfCollision);
                    }
                    
                }
            })
        });
    }

    static#preventOverlapping(testX, testY){
        // Repousse chaque cercle de la moitié de la distance de superposition en suivant la ligne d'impact
        let impact = createVector(testX, testY) ;
        let distance = p5.Vector.sub(Ball.position,impact)
        
        let overlap = Ball.radius - distance.mag()
        distance.setMag(overlap)
        Ball.position.add(distance);
    }

    static #brickCollisionResolution(edgeOfCollision){
        if (edgeOfCollision === "bottom"){
            Ball.velocity.y *= -1; 
            Ball.position.x += 1;
        } else if(edgeOfCollision === "top") {
            Ball.velocity.y *= -1; 
            Ball.position.x -= 1;
        } else if (edgeOfCollision === "left" ){
            Ball.velocity.x *= -1; 
            Ball.position.x -= 1; 
        } else if(edgeOfCollision === "right"){
            Ball.velocity.x *= -1; 
            Ball.position.x += 1;
        }
    }
} 



export default Brick;

