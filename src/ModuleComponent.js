import * as createjs from 'createjs-module';
import * as _ from 'lodash';
import DotCircles from './DotCircles.js'

export default class ModuleComponent extends createjs.Container {
  constructor(config = {}){
    super();
    _.bindAll(this,'mouseDownEventHandler','pressMoveEventHandler','mouseDownEventHandler','mouseOutEventHandler','mouseOverEventHandler',"addEventListeners","removeEventListeners");
    console.log('in NormalComponent');
    this.create(config);
    this.insertText('Normal',50,240);
    this.dotCirclesObj = new DotCircles({x:30,y:220},this);
    this.addChild(this.dotCirclesObj);
  }

  create({width = 90 , height = 50 ,x = 30,y = 220 , fillColor = 'pink', strokeColor = '#000000'}){
    this.shape = new createjs.Shape();
    // this.shape.set({ x:60, y:120 });
    this.shape.setBounds(x,y,width,height);
    this.setBounds(x,y,width,height);
    const g = this.shape.graphics;
    g.setStrokeStyle(1);
    g.beginStroke('black');
    g.beginFill(fillColor);
    g.drawRoundRect(x,y,width,height,20);
    this.addChild(this.shape);
    this.addEventListeners();

  }

  insertText(label = '',x ,y ){
    const text = new createjs.Text(label, "15px Arial", "black");
    // const {width, height} = this.getBounds();
    text.x = x;
    text.y = y;
    this.addChild(text);
    // console.log('text:::',text);
  }

  addEventListeners(){
    this.addEventListener('mousedown',this.mouseDownEventHandler);
    this.addEventListener('pressmove',this.pressMoveEventHandler);
    this.addEventListener('mouseout',this.mouseOverEventHandler);
    this.addEventListener('mouseover',this.mouseOutEventHandler);

  }

  removeEventListeners(){
    this.removeEventListener('mousedown',this.mouseDownEventHandler);
    this.removeEventListener('pressmove',this.pressMoveEventHandler);
    this.removeEventListener('mouseover',this.mouseOverEventHandler);
    this.removeEventListener('mouseout',this.mouseOutEventHandler);
  }

  mouseOutEventHandler(){
    this.dotCirclesObj.visible = true;

  }

  mouseOverEventHandler(event){
    this.dotCirclesObj.visible = false;
  }
  mouseMoveEventHandler(event){
    // console.log('mouse move');
  }

  mouseDownEventHandler(event){
    // console.log(event);
    const bounds = this.getBounds();
    // console.log(bounds);
    // const { x, y } = this.localToGlobal(bounds.x,bounds.y);
    this.diffX = event.stageX - this.x;
    this.diffY = event.stageY - this.y;
    // console.log(this.diffX,this.diffY);
  }

  pressMoveEventHandler(event){
    const bounds = this.getBounds();
    const { x, y } = this.parent.globalToLocal(event.stageX,event.stageY);
    // console.log(x,y);
    this.x = x - this.diffX;
    this.y = y - this.diffY;
  }

  mouseDown(x,y){

  }
  moveElement(x , y){

  }
}
