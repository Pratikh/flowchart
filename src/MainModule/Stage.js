import * as createjs from 'createjs-module';

class Stage {
  constructor() {
    this.stage = new createjs.Stage('myCanvas');
    this.stage.enableMouseOver(10);
    createjs.Ticker.addEventListener('tick', this.stage);
  }
}

const stage = new Stage();
export default stage;
