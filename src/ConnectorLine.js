import SHARED_DEPENDENCIES from './MainModule';

const { createjs } = SHARED_DEPENDENCIES;

export default class ConnectorLine extends createjs.Container {
  constructor({ container }) {
    super();
    this.container = container;
    this.container.stage.addChild(this);
  }

  create({ x = 0, y = 0 }) {
    this.shape = new createjs.Shape();
    this.shapeX = x;
    this.shapeY = y;
    this.shape.graphics.setStrokeStyle(1);
    this.shape.graphics.beginStroke('black');
    this.shape.graphics.moveTo(x, y);
    this.shape.graphics.endStroke();
    this.addChild(this.shape);
  }

  updateLine(x, y, shapex = this.shapeX, shapey = this.shapeY) {
    this.shape.graphics.clear();
    this.shape.graphics.setStrokeStyle(1);
    this.shape.graphics.beginStroke('black');
    this.shape.graphics.moveTo(shapex, shapey);
    this.shape.graphics.lineTo(x, y);
    this.shape.graphics.endStroke();
  }
}
