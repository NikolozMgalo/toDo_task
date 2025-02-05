import Logger from '../../utils/Logger.js';

export class Window {

    constructor() {
        this.browser = null;
    }

    /**
     * Refresh browser tab
     * @returns {Promise<void>}
     */
    async refresh() {
        Logger.info('Refresh the current page');
        return this.browser.refresh();
    }
};
