import Model from "../../model/Model.js";
import brickCollision from "./brickCollision.js";
import wallCollision from "./wallCollision.js";
import barbellCollision from "./barbellCollision.js";

export class ModelController{
    constructor(p5){
        this.p5 = p5
        this.ball = Model.ball;
        setInterval(()=>{
            this.ball.Move();
            wallCollision();
            brickCollision(this.p5);
            barbellCollision();
        },1000/60)
    }
    
}

export default ModelController;