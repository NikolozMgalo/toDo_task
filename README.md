# To-Do App Automated Test Suite

## Overview
This project contains an automated test suite for a **To-Do App**, developed using **WebDriverIO** with the **Cucumber.js (BDD) framework**. The test suite ensures that the application's functionalities work as expected by executing both **positive** and **negative** test scenarios.

## What is Being Tested?
The test suite covers various user interactions within the To-Do App, including:
- Adding new tasks
- Marking tasks as completed
- Deleting tasks
- Filtering tasks based on status
- Validating UI behaviors like editing and refreshing
- Ensuring invalid actions (such as adding empty tasks) are handled correctly

## Test Organization
The test suite follows the **Behavior-Driven Development (BDD) methodology**, using **Gherkin syntax** to define test scenarios in a `.feature` file.

### **Test Structure**
- **Feature Files (`.feature`)**: Describe the test scenarios in human-readable language.
- **Step Definitions (`.js`)**: Implement the test logic for each scenario step.
- **Page Object Model (POM)**: Encapsulates UI elements and actions to promote reusability and maintainability.
- **Configuration (`main.wdio.conf.js & chrome.cucumber.conf.js`)**: Defines browser configurations, test reporters, Cucumber configuration 

## **Test Scenarios**
The test suite consists of **8 scenarios** (4 positive, 4 negative), covering both functional and edge cases:

### **Positive Test Scenarios:**
1. **Adding a new task** – Ensures a task can be successfully added.
2. **Marking a task as completed** – Confirms that marking a task updates its status.
3. **Deleting a task** – Verifies that a task is removed after deletion.
4. **Filtering completed tasks** – Ensures appropriate tasks appear when filtered.

### **Negative Test Scenarios:**
1. **Refreshing before submitting a task** – Ensures that an unsubmitted task disappears after refresh.
2. **Uncompleted tasks in completed filter** – Ensures only completed tasks are shown when choosing Completed filter.
3. **Canceling task edit** – Confirms that canceling an edit preserves the original task name.
4. **Adding an empty task** – Ensures empty tasks cannot be added.

## **Patterns Used and Justification**
### **1. Page Object Model (POM)**
- Encourages **code reusability** by separating UI actions from test logic.
- Reduces maintenance effort when updating UI element locators.

### **2. BDD with Cucumber.js**
- Enhances test readability by defining behavior in **plain English**.
- Facilitates collaboration between testers and stakeholders.
- Provides **reusable step definitions** for different scenarios.

## **Test Reporting**
The framework integrates **Allure Reporting**, which provides:
- Detailed test execution reports
- Screenshots on test failures
- Step-by-step execution logs
- Trend analysis over multiple test runs

To generate and view the report:
```sh
allure generate --clean && allure open
```

## **How to Run the Tests**
1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd to-do-app-tests
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the tests:**
   ```sh
   npm run test
   ```
