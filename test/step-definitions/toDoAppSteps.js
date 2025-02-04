import { Given, When, Then } from '@wdio/cucumber-framework';
import Browser from '../../framework/browser/Browser.js'
import AllureReporter from '@wdio/allure-reporter';
import { mainConfig } from '../../framework/configs/main.wdio.conf.js';
import ToDoAppPage from '../page-objects/todoAppPage.js';
import { assert } from 'chai';

Given('User is on the to-do app page', async () => {
    AllureReporter.addStep('user is on the to-do app page');
    await Browser.openUrl(mainConfig.baseUrl);
});

When(/^The user enters '(.*)' in the input field$/, async (text) => {
    AllureReporter.addStep(`The user enters ${text} in the input field`);
    await ToDoAppPage.typeInInputField(text);
});

When(/^User clicks '(.*)' to add task$/, async (key) => {
    AllureReporter.addStep(`User clicks ${key} to add task`);
    await Browser.pressKeys(key);
});

Then(/^New task '(.*)' should be displayed in the task list$/, async (text) => {
    AllureReporter.addStep(`New task ${text} should be displayed in the task list`);
    assert.strictEqual(await ToDoAppPage.findTaskByText(text), text, `Task with title "${text}" is not displayed`);
});

Given(/^User has a task '(.*)' in the task list$/, async (text) => {
    AllureReporter.addStep(`User has a task '${text}' in the task list`);
    await ToDoAppPage.typeInInputField(text);
    await Browser.pressKeys('Enter');
});

When(/^User clicks the checkbox next to '(.*)'$/, async (text) => {
    AllureReporter.addStep(`User clicks the checkbox next to '${text}'`);
    await ToDoAppPage.markCompleted(text);
});

Then(/^Task '(.*)' should be marked as completed$/, async (text) => {
    AllureReporter.addStep(`Task '${text}' should be marked as completed`);
    assert.isTrue(await ToDoAppPage.isMarkedCompleted(text), 'Task is not marked completed');
});

When(/^User clicks X button next to '(.*)'$/, async (text) => {
    AllureReporter.addStep(`User clicks X button next to '${text}'`);
    await ToDoAppPage.deleteTask(text);
});

Then(/^Task '(.*)' should be removed from the list$/, async (text) => {
    AllureReporter.addStep(`Task '${text}' should be removed from the list`);
    assert.isNotTrue(ToDoAppPage.findTask(text), 'Task was not deleted');
});

Given(/^User has tasks '(.*)' and '(.*)' in the task list$/, async (task1, task2) => {
    AllureReporter.addStep(`User has tasks '${task1}' and '${task2}' in the task list`);
    await ToDoAppPage.typeInInputField(task1);
    await Browser.pressKeys('Enter');
    await ToDoAppPage.typeInInputField(task2);
    await Browser.pressKeys('Enter');
});

When(/^User marks '(.*)' completed$/, async (text) => {
    AllureReporter.addStep(`User marks '${text}' completed`);
    await ToDoAppPage.markCompleted(text);
});

When(/^User selects '(.*)' filter$/, async (text) => {
    AllureReporter.addStep(`The user clicks '${text}' filter button`);
    await ToDoAppPage.selectFilter(text);
});

Then(/^Only the '(.*)' task should be visible$/, async (text) => {
    AllureReporter.addStep(`Only the '${text}' task should be visible`);
    assert.strictEqual(await ToDoAppPage.findTaskByText(text), 
    text, 
    `Task with title ${text} is not visible`);
});

When('Refreshes webpage before submitting the task', async () => {
    await Browser.Window.refresh();
});

Then(/^Task '(.*)' will not be visible in the input field$/, async (text) => {
    AllureReporter.addStep(`Task '${text}' will not be visible in the input field`);
    assert.isNotTrue(await ToDoAppPage.getInputFieldText(), text, `${text} is in input field`);
});

Given(/^List summary shows '(.*)'$/, async (text) => {
    AllureReporter.addStep(`List summary shows '${text}'`);
    assert.strictEqual(await ToDoAppPage.getTodoCounterText(), 
    text, 
    `Todo counter is not showing '${text}'`);
});

When(/^Task '(.*)' is being edited and added '(.*)'$/, async (text1, text2) => {
    AllureReporter.addStep(`Task '${text1}' is being edited to '${text2}'`);
    await ToDoAppPage.editTask(text1, text2);
});

When('User clicks input field', async () => {
    AllureReporter.addStep('Editing is abandoned');
    await ToDoAppPage.cancelEditing();
});

Then(/^Task name should still be '(.*)'$/, async (text) => {
    AllureReporter.addStep(`Task name should still be '${text}'`);
    assert.strictEqual(await ToDoAppPage.findTaskByText(text), text, `Task with text ${text} does not exist`);
});

When(/^User inputs '(.*)' in input field$/, async (text) => {
    AllureReporter.addStep(`User inputs '${text}' in input field`);
    await ToDoAppPage.typeInInputField(text);
});

