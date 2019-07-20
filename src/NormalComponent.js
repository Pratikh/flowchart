import SHARED_DEPENDENCIES from './MainModule/index';
import Shape from './Shape';
import TextSetter from './TextSetter';

const { createjs } = SHARED_DEPENDENCIES;
export default class NormalComponent extends Shape {
  constructor(config = {}) {
    super();
    this.create(config);
    this.name = 'NormalComponent';
    const text = new TextSetter({ editable: false, label: 'Normal', container: this });
    this.addChild(text);
    this.addDotsToShape();
  }

  create({
    width = 90, height = 60, x = 0, y = 0, fillColor = 'pink',
  }) {
    this.shape = new createjs.Shape();
    this.setBounds(0, 0, width, height);
    const g = this.shape.graphics;
    g.setStrokeStyle(1);
    g.beginStroke('black');
    g.beginFill(fillColor);
    g.drawRect(x, y, width, height);
    this.addChild(this.shape);
    this.addEventListeners();
  }
}
