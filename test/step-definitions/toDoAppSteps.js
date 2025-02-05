import { Given, When, Then } from '@wdio/cucumber-framework';
import Browser from '../../framework/browser/Browser.js'
import { mainConfig } from '../../framework/configs/main.wdio.conf.js';
import ToDoAppPage from '../page-objects/todoAppPage.js';
import { assert } from 'chai';

Given(/^User is on the to-do app page$/, async () => {
    await Browser.openUrl(mainConfig.baseUrl);
});

When(/^The user enters '(.*)' in the input field$/, async (text) => {
    await ToDoAppPage.typeInTaskInputField(text);
});

When(/^User clicks '(.*)' on keyboard$/, async (key) => {
    await Browser.pressKeys(key);
});

Then(/^New task '(.*)' should be displayed in the task list$/, async (text) => {
    assert.strictEqual(await ToDoAppPage.getTaskByText(text), text, `Task with title "${text}" is not displayed`);
});

When(/^User adds a task '(.*)' in the task list$/, async (text) => {
    await ToDoAppPage.typeInTaskInputField(text);
    await Browser.pressKeys('Enter');
});

When(/^User checks the checkbox next to '(.*)'$/, async (text) => {
    await ToDoAppPage.markCompleted(text);
});

Then(/^Task '(.*)' should be marked as completed$/,{timeout: 11000}, async (text) => {
    assert.isTrue(await ToDoAppPage.isMarkedCompleted(text), 'Task is not marked completed');
});

When(/^User clicks X button next to '(.*)'$/, async (text) => {
    await ToDoAppPage.deleteTask(text);
});

Then(/^Task '(.*)' should be removed from the list$/, async (text) => {
    assert.isNotTrue(await ToDoAppPage.isTaskDisplayed(text), 'Task was not deleted');
});

When(/^User marks '(.*)' completed$/, async (text) => {
    await ToDoAppPage.markCompleted(text);
});

When(/^User selects '(.*)' filter$/, async (text) => {
    await ToDoAppPage.selectFilter(text);
});

Then(/^Only the '(.*)' task should be visible$/, async (text) => {
    assert.strictEqual(await ToDoAppPage.getTaskByText(text), text, `Task with title ${text} is not visible`);
});

When(/^Refreshes webpage before submitting the task$/, async () => {
    await Browser.Window.refresh();
});

Then(/^Task '(.*)' will not be visible in the input field$/, async (text) => {
    assert.isNotTrue(await ToDoAppPage.getTaskInputFieldText(), text, `${text} is in input field`);
});

Then(/^List summary shows '(.*)'$/, async (text) => {
    assert.strictEqual(await ToDoAppPage.getTodoCounterText(), 
    text, 
    `Todo counter is not showing '${text}'`);
});

When(/^Task '(.*)' is being edited and added '(.*)'$/, async (text1, text2) => {
    await ToDoAppPage.editTask(text1, text2);
});

When('User clicks outside input field', async () => {
    await ToDoAppPage.cancelEditing();
});

Then(/^Task name should still be '(.*)'$/, async (text) => {
    assert.strictEqual(await ToDoAppPage.getTaskByText(text), text, `Task with text ${text} does not exist`);
});

When(/^User inputs '(.*)' in input field$/, async (text) => {
    await ToDoAppPage.typeInTaskInputField(text);
});
