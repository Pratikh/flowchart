import * as createjs from 'createjs-module';

import StartComponent from './StartComponent.js'


class Init{
  constructor(){
    const canvas = document.getElementById('myCanvas');
    // console.log(canvas);
    this.stage = new createjs.Stage("myCanvas");
    console.log(this.stage);
    createjs.Ticker.addEventListener("tick", this.stage);
    // this.createStartComponent();
    const startComponentObj = new StartComponent();
    const startComponentObj2 = new StartComponent();
    const startComponentObj3 = new StartComponent();
    startComponentObj.x = 100;
    startComponentObj.y = 100;
    this.stage.addChild(startComponentObj,startComponentObj2,startComponentObj3);
  }

  createStartComponent(){
    var shape = new createjs.Shape();
    shape.setBounds(0,0,30);
    const g = shape.graphics;
    g.setStrokeStyle(1);
    g.beginStroke("#000000");
    g.beginFill("#e8f7ff");
    g.drawCircle(0,0,30);
    this.stage.addChild(shape);

    shape.addEventListener('mousedown', (event)=>{
      // const {x,y} = shape.globalToLocal(event.stageX,event.stageY);
      // console.log(shape.localToGlobal(event.stageX,event.stageY));
      const bounds = shape.getBounds();
      // shape.getBounds().y;
      const { x, y } = shape.localToGlobal(bounds.x,bounds.y);
      // console.log(x - event.stageX,y - event.stageY,event);
      this.diffX = x - event.stageX;
      this.diffY = y - event.stageY;
      console.log(this.diffX, this.diffY);
      // console.log(event);
    })

    shape.addEventListener('pressmove', (event)=>{
      // const {x,y} = shape.globalToLocal(event.stageX,event.stageY);
      // console.log(shape.globalToLocal(event.stageX,event.stageY));
      shape.x = event.stageX - this.diffX;
      shape.y = event.stageY - this.diffY;
      console.log(event);
    })
  }
}






const init = new Init();
document.addEventListener('DOMContentLoaded', init, false);
