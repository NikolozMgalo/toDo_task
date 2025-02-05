import Timeouts from '../constants/Timeouts.js';
import Logger from '../utils/Logger.js';

export default class BasePage {
  constructor(uniqueElement, name) {
    this.uniqueElement = uniqueElement;
    this.name = name;
  }

  /**
   * Check if the form is opened, with 'pageLoadTime' timeout
   * @returns {Promise<boolean>} true if opened else false
   */
  async isPageOpened() {
    Logger.info(`Waiting for page "${this.name}" to load`);
    const isOpened = await this.uniqueElement.state().waitForDisplayed({
      timeout: Timeouts.pageLoadTime
    });
    Logger.info(`Page "${this.name}" is opened - "${isOpened}"`);
    return isOpened;
  }
}
