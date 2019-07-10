import * as createjs from 'createjs-module';
import * as _ from 'lodash';
import ConnectorLine from './ConnectorLine.js'

export default class DotCircles extends createjs.Container {
  constructor(config = {},container){
    super();
    _.bindAll(this,'mouseDownEventHandler','pressMoveEventHandler','mouseDownEventHandler','mouseOverEventHandler','pressUpEventHandler');
    // console.log('in StartComponent',ConnectorLine);
    this.shapeArr = [];
    this.config = config;
    this.x = config.x;
    this.y = config.y;
    this.visible = false;
    this.create(config);
    this.arrangeDots(container);
    this.container = container;
    console.log(this.container);
  }

  create({width = 5, height = 5, radius = 5, fillColor = 'yellow', strokeColor = '#000000'}){
    for(let i = 0; i<4; i++){
      // this.setBounds(40,40,40,40);
      const shape = new createjs.Shape();
      shape.setBounds(width,height,radius);
      shape.connectedLinesData = [];
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
      // console.log(shape);
      this.shapeArr.push(shape);
    }
  }

  arrangeDots(container){
    const {width, height} = container.getBounds();
    // console.log('arranging dots');
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
    // console.log('mouse move');
  }

  mouseDownEventHandler(event){
    console.log(event.target);
    event.stopPropagation();
    // this.container.removeEventListeners();
    this.lineDraw = new ConnectorLine({},this.container);
    this.lineDraw.create({x:event.currentTarget.x + this.config.x,y:event.currentTarget.y + this.config.y,endx:event.currentTarget.x + this.config.x,endy:event.currentTarget.y + this.config.y});
    const bounds = event.currentTarget.getBounds();
    const { x, y } = event.currentTarget.localToGlobal(bounds.x,bounds.y);
    // console.log(x,y);
    this.diffX = x - event.stageX;
    this.diffY = y - event.stageY;
  }

  pressMoveEventHandler(event){
    event.stopPropagation();

    const { x, y } = this.globalToLocal(event.stageX ,event.stageY);
    this.lineDraw.updateLine(x - this.diffX + this.config.x, y - this.diffY + this.config.y)
  }

  pressUpEventHandler(event){
    // this.container.addEventListeners();
    const endTarget = this.container.stage.getObjectUnderPoint(event.stageX,event.stageY);
    const startingPoint = event.currentTarget;
    console.log(this.container.stage.getObjectUnderPoint(event.stageX,event.stageY));

    // console.log(event.target.localToGlobal(event.stageX,event.stageY));
    event.target.connectedLinesData.push({endTarget,startingPoint,line:this.lineDraw});
    endTarget.connectedLinesData.push({endTarget,startingPoint,line:this.lineDraw});
    console.log('in up event',event);
    // console.log(getObjectUnderPoint);

  }

  mouseOverEventHandler(event){
  }
}
