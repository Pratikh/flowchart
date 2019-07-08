import * as createjs from 'createjs-module';
import * as _ from 'lodash';

export default class ConnectorLine extends createjs.Container {
  constructor(config = {},container){
    super();
    // _.bindAll(this,'mouseDownEventHandler','pressMoveEventHandler','mouseDownEventHandler','mouseOverEventHandler','pressUpEventHandler');
    // console.log('in StartComponent');
    // this.shapeArr = [];
    // this.create(config);
    // this.arrangeDots(container);
    // this.container = container;
  }

  create({x = 0, y = 0, endx,endy}){
    this.shape = new createjs.Shape();
    this.shape.graphics.setStrokeStyle(3);
    this.shape.graphics.beginStroke(color);
    this.shape.graphics.moveTo(x, y);
    this.shape.graphics.lineTo(endx, endy);
    this.shape.graphics.endStroke();
    this.shapeX = x;
    this.shapeY = y;
    // this.shape.set({ x:30, y:30 });
    // this.shape.setBounds(width,height,radius);
    // this.setBounds(0 ,0 ,60,60);
    // const g = this.shape.graphics;
    // g.setStrokeStyle(1);
    // g.beginStroke();
    // g.beginFill(fillColor);
    // g.drawCircle(width,height,radius);
    // this.addChild(this.shape);
    // this.addEventListeners();
  }

  updateLine(x ,y){
    this.shape.clear();
    this.shape.graphics.setStrokeStyle(3);
    this.shape.graphics.beginStroke(color);
    this.shape.graphics.moveTo(this.shapeX, this.shapeY);
    this.shape.graphics.lineTo(x, y);
    this.shape.graphics.endStroke();
  }
}
