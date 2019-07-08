import * as createjs from 'createjs-module';
import * as _ from 'lodash';
import DotCircles from './DotCircles.js'

export default class StartComponent extends createjs.Container {
  constructor(config = {}){
    super();
    _.bindAll(this,'mouseDownEventHandler','pressMoveEventHandler','mouseDownEventHandler',"addEventListeners","removeEventListeners");
    console.log('in StartComponent');
    this.create(config);
    const dotCirclesObj = new DotCircles({},this);
    this.addChild(dotCirclesObj);
  }

  create({width = 0, height = 0, radius = 30, fillColor = 'pink', strokeColor = '#000000'}){
    this.shape = new createjs.Shape();
    this.shape.set({ x:30, y:30 });
    this.shape.setBounds(width,height,radius);
    this.setBounds(0 ,0 ,60,60);
    const g = this.shape.graphics;
    g.setStrokeStyle(1);
    g.beginStroke();
    g.beginFill(fillColor);
    g.drawCircle(width,height,radius);
    this.addChild(this.shape);
    this.addEventListeners();

  }

  addEventListeners(){
    this.addEventListener('mousedown',this.mouseDownEventHandler)
    this.addEventListener('pressmove',this.pressMoveEventHandler)
  }

  removeEventListeners(){
    this.removeEventListener('mousedown',this.mouseDownEventHandler)
    this.removeEventListener('pressmove',this.pressMoveEventHandler)
  }
  mouseMoveEventHandler(event){
    console.log('mouse move');
  }

  mouseDownEventHandler(event){
    console.log(event);
    const bounds = this.getBounds();
    console.log(bounds);
    // const { x, y } = this.localToGlobal(bounds.x,bounds.y);
    this.diffX = event.stageX - this.x;
    this.diffY = event.stageY - this.y;
    console.log(this.diffX,this.diffY);
  }

  pressMoveEventHandler(event){
    const bounds = this.getBounds();
    const { x, y } = this.parent.globalToLocal(event.stageX,event.stageY);
    console.log(x,y);
    this.x = x - this.diffX;
    this.y = y - this.diffY;
  }
}
