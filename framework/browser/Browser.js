
import Timeouts from '../constants/Timeouts.js';
import Logger from '../utils/Logger.js';
import { Window } from './entities/Window.js';

class Browser {
  #Window;

  constructor() {
    this.#Window = new Window();
  }

  get Window() {
    return Object.assign(this.#Window, { browser: this.#getBrowser() });
  }

  /**
   * Get browser
   * @returns {Browser} Browser
   */
  #getBrowser() {
    return browser;
  }

  /**
   * Open web page by url
   * @param {string} url url to open
   * @returns {Promise<void>} 
   */
  async openUrl(url) {
    Logger.info(`Open url: "${url}"`);
    return this.#getBrowser().url(url);
  }

  /**
   * Press keyboard buttons
   * @param {String, Array[String]} keys - Array of string with keys names or string of key name to press  
   * @returns {Promise<void>} result of getUrl function
   */
  async pressKeys(keys) {
    Logger.info(`Press keyboard button "${keys}"`);
    return this.#getBrowser().keys(keys);
  }

  /**
   * Add screenshot to the report
   * @param {number} screenName name for screen
   * @param {boolean} isWait true if need delay before making screen
   * @param {number} timer delay before making screen (ms)
   * @returns {Promise<any>} result
   */
  async addScreenshot(screenName, isWait = false, timer) {
    Logger.info(`Make screenshot ${screenName}`);
    try {
      if (isWait) {
        await this.waitForDelay(timer);
      }
      await this.#getBrowser().takeScreenshot();
    } catch (err) {
      Logger.error(err);
    }
  }

  /**
   * Use this only if you can't detect an animation or loading in DOM
   * @param {number} timeout - the timeout in ms
   */
  async waitForDelay(timeout = Timeouts.baseDelay) {
    Logger.info(`Wait for ${timeout} delay`);
    return this.#getBrowser().pause(timeout);
  }
};


export default new Browser(browser);
