import Model from "./model/Model.js";
import Canvas from "./view/Canvas.js";
import MouseController from "./controller/MouseController.js";
import ModelController from "./controller/modelController/ModelController.js";


new p5((p) => {
    const canvas = new Canvas();
    // Optional preload function
    p.preload = () => {
        Model.loadModel(p);
        new ModelController(p);
    };
    
    // Setup function
    p.setup = () => {
        canvas.setup(p);
    };
  
    // Draw function
    p.draw = () => {
        canvas.draw(p);
    };

    p.mouseClicked = () => {
        MouseController.mouseClicked(p);
    }

    p.mouseMoved = () => {
        MouseController.mouseMoved(p);
    }
  });



