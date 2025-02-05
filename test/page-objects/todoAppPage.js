import { Label, Button, Input, Checkbox } from '../../framework/elements/index.js';
import BasePage from '../../framework/page/BasePage.js';

class ToDoAppPage extends BasePage {
    constructor() {
        super(new Label("//*[@id='root']", "Todo Page"), "Todo Page");
        this.taskInputField = new Input("//*[@id='todo-input']", "Input Field");
        this.taskLabel = (text) => new Input(`//label[@data-testid="todo-item-label" and contains(text(), "${text}")]`, `Task with title ${text}`);
        this.taskCheckBox = (text) => new Checkbox(`//label[contains(text(), '${text}')]/preceding-sibling::input[@type="checkbox"]`, `${text} Checkbox`);
        this.taskDeleteButton = (text) => new Button(`//label[text()="${text}"]/following-sibling::button[@class="destroy"]`, `Delete ${text} Button`);
        this.filterButton = (text) => new Button(`//ul[@class="filters"]//a[text()="${text}"]`, `${text} Filter`);
        this.toDoCounter = new Label("//*[@class='todo-count']", "Todo Counter");
        this.taskValue = (text) => new Input(`//*[@id="todo-input" and @value="${text}"]`, `Task ${text} Value`);
    }

    async typeInTaskInputField(text) {
        await this.taskInputField.typeText(text);
    }

    async getTaskByText(text) {
        return this.taskLabel(text).getText();
    }

    async isTaskDisplayed(text) {
        return this.taskLabel(text).state().isDisplayed();
    }

    async markCompleted(text) {
        await this.taskCheckBox(text).click();
    }

    async isMarkedCompleted(text) {
        return this.taskCheckBox(text).isChecked();
    }

    async deleteTask(text) {
        await this.taskDeleteButton(text).click();
    }

    async selectFilter(text) {
        await this.filterButton(text).click();
    }

    async getTaskInputFieldText() {
        return this.taskInputField.getValue();
    }

    async getTodoCounterText() {
        return this.toDoCounter.getText();
    }

    async editTask(text1,text2) {
        await this.taskLabel(text1).doubleClick();
        await this.taskValue(text1).typeText(text2);
    }

    async cancelEditing() {
        await this.taskInputField.click();
    }
};

export default new ToDoAppPage();
