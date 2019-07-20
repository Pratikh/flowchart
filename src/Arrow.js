// import { SHARED_DEPENDENCIES } from './MainModule/index';
//
// const { createjs } = SHARED_DEPENDENCIES;
//
// export default class Arrow extends createjs.Container {
//   constructor(config) {
//     super();
//     this.config = config;
//     this.createArrow();
//   }
//
//   createArrow() {
//     this.setBounds(0, 0, 20, 20);
//     const arrowShape = new createjs.Shape();
//     arrowShape.graphics.beginFill('black');
//     arrowShape.graphics.moveTo(10, 10);
//     arrowShape.graphics.lineTo(10, 20);
//     arrowShape.graphics.lineTo(20, 20);
//     arrowShape.graphics.lineTo(10, 10);
//     this.addChild(arrowShape);
//     this.config.line.addChild(this);
//     this.x = this.config.x;
//     this.y = this.config.y;
//     this.config.endTarget.localToGlobal();
//     console.log(this.config.endTarget.localToGlobal());
//   }
//
//   findAngle(cx, cy, ex, ey) {
//     const dy = ey - cy;
//     const dx = ex - cx;
//     let theta = Math.atan2(dy, dx);
//     theta *= 180 / Math.PI;
//     return theta;
//   }
// }
