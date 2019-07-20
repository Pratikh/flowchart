import SHARED_DEPENDENCIES from './MainModule/index';

import ConnectorLine from './ConnectorLine';
// import Arrow from './Arrow';

const { createjs, _ } = SHARED_DEPENDENCIES;

export default class DotCircles extends createjs.Container {
  constructor(config = {}) {
    super();
    _.bindAll(this, 'create', 'mouseDownEventHandler', 'pressMoveEventHandler', 'mouseDownEventHandler', 'mouseOverEventHandler', 'pressUpEventHandler');
    this.shapeArr = [];
    this.config = config;
    this.visible = false;
    this.container = config.container;
    this.create(config);
    this.arrangeDots(config.container);
  }

  create({
    x = 0, y = 0, radius = 7, fillColor = 'yellow',
  }) {
    for (let i = 0; i < 4; i++) { // eslint-disable-line no-plusplus
      const dotCircleContainer = new createjs.Container();
      dotCircleContainer.name = 'dotContainer';
      dotCircleContainer.setBounds(x, y, 14, 14);
      const shape = new createjs.Shape();
      dotCircleContainer.connectedLinesData = [];
      shape.id = i;
      const g = shape.graphics;
      g.setStrokeStyle(1);
      g.beginStroke();
      g.beginFill(fillColor);
      g.drawCircle(0, 0, radius);

      dotCircleContainer.addChild(shape);
      this.container.addChild(dotCircleContainer);
      dotCircleContainer.addEventListener('mousedown', this.mouseDownEventHandler);
      dotCircleContainer.addEventListener('pressmove', this.pressMoveEventHandler);
      dotCircleContainer.addEventListener('mouseover', this.mouseOverEventHandler);
      dotCircleContainer.addEventListener('pressup', this.pressUpEventHandler);
      this.shapeArr.push(dotCircleContainer);
    }
  }

  arrangeDots(container) {
    const { width, height } = container.getBounds();
    for (let i = 0; i < 4; i++) { // eslint-disable-line no-plusplus
      if (i === 0) {
        this.shapeArr[i].name = 'topDot';
        this.shapeArr[i].x = container.x + (width - 5) / 2;
        this.shapeArr[i].y = 0;
      }
      if (i === 1) {
        this.shapeArr[i].name = 'leftDot';
        this.shapeArr[i].x = 0;
        this.shapeArr[i].y = container.y + (height - 5) / 2;
      }
      if (i === 2) {
        this.shapeArr[i].name = 'rightDot';
        this.shapeArr[i].x = container.x + (width - 5);
        this.shapeArr[i].y = container.y + (height - 5) / 2;
      }
      if (i === 3) {
        this.shapeArr[i].name = 'bottomDot';
        this.shapeArr[i].x = container.x + (width - 5) / 2;
        this.shapeArr[i].y = container.y + (height - 5);
      }
    }
  }

  mouseDownEventHandler(event) {
    console.log(this.container);
    event.stopPropagation();
    const { stageX, stageY } = event;
    if (this.container.boundaryConditionChecker({ stageX, stageY })) {
      this.lineDraw = new ConnectorLine({ container: this.container });
      const bounds = event.currentTarget.getBounds();
      const location = event.currentTarget.localToGlobal(bounds.x, bounds.y);
      this.lineDraw.create({
        x: location.x, y: location.y, endx: location.x, endy: location.y,
      });
      this.diffX = location.x - event.stageX;
      this.diffY = location.y - event.stageY;
    }
  }

  pressMoveEventHandler(event) {
    event.stopPropagation();
    const { stageX, stageY } = event;

    if (this.container.boundaryConditionChecker({ stageX, stageY })) {
      this.lineDraw.updateLine(event.stageX, event.stageY);
    }
  }

  pressUpEventHandler(event) {
    const { stageX, stageY } = event;

    if (this.container.boundaryConditionChecker({ stageX, stageY })) {
      const startingPoint = event.currentTarget;
      const { droppableDot } = event.currentTarget.stage;
      const connectedLinesData = { endTarget: droppableDot, startingPoint, line: this.lineDraw };
      event.currentTarget.stage.droppableDot.connectedLinesData.push(connectedLinesData);
      startingPoint.connectedLinesData.push(connectedLinesData);
    }
    // this.arrow = new Arrow(connectedLinesData);
  }

  mouseOverEventHandler(event) {
    this.container.stage.droppableDot = event.currentTarget;
  }
}
