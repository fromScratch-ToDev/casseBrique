import Ball from "./Ball.js";
import Barbell from "./Barbell.js";
import Brick from "./Brick.js";
import Player from "./Player.js";


export class Model{
    static ball;
    static barbell;
    static player;
    constructor(){
        throw new Error("Cette classe ne peut pas être instancier");
    }

    static loadModel(p5) {
        Model.ball = new Ball(p5)
        Model.barbell = new Barbell();
        Model.player = new Player();
    }

}

export default Model;