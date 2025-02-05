Feature: To-Do App Functionality

  Background:
    Given User is on the to-do app page

  @addNewTask
  Scenario: Add new task successfully
    When The user enters 'Buy groceries' in the input field
    And User clicks 'Enter' on keyboard
    Then New task 'Buy groceries' should be displayed in the task list

  @markTaskCompleted
  Scenario: Mark task as completed
    When User adds a task 'Do homework' in the task list
    And User checks the checkbox next to 'Do homework'
    Then Task 'Do homework' should be marked as completed

  @deleteTask
  Scenario: Delete task successfully
    When User adds a task 'Workout' in the task list
    And User clicks X button next to 'Workout'
    Then Task 'Workout' should be removed from the list

  @filterTaskByStatus
  Scenario: Filter tasks by completed status
    When User adds a task 'Workout' in the task list
    And User adds a task 'Read a book' in the task list
    And User marks 'Workout' completed
    And User selects 'Completed' filter
    Then Only the 'Workout' task should be visible

  @refreshPage
  Scenario: Refresh page before submitting task
    When The user enters 'Walk a dog' in the input field
    And Refreshes webpage before submitting the task
    Then Task 'Walk a dog' will not be visible in the input field

  @uncompletedTaskFilter
  Scenario: Uncompleted items should not be visible in the completed filter
    When User adds a task 'Do laundry' in the task list
    And User adds a task 'Walk the dog' in the task list
    And User marks 'Do laundry' completed
    And User selects 'Completed' filter
    Then Only the 'Do laundry' task should be visible
    And List summary shows '1 item left!'

  @cancelEdit
  Scenario: Editing task can be canceled
    When User adds a task 'Walk' in the task list
    And Task 'Walk' is being edited and added ' the dog'
    And User clicks outside input field
    Then Task name should still be 'Walk'

  @addingEmptyTask
  Scenario: adding empty task
    When User adds a task 'Do laundry' in the task list
    And User adds a task 'Walk the dog' in the task list
    And User inputs ' ' in input field
    And User clicks 'Enter' on keyboard
    Then List summary shows '2 items left!'
