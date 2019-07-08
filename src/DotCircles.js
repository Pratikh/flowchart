import * as createjs from 'createjs-module';
import * as _ from 'lodash';
// import ConnectorLine from './ConnectorLine.js'

export default class DotCircles extends createjs.Container {
  constructor(config = {},container){
    super();
    _.bindAll(this,'mouseDownEventHandler','pressMoveEventHandler','mouseDownEventHandler','mouseOverEventHandler','pressUpEventHandler');
    // console.log('in StartComponent',ConnectorLine);
    this.shapeArr = [];
    this.create(config);
    this.arrangeDots(container);
    this.container = container;
  }

  create({width = 5, height = 5, radius = 5, fillColor = '#222', strokeColor = '#000000'}){
    for(let i = 0; i<4; i++){
      const shape = new createjs.Shape();
      shape.setBounds(width,height,radius);
      shape.id = i;
      const g = shape.graphics;
      g.setStrokeStyle(1);
      g.beginStroke();
      g.beginFill(fillColor);
      g.drawCircle(width,height,radius);
      this.addChild(shape);
      shape.addEventListener('mousedown',this.mouseDownEventHandler);
      shape.addEventListener('pressmove',this.pressMoveEventHandler);
      shape.addEventListener('mouseover',this.mouseOverEventHandler);
      shape.addEventListener('pressup',this.pressUpEventHandler);
      console.log(shape);
      this.shapeArr.push(shape);
    }
  }

  arrangeDots(container){
    const {width, height} = container.getBounds();
    console.log('arranging dots');
    for(let i = 0; i<4; i++){
      if(i === 0){
        this.shapeArr[i].x = container.x + (width - 5)/2;
        // this.shapeArr[i].y = container.y + height/2;
      }
      if(i === 1){
        this.shapeArr[i].y = container.y + (height - 5)/2;
      }
      if(i === 2){
        this.shapeArr[i].x = container.x + (width - 5);
        this.shapeArr[i].y = container.y + (height - 5)/2;
      }
      if(i === 3){
        this.shapeArr[i].x = container.x + (width -5)/2;
        this.shapeArr[i].y = container.y + (height -5);
      }
    }
  }

  mouseMoveEventHandler(event){
    console.log('mouse move');
  }

  mouseDownEventHandler(event){
    // this.lineDraw = new ConnectorLine({x:event.currentTarget.x,y:event.currentTarget.y,endx:event.currentTarget.x+10,endy:event.currentTarget.y + 10});
    // this.container.removeEventListeners();
    // const bounds = event.currentTarget.getBounds();
    // const { x, y } = event.currentTarget.localToGlobal(bounds.x,bounds.y);
    // this.diffX = x - event.stageX;
    // this.diffY = y - event.stageY;
  }

  pressMoveEventHandler(event){
    console.log('press move');
    // this.lineDraw.updateLine(event.stageX,event.stageY);
    // const bounds = event.currentTarget.getBounds();
    // const { x, y } = this.globalToLocal(event.stageX,event.stageY);
    // console.log(x,y);
    // this.shapeArr[event.currentTarget.id].x = x - this.diffX;
    // this.shapeArr[event.currentTarget.id].y = y - this.diffY;
  }

  pressUpEventHandler(event){
    this.container.addEventListeners();

  }

  mouseOverEventHandler(event){
  }
}
