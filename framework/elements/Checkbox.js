import ElementType from '../constants/ElementType.js';
import Logger from '../utils/Logger.js';
import BaseElement from './BaseElement.js';

export class Checkbox extends BaseElement {
  constructor(locator, name) {
    super(locator, name);
    this.type = ElementType.CHECKBOX;
  }

  /**
   * Click on checkbox element to check 
   * @returns {Promise<void>}
   */
  async check() {
    Logger.info(`${this.log()}Click at checkbox to check`);
    return this.click();
  }
}
