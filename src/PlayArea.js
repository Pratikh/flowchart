import SHARED_DEPENDENCIES from './MainModule';
import { initailShapeData, outerShapeContainerData } from './Constants';

const { createjs, stage } = SHARED_DEPENDENCIES;

class PlayArea {
  constructor() {
    this.stage = stage.stage;
    this.createPlayArea();
  }

  createPlayArea() {
    const { initailShapeWidth, initailShapeHeight } = initailShapeData;
    this.initialShapeContainer = this.createShape({
      width: initailShapeWidth, height: initailShapeHeight, x: 10, y: 10,
    });
    const {
      outerShapeWidth, outerShapeHeight, ox, oy,
    } = outerShapeContainerData;

    this.outerShapeContainer = this.createShape({
      width: outerShapeWidth, height: outerShapeHeight, x: ox, y: oy, draggable: false,
    });
  }

  createShape({
    width, height, x, y, strokeStyle = 1, strokeColor = '#000000', draggable = false,
  }) {
    const shapeContainer = new createjs.Container();
    shapeContainer.name = 'shapeContainer';
    const shape = new createjs.Shape();
    shapeContainer.addChild(shape);
    shapeContainer.setBounds(0, 0, width, height);
    shapeContainer.set({ x, y });
    shape.graphics.setStrokeStyle(strokeStyle).beginStroke(strokeColor).drawRect(0, 0, width, height);
    shapeContainer.addChild(shape);
    this.stage.addChild(shapeContainer);
    console.log(draggable);
    draggable && this.addDragger({ // eslint-disable-line no-unused-expressions
      width, height, x, y, container: shapeContainer,
    });
    return shapeContainer;
  }

  addDragger({ // eslint-disable-line class-methods-use-this
    container, width, height,
  }) {
    // const emptyContainer = new createjs.Container();
    // emptyContainer.name = 'emptyContainer';
    // emptyContainer.setBounds(0, 0, width, height);
    // emptyContainer.set({ x: 0, y: 0 });
    // this.stage.addChild(emptyContainer);
    // this.emptyContainer = emptyContainer;

    const hitAreashapeContainer = new createjs.Container();
    hitAreashapeContainer.name = 'hitAreashapeContainer';
    const shape = new createjs.Shape();
    hitAreashapeContainer.addChild(shape);
    hitAreashapeContainer.setBounds(0, 0, width, height);
    hitAreashapeContainer.set({ x: 0, y: 0 });
    shape.graphics.beginFill('black').drawRect(0, 0, width, height);
    container.hitArea = hitAreashapeContainer; // eslint-disable-line no-param-reassign

    container.addEventListener('mousedown', (event) => {
      const { stageX, stageY } = event;
      this.diffX = stageX - this.emptyContainer.x;
      this.diffY = stageY - this.emptyContainer.y;
      console.log(this.diffX, this.diffY);
      // this.emptyContainer.x = event.stageX;
      // this.emptyContainer.y = event.stageY;
    });

    container.addEventListener('pressmove', (event) => {
      console.log('playArea pressmove', event);
      // const { stageX, stageY } = event;
      // this.emptyContainer.x = stageX - this.diffX;
      // this.emptyContainer.y = stageY - this.diffY;
    });
  }
}

const playArea = new PlayArea();
export default playArea;
