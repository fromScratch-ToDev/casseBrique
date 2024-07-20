import Model from "../model/Model.js";


class MouseController{
    static mouseClicked(p) {
        if (!Model.ball.isThrow) {
            Model.ball.velocity.add(0,-8)
            Model.ball.isThrow = true;
        }
    }
    
    static mouseMoved(p) {
        if (p.mouseX >= 0 && p.mouseX <= p.width) {
            Model.barbell.coordX = p.mouseX;
            if (!Model.ball.isThrow) {
                Model.ball.position.x = p.mouseX; 
            }
        }
    }
}

export default MouseController;