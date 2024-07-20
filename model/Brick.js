export class Bricks{
    static nbBrick = 90;
    static #ligne = 0;
    static #column = 0;

    static matrixBrick = new Array(6).fill().map(() => new Array(15).fill().map(() => new Bricks()));
    constructor(){
        this.life = 1;
        this.width = 40;
        this.height = 20;
        this.x = Bricks.#column * this.width;
        this.y = Bricks.#ligne * this.height;

        this.ligne = Bricks.#ligne;
        this.column = Bricks.#column;
        if (Bricks.#column < 14) {
            Bricks.#column ++;
        }
        else{
            Bricks.#column = 0;
            Bricks.#ligne ++;
        }
    }

    hurt(){
        this.life--;
        if (this.life == 0) {
            Bricks.matrixBrick[this.ligne][this.column] = null
            Bricks.nbBrick--;
        }
    }

} 



export default Bricks;

