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
    shape.graphics.setStrokeStyle(strokeStyle).beginStroke(strokeColor);
    shape.graphics.drawRect(0, 0, width, height);
    shapeContainer.addChild(shape);
    this.stage.addChild(shapeContainer);
    draggable && this.addDragger({ // eslint-disable-line no-unused-expressions
      width, height, x, y, container: shapeContainer,
    });
    return shapeContainer;
  }

  addDragger({ // eslint-disable-line class-methods-use-this
    container, width, height,
  }) {
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
    });
  }
}

const playArea = new PlayArea();
export default playArea;
