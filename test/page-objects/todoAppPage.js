import { Label, Button, Input, Checkbox } from '../../framework/elements/index.js';
import BasePage from '../../framework/page/BasePage.js';
import { PreciseTextLocator } from '../../framework/utils/locatorHelper.js';

class ToDoAppPage extends BasePage {
    constructor() {
        super(new Label("//*[@id='root']", "Todo Page"), "Todo Page");
        this.taskInputField = new Input("//*[@id='todo-input']", "Input Field");
        this.taskLabel = (text) => new Input(PreciseTextLocator(text), `Task with title ${text}`);
        this.taskCheckBox = (text) => new Checkbox(`//label[contains(text(), '${text}')]/preceding-sibling::input[@type="checkbox"]`, `${text} Checkbox`);
        this.taskDeleteButton = (text) => new Button(`//label[text()="${text}"]/following-sibling::button[@class="destroy"]`, `Delete ${text} Button`);
        this.filterButton = (text) => new Button(PreciseTextLocator(text), `${text} Filter`);
        this.toDoCounter = new Label("//*[@class='todo-count']", "Todo Counter");
        this.taskValue = new Input(`//main//input[@id="todo-input"]`, 'Value to edit');
    }

    async typeInTaskInputField(text) {
        await this.taskInputField.typeText(text);
    }

    async getTaskByText(text) {
        return this.taskLabel(text).getText();
    }

    async markCompleted(text) {
        await this.taskCheckBox(text).click();
    }

    async isMarkedCompleted(text) {
        return this.taskCheckBox(text).state().isSelected();
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
        await this.taskValue.typeText(text2);
    }

    async cancelEditing() {
        await this.taskInputField.click();
    }
};

export default new ToDoAppPage();