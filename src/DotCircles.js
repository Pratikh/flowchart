import * as createjs from 'createjs-module';
import * as _ from 'lodash';
import ConnectorLine from './ConnectorLine.js'

export default class DotCircles extends createjs.Container {
  constructor(config = {},container){
    super();
    _.bindAll(this,'mouseDownEventHandler','pressMoveEventHandler','mouseDownEventHandler','mouseOverEventHandler','pressUpEventHandler');
    this.shapeArr = [];
    this.config = config;
    this.x = config.x;
    this.y = config.y;
    this.visible = false;
    this.create(config);
    this.arrangeDots(container);
    this.container = container;
  }

  create({x = 0, y = 0, radius = 7, fillColor = 'yellow', strokeColor = '#000000'}){
    for(let i = 0; i<4; i++){
      const dotCircleContainer = new createjs.Container();
      dotCircleContainer.name = 'dotContainer';
      dotCircleContainer.setBounds(0,0,14,14);
      const shape = new createjs.Shape();
      dotCircleContainer.connectedLinesData = [];
      shape.id = i;
      const g = shape.graphics;
      g.setStrokeStyle(1);
      g.beginStroke();
      g.beginFill(fillColor);
      g.drawCircle(0,0,radius);

      dotCircleContainer.addChild(shape);
      this.addChild(dotCircleContainer);
      dotCircleContainer.addEventListener('mousedown',this.mouseDownEventHandler);
      dotCircleContainer.addEventListener('pressmove',this.pressMoveEventHandler);
      dotCircleContainer.addEventListener('mouseover',this.mouseOverEventHandler);
      dotCircleContainer.addEventListener('pressup',this.pressUpEventHandler);
      this.shapeArr.push(dotCircleContainer);
    }
  }

  arrangeDots(container){
    const {width, height} = container.getBounds();
    for(let i = 0; i<4; i++){
      if(i === 0){
        this.shapeArr[i].x = container.x + (width - 5)/2;
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
  }

  mouseDownEventHandler(event){
    event.stopPropagation();
    this.lineDraw = new ConnectorLine({},this.container);
    const bounds = event.currentTarget.getBounds();
    const location = event.currentTarget.localToGlobal(bounds.x,bounds.y);
    this.lineDraw.create({x:location.x,y:location.y,endx:location.x,endy:location.y});
    this.diffX = location.x - event.stageX;
    this.diffY = location.y - event.stageY;
  }

  pressMoveEventHandler(event){
    event.stopPropagation();
    const bounds = this.getBounds();
    this.lineDraw.updateLine(event.stageX ,event.stageY);
  }

  pressUpEventHandler(event){
    const startingPoint = event.currentTarget;
    event.currentTarget.stage.droppableDot.connectedLinesData.push({endTarget:event.currentTarget.stage.droppableDot,startingPoint,line:this.lineDraw});
    startingPoint.connectedLinesData.push({endTarget:event.currentTarget.stage.droppableDot,startingPoint,line:this.lineDraw});
  }

  mouseOverEventHandler(event){
    event.currentTarget.stage.droppableDot = event.currentTarget;
  }
}
