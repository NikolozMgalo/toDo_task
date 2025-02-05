import Browser from '../browser/Browser.js';
import ElementType from '../constants/ElementType.js';
import Logger from '../utils/Logger.js';
import ElementStateProvider from './helper/StateProvider.js';

export default class BaseElement {
    constructor(locator, name) {
        this.locator = locator;
        this.name = name;
        this.type = ElementType.ELEMENT;
    }

    getLocator = () => typeof this.locator === 'string' ? this.locator : this.locator.selector;

    log = () => `${this.type} - "${this.name}" - by locator "${this.getLocator()}":\n\t`;

    state = () => new ElementStateProvider(this._get$(), this.name);

    _get$() {
        let selector;
        if (typeof this.locator === 'string') {
            selector = $(this.locator);
        } else {
            selector = this.locator;
        }
        return selector;
    }

    /**
     * Click on element
     * @param {object} options - Options containing `byJS` boolean setting
     * @returns {Promise<void>}
     */
    async _click({ byJS } = { byJS: false }) {
        const logMsg = byJS ? ' by JS executing' : '';
        Logger.info(`${this.log()}Click at element${logMsg}`);
        await this.state().waitForExist();

        const element = await this._get$();
        if (byJS) {
            return Browser.executeScript('arguments[0].click();', element);
        } else {
            return element.click();
        }
    }

    /**
     * Click on element
     * @returns {Promise<void>}
     */
    async click() {
        return this._click({ byJS: false });
    }


    /**
     * Get text from element
     * @returns {Promise<string>} Text from element
     */
    async getText() {
        Logger.info(`${this.log()}Get text from element`);
        await this.state().waitForExist();

        const element = await this._get$()
        const text = await element.getText();
        Logger.info(`Received text: "${text}"`);
        return text;
    }
}
