import SHARED_DEPENDENCIES from './MainModule/index';

const { createjs } = SHARED_DEPENDENCIES;

export default class TextSetter extends createjs.Container {
  constructor({ editable = false, label = 'Hello', container }) {
    super();
    this.setDefaultText({ editable, label });
    this.setPositionOfText(container);
  }

  setDefaultText({ editable = false, label = 'Hello' }) {
    if (!editable) {
      this.enable = editable;
      this.text = new createjs.Text(label, '15px Arial', 'black');
      this.addChild(this.text);
    } else {
    // future use case
    }
  }

  setPositionOfText(container) { // eslint-disable-line class-methods-use-this
    const { width, height } = container.getBounds();
    const x = (width - this.text.getBounds().width) / 2;
    const y = (height - this.text.getBounds().height) / 2;
    this.set({ x, y });
  }
}
