import { Label, Button, Input, Checkbox } from '../../framework/elements/index.js';
import BasePage from '../../framework/page/BasePage.js';
import { PreciseTextLocator } from '../../framework/utils/locatorHelper.js';

class ToDoAppPage extends BasePage {
    constructor() {
        super(new Label("//*[@id='root']", "Todo Page"), "Todo Page");

        this.inputField = new Input("//*[@id='todo-input']", "Input Field");

        this.findTask = (text) => new Input(PreciseTextLocator(text), `Task with title ${text}`);

        this.findCheck = (text) => new Checkbox(`//label[contains(text(), '${text}')]/preceding-sibling::input[@type="checkbox"]`, 'Checkbox');

        this.deleteButton = (text) => new Button(`//label[text()="${text}"]/following-sibling::button[@class="destroy"]`, 'Delete Button');

        this.filterButton = (text) => new Button(PreciseTextLocator(text), `${text} Filter`);

        this.toDoCounter = new Label("//*[@class='todo-count']", "Todo Counter");

        this.findValue = new Input(`//main//input[@id="todo-input"]`, 'Value to edit');
    }

    async typeInInputField(text) {
        await this.inputField.typeText(text);
    }

    async findTaskByText(text) {
        return this.findTask(text).getText();
    }

    async markCompleted(text) {
        await this.findCheck(text).click();
    }

    async isMarkedCompleted(text) {
        return this.findCheck(text).state().isSelected();
    }

    async deleteTask(text) {
        await this.deleteButton(text).click();
    }

    async selectFilter(text) {
        await this.filterButton(text).click();
    }

    async getInputFieldText() {
        return this.inputField.getValue();
    }

    async getTodoCounterText() {
        return this.toDoCounter.getText();
    }

    async editTask(text1,text2) {
        await this.findTask(text1).doubleClick();
        await this.findValue.typeText(text2);
    }

    async cancelEditing() {
        await this.inputField.click();
    }
};

export default new ToDoAppPage();