import * as createjs from 'createjs-module';
import * as _ from 'lodash';

import StartComponent from './StartComponent.js'
import NormalComponent from './NormalComponent.js'
import ModuleComponent from './ModuleComponent.js'


class Init{
  constructor(){
    const canvas = document.getElementById('myCanvas');
    window.display = this;
    this.stage = new createjs.Stage("myCanvas");
    this.stage.enableMouseOver(10)
    createjs.Ticker.addEventListener("tick", this.stage);
    this.startArr = [];
    this.normalArr = [];
    this.moduleArr = [];
    this.createStartComponent();
    this.createNormalComponent();
    this.createModelComponent();
  }

  createStartComponent(){
    const x = 60;
    const y = 60;
    var shape = new createjs.Shape();
    shape.setBounds(x,y,30);
    const g = shape.graphics;
    g.setStrokeStyle(1);
    g.beginStroke("#000000");
    g.beginFill('pink');
    g.drawCircle(x,y,30);
    this.stage.addChild(shape);

    const text = new createjs.Text('Start', "15px Arial", "black");
    text.x = 47;
    text.y = 51;
    this.stage.addChild(text);
    this.stage.droppableDot = null;

    shape.addEventListener('mousedown', (event)=>{
      const startComponentObj = new StartComponent();
      startComponentObj.set({x:30,y:30});
      this.stage.addChild(startComponentObj);
      this.startArr.push(startComponentObj);
      startComponentObj.mouseDownEventHandler(event);
    })

    shape.addEventListener('pressmove', (event)=>{
      _.last(this.startArr).pressMoveEventHandler(event);
    })
  }

  createNormalComponent(){
    const x = 30;
    const y = 120;
    var shape = new createjs.Shape();
    shape.setBounds(x,y,90,60);
    const g = shape.graphics;
    g.setStrokeStyle(1);
    g.beginStroke("#000000");
    g.beginFill('pink');
    g.drawRect(x,y,90,60);
    this.stage.addChild(shape);

    const text = new createjs.Text('Normal', "15px Arial", "black");
    text.x = 50;
    text.y = 140;
    this.stage.addChild(text);


    shape.addEventListener('mousedown', (event)=>{
      const normalComponentObj = new NormalComponent();
      this.stage.addChild(normalComponentObj);
      this.normalArr.push(normalComponentObj);
      normalComponentObj.mouseDownEventHandler(event);
    })

    shape.addEventListener('pressmove', (event)=>{
      _.last(this.normalArr).pressMoveEventHandler(event);
    })
  }
  createModelComponent(){
    const x = 30;
    const y = 220;
    var shape = new createjs.Shape();
    shape.setBounds(x,y,90,60);
    const g = shape.graphics;
    g.setStrokeStyle(1);
    g.beginStroke("#000000");
    g.beginFill('pink');
    g.drawRoundRect(x,y,90,50,20);
    this.stage.addChild(shape);

    const text = new createjs.Text('Model', "15px Arial", "black");
    text.x = 50;
    text.y = 240;
    this.stage.addChild(text);


    shape.addEventListener('mousedown', (event)=>{
      const moduleComponentObj = new ModuleComponent();
      this.stage.addChild(moduleComponentObj);
      this.moduleArr.push(moduleComponentObj);
      moduleComponentObj.mouseDownEventHandler(event);
    })

    shape.addEventListener('pressmove', (event)=>{
      _.last(this.moduleArr).pressMoveEventHandler(event);
    })
  }
}
const init = new Init();
document.addEventListener('DOMContentLoaded', init, false);
