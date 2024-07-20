import Brick from "../../model/Brick.js";
import Model from "../../model/Model.js";

export function brickCollision(p5){
    const ball = Model.ball;

    Brick.matrixBrick.forEach((arrayBrick) => {
        arrayBrick.forEach((brick) =>{
            if(brick instanceof Brick){

                let coordToTest;
                let edgeOfCollision;
                [coordToTest, edgeOfCollision] = findCoordToCheckAndEdgeCollided(brick, ball);
                
                   // get distance from closest edges
                const distX = ball.position.x-coordToTest.x;
                const distY = ball.position.y-coordToTest.y;
                const distance = Math.sqrt( (distX*distX) + (distY*distY) );
                
                
                // if the distance is less than the radius, collision!
                if (distance <=  ball.radius && edgeOfCollision != "") {
                    const impactPoint = p5.createVector(coordToTest.x, coordToTest.y); 
                    
                    preventOverlapping(impactPoint, ball);

                    brick.hurt();
                    brickCollisionResolution(edgeOfCollision, ball);
                }
                
            }
        })
    });
}

function findCoordToCheckAndEdgeCollided(brick, ball){
    // temporary variables to set edges for testing
    let edgeOfCollision = "";
    let testX = ball.position.x;
    let testY = ball.position.y;

    // which edge is closest?
    if (ball.position.x < brick.x) {
        edgeOfCollision = "left";
        testX = brick.x;     
    }
    else if (ball.position.x > brick.x+brick.width) {
        edgeOfCollision = "right"
        testX = brick.x+brick.width;   
    }
    if (ball.position.y <  brick.y){
        edgeOfCollision = "top"
        testY = brick.y;     
    } 
    else if (ball.position.y > brick.y+brick.height){
        edgeOfCollision = "bottom"
        testY = brick.y+brick.height;  
    } 

    return [{ x : testX, y : testY }, edgeOfCollision]
    
}

function preventOverlapping(impactPoint, ball){
    const distance = impactPoint.sub(ball.position);
    const overlap = ball.radius - distance.mag()
    distance.setMag(overlap)
    ball.position.add(distance);
}

function brickCollisionResolution(edgeOfCollision, ball){
    if (edgeOfCollision === "bottom"){
        ball.velocity.y *= -1; 
        ball.position.y += 1;
    } else if(edgeOfCollision === "top") {
        ball.velocity.y *= -1; 
        ball.position.y -= 1;
    } else if (edgeOfCollision === "left" ){
        ball.velocity.x *= -1; 
        ball.position.x -= 1; 
    } else if(edgeOfCollision === "right"){
        ball.velocity.x *= -1; 
        ball.position.x += 1;
    }
}

export default brickCollision;