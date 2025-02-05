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

  /**
   * Check if checkbox element is selected 
   * @returns {Promise<boolean>}
   */
  async isChecked() {
    await this.state().isDisplayed();
    Logger.info(`${this.log()}Checking if checkbox is selected`);
    return this.state().isSelected();
  }
}
