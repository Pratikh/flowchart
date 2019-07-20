import SHARED_DEPENDENCIES from './MainModule';

import StartComponent from './StartComponent';
import NormalComponent from './NormalComponent';
import ModuleComponent from './ModuleComponent';
import TextSetter from './TextSetter';
import playArea from './PlayArea';
// import { initailShapeData, outerShapeContainerData } from './Constants';
// import OuterContainer from './setupStage';

const { createjs, stage, _ } = SHARED_DEPENDENCIES;

class Init {
  constructor() {
    this.stage = stage.stage;
    console.log(this.stage);
    this.startArr = [];
    this.normalArr = [];
    this.moduleArr = [];
    this.stage.droppableDot = null;
    // this.playArea = playArea;
    // this.stage.playArea = playArea;
    this.createStartComponent();
    this.createNormalComponent();
    this.createModelComponent();
  }

  createStartComponent() {
    const x = 60;
    const y = 60;
    const shapeContainer = new createjs.Container();
    shapeContainer.setBounds(0, 0, 0, 0);
    const shape = new createjs.Shape();
    shapeContainer.addChild(shape);
    shapeContainer.set({ x, y });
    const g = shape.graphics;
    g.setStrokeStyle(1);
    g.beginStroke('#000000');
    g.beginFill('pink');
    g.drawCircle(0, 0, 30);
    shapeContainer.addChild(shape);
    // this.OuterContainer.container.addChild(shapeContainer);
    this.stage.addChild(shapeContainer);
    const text = new TextSetter({ editable: false, label: 'Start', container: shapeContainer });
    shapeContainer.addChild(text);
    shape.addEventListener('mousedown', (event) => {
      const startComponentObj = new StartComponent();
      startComponentObj.set({ x: x / 2, y: y / 2 });
      this.stage.addChild(startComponentObj);
      // this.playArea.emptyContainer.addChild(startComponentObj);
      this.startArr.push(startComponentObj);
      startComponentObj.mouseDownEventHandler(event);
      console.log(this.OuterContainer);
    });

    shape.addEventListener('pressmove', (event) => {
      _.last(this.startArr).pressMoveEventHandler(event);
    });
  }

  createNormalComponent() {
    const x = 30;
    const y = 120;
    const shapeContainer = new createjs.Container();
    shapeContainer.set({ x, y });
    const shape = new createjs.Shape();
    shape.setBounds(0, 0, 90, 60);
    const g = shape.graphics;
    g.setStrokeStyle(1);
    g.beginStroke('#000000');
    g.beginFill('pink');
    g.drawRect(0, 0, 90, 60);
    shapeContainer.addChild(shape);
    this.stage.addChild(shapeContainer);

    const text = new TextSetter({ editable: false, label: 'Normal', container: shapeContainer });
    shapeContainer.addChild(text);

    shape.addEventListener('mousedown', (event) => {
      const normalComponentObj = new NormalComponent();
      normalComponentObj.set({ x, y });
      this.stage.addChild(normalComponentObj);
      this.normalArr.push(normalComponentObj);
      normalComponentObj.mouseDownEventHandler(event);
    });

    shape.addEventListener('pressmove', (event) => {
      _.last(this.normalArr).pressMoveEventHandler(event);
    });
  }

  createModelComponent() {
    const x = 30;
    const y = 220;
    const shapeContainer = new createjs.Container();
    shapeContainer.set({ x, y });
    const shape = new createjs.Shape();
    shape.setBounds(0, 0, 90, 50);
    const g = shape.graphics;
    g.setStrokeStyle(1).beginStroke('#000000').beginFill('pink').drawRoundRect(0, 0, 90, 50, 20);
    shapeContainer.addChild(shape);

    const text = new TextSetter({ editable: false, label: 'Model', container: shapeContainer });
    shapeContainer.addChild(text);
    this.stage.addChild(shapeContainer);

    shape.addEventListener('mousedown', (event) => {
      const moduleComponentObj = new ModuleComponent();
      this.stage.addChild(moduleComponentObj);
      moduleComponentObj.set({ x, y });
      this.moduleArr.push(moduleComponentObj);
      moduleComponentObj.mouseDownEventHandler(event);
    });

    shape.addEventListener('pressmove', (event) => {
      _.last(this.moduleArr).pressMoveEventHandler(event);
    });
  }
}
const init = new Init();
document.addEventListener('DOMContentLoaded', init, false); // eslint-disable-line no-undef
