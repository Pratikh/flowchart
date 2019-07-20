import SHARED_DEPENDENCIES from './MainModule/index';
import Shape from './Shape';
import TextSetter from './TextSetter';

const { createjs } = SHARED_DEPENDENCIES;

export default class StartComponent extends Shape {
  constructor(config = {}) {
    super();
    this.create(config);
    this.name = 'StartComponent';
    this.addDotsToShape();
    const text = new TextSetter({ editable: false, label: 'Start', container: this });
    this.addChild(text);
  }

  create({
    x = 0, y = 0, radius = 30, fillColor = 'pink',
  }) {
    this.shape = new createjs.Shape();
    this.shape.set({ x: 30, y: 30 });
    this.setBounds(0, 0, radius * 2, radius * 2);
    const g = this.shape.graphics;
    g.setStrokeStyle(1);
    g.beginStroke('black');
    g.beginFill(fillColor);
    g.drawCircle(x, y, radius);
    this.addChild(this.shape);
    this.addEventListeners();
  }
}
