import * as createjs from 'createjs-module';
import * as _ from 'lodash';
import DotCircles from './DotCircles.js'

export default class StartComponent extends createjs.Container {
  constructor(config = {}){
    super();
    _.bindAll(this,'mouseDownEventHandler','pressMoveEventHandler','mouseDownEventHandler','mouseOverEventHandler','mouseOutEventHandler',"addEventListeners","removeEventListeners");
    this.create(config);
    this.name = 'StartComponent';
    this.insertText('Start');
    this.dotCirclesObj = new DotCircles({x:0,y:0},this);
    this.addChild(this.dotCirclesObj);
  }

  create({width = 0, height = 0, radius = 30, fillColor = 'pink', strokeColor = '#000000'}){
    this.shape = new createjs.Shape();
    this.shape.set({ x:30, y:30 });
    this.shape.setBounds(width,height,radius);
    this.setBounds(0 ,0 ,60,60);
    const g = this.shape.graphics;
    g.setStrokeStyle(1);
    g.beginStroke('black');
    g.beginFill(fillColor);
    g.drawCircle(width,height,radius);
    this.addChild(this.shape);
    this.addEventListeners();
  }

  insertText(label = ''){
    const text = new createjs.Text(label, "15px Arial", "black");
    text.x = 15;
    text.y = 20;
    this.addChild(text);
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
  }

  mouseDownEventHandler(event){
    const bounds = this.getBounds();
    this.diffX = event.stageX - this.x;
    this.diffY = event.stageY - this.y;
  }

  pressMoveEventHandler(event){
    const bounds = this.getBounds();
    const { x, y } = this.parent.globalToLocal(event.stageX,event.stageY);
    this.x = x - this.diffX;
    this.y = y - this.diffY;

    for(let i = 0;i<4;i++){
      if(this.dotCirclesObj.shapeArr[i].connectedLinesData.length !== 0 ){
        const linesArr = this.dotCirclesObj.shapeArr[i].connectedLinesData;
        _.forEach(linesArr,(data)=>{
          data.line.shape.graphics.clear();
          const bounds = data.endTarget.getBounds();
          const location = data.endTarget.localToGlobal(bounds.x,bounds.y);
          const bounds1 = data.startingPoint.getBounds();
          const location1 = data.startingPoint.localToGlobal(bounds1.x,bounds1.y);
          data.line.updateLine(location1.x,location1.y,location.x,location.y);
        })
      }
    }
  }

  mouseDown(x,y){
  }

  moveElement(x , y){
  }

}
