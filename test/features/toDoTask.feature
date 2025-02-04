Feature: To-Do App Functionality

  Background:
    Given User is on the to-do app page

  @positive
  Scenario: Add new task successfully
    When The user enters 'Buy groceries' in the input field
    And User clicks 'Enter' to add task
    Then New task 'Buy groceries' should be displayed in the task list

  Scenario: Mark task as completed
    Given User has a task 'Do homework' in the task list
    When User clicks the checkbox next to 'Do homework'
    Then Task 'Do homework' should be marked as completed

  Scenario: Delete task successfully
    Given User has a task 'Workout' in the task list
    When User clicks X button next to 'Workout'
    Then Task 'Workout' should be removed from the list

  Scenario: Filter tasks by completed status
    Given User has tasks 'Workout' and 'Read a book' in the task list
    When User marks 'Workout' completed
    And User selects 'Completed' filter
    Then Only the 'Workout' task should be visible

  @negative
  Scenario: Refresh page before submitting task
    When The user enters 'Walk a dog' in the input field
    And Refreshes webpage before submitting the task
    Then Task 'Walk a dog' will not be visible in the input field

  Scenario: Uncompleted items should not be visible in the completed filter
    Given User has tasks 'Do laundry' and 'Walk the dog' in the task list
    When User marks 'Do laundry' completed
    And User selects 'Completed' filter
    Then Only the 'Do laundry' task should be visible
    And List summary shows '1 item left!'

  Scenario: Editing task can be abandoned
    Given User has a task 'Walk' in the task list
    When Task 'Walk' is being edited and added ' the dog'
    And User clicks input field
    Then Task name should still be 'Walk'

  Scenario: adding empty task
    Given User has tasks 'Do laundry' and 'Walk the dog' in the task list
    When User inputs ' ' in input field
    And User clicks 'Enter' to add task
    Then List summary shows '2 items left!'
