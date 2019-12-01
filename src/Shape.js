import SHARED_DEPENDENCIES from './MainModule/index';
import DotCircles from './DotCircles';
import { outerShapeContainerData } from './Constants';

const { createjs, _ } = SHARED_DEPENDENCIES;

export default class Shape extends createjs.Container {
  constructor() {
    super();
    _.bindAll(this, 'boundaryConditionChecker', 'pressUpEventHandler', 'addDotsToShape', 'mouseDownEventHandler', 'pressMoveEventHandler', 'mouseDownEventHandler', 'mouseOutEventHandler', 'mouseOverEventHandler');
  }

  create() { // eslint-disable-line class-methods-use-this
    // need to override this class
  }

  addDotsToShape() {
    this.dotCirclesObj = new DotCircles({ x: 0, y: 0, container: this });
    this.addChild(this.dotCirclesObj);
  }

  addEventListeners() {
    this.addEventListener('mousedown', this.mouseDownEventHandler);
    this.addEventListener('pressmove', this.pressMoveEventHandler);
    this.addEventListener('mouseout', this.mouseOverEventHandler);
    this.addEventListener('mouseover', this.mouseOutEventHandler);
    this.addEventListener('pressup', this.pressUpEventHandler);
  }

  pressUpEventHandler() {
    // console.log('here', event, this.globalToLocal(event.stageX, event.stageY));
    this.a = 's';
  }

  mouseOutEventHandler() {
    _.forEach(this.dotCirclesObj.shapeArr, (container) => {
        container.visible = true; // eslint-disable-line
    });
  }

  mouseOverEventHandler() {
    _.forEach(this.dotCirclesObj.shapeArr, (container) => {
        container.visible = false; // eslint-disable-line
    });
  }

  mouseMoveEventHandler() { // eslint-disable-line class-methods-use-this
    // for future use
  }

  mouseDownEventHandler(event) {
    this.diffX = event.stageX - this.x;
    this.diffY = event.stageY - this.y;
  }

  pressMoveEventHandler(event) {
    event.stopPropagation();
    const { stageX, stageY } = event;
    if (this.boundaryConditionChecker({ stageX, stageY })) {
      const { x, y } = this.parent.globalToLocal(stageX, stageY);
      this.x = x - this.diffX;
      this.y = y - this.diffY;
    }

    for (let i = 0; i < 4; i++) { // eslint-disable-line no-plusplus
      if (this.dotCirclesObj.shapeArr[i].connectedLinesData.length !== 0) {
        const linesArr = this.dotCirclesObj.shapeArr[i].connectedLinesData;
        _.forEach(linesArr, (data) => {
          data.line.shape.graphics.clear();
          const bounds = data.endTarget.getBounds();
          const location = data.endTarget.localToGlobal(bounds.x, bounds.y);
          const bounds1 = data.startingPoint.getBounds();
          const location1 = data.startingPoint.localToGlobal(bounds1.x, bounds1.y);
          data.line.updateLine(location1.x, location1.y, location.x, location.y);
        });
      }
    }
  }

  boundaryConditionChecker({ stageX, stageY }) {
    const {
      outerShapeWidth, outerShapeHeight, ox, oy,
    } = outerShapeContainerData;
    const { width, height } = this.getBounds();
    const topCondition = stageX > (ox + this.diffX) && stageY > (oy + this.diffY);
    const bottomCondition = stageX < (ox + outerShapeWidth - (width - this.diffX))
    && stageY < (oy + outerShapeHeight - (height - this.diffY));
    const boundaryCondition = topCondition && bottomCondition;
    return boundaryCondition;
  }
}
