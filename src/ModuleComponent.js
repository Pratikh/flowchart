import SHARED_DEPENDENCIES from './MainModule/index';
import Shape from './Shape';
import TextSetter from './TextSetter';

const { createjs } = SHARED_DEPENDENCIES;

export default class ModuleComponent extends Shape {
  constructor(config = {}) {
    super();
    this.create(config);
    this.name = 'ModuleComponent';
    const text = new TextSetter({ editable: false, label: 'Model', container: this });
    this.addChild(text);
    this.addDotsToShape();
  }

  create({
    width = 90, height = 50, x = 0, y = 0, fillColor = 'pink',
  }) {
    this.shape = new createjs.Shape();
    this.shape.set({ x: 0, y: 0 });

    this.shape.setBounds(x, y, width, height);
    this.setBounds(x, y, width, height);
    const g = this.shape.graphics;
    g.setStrokeStyle(1);
    g.beginStroke('black');
    g.beginFill(fillColor);
    g.drawRoundRect(x, y, width, height, 20);
    this.addChild(this.shape);
    this.addEventListeners();
  }
}
