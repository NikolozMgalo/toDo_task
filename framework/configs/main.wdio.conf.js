export const mainConfig = {
    runner: 'local',
    exclude: [
    ],
    maxInstances: 1,
    logLevel: 'warn',
    bail: 0,
    waitforTimeout: 0,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    reporters: ['spec'],
    baseUrl: 'https://todomvc.com/examples/react/dist/',

    afterStep: async function (step, scenario, result, context) {
        if(!result.passed) {
            await browser.takeScreenshot();
        }
    },
};
