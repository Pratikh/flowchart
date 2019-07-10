import * as createjs from 'createjs-module';
import * as _ from 'lodash';
import DotCircles from './DotCircles.js'

export default class NormalComponent extends createjs.Container {
  constructor(config = {}){
    super();
    _.bindAll(this,'mouseDownEventHandler','pressMoveEventHandler','mouseDownEventHandler','mouseOutEventHandler','mouseOverEventHandler',"addEventListeners","removeEventListeners");
    this.create(config);
    this.name = 'NormalComponent';
    this.insertText('Normal',50,140);
    this.dotCirclesObj = new DotCircles({x:30,y:120},this);
    this.addChild(this.dotCirclesObj);
  }

  create({width = 90 , height = 60 ,x = 30,y = 120 , fillColor = 'pink', strokeColor = '#000000'}){
    this.shape = new createjs.Shape();
    this.shape.setBounds(x,y,width,height);
    this.setBounds(x,y,width,height);
    const g = this.shape.graphics;
    g.setStrokeStyle(1);
    g.beginStroke('black');
    g.beginFill(fillColor);
    g.drawRect(x,y,width,height);
    this.addChild(this.shape);
    this.addEventListeners();
  }

  insertText(label = '',x ,y ){
    const text = new createjs.Text(label, "15px Arial", "black");
    text.x = x;
    text.y = y;
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
