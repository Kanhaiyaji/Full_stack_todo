/**
 * Basic unit tests for Task model
 * Run with: npm test
 */

const assert = require('assert');
const Task = require('../src/models/Task');

describe('Task Model', () => {
  beforeEach(() => {
    Task.clearAll();
  });

  describe('createTask', () => {
    test('should create a new task with required fields', () => {
      const task = Task.createTask('Test Task');

      assert.strictEqual(task.title, 'Test Task');
      assert.strictEqual(task.completed, false);
      assert.ok(task.id);
      assert.ok(task.createdAt);
    });
  });

  describe('getAllTasks', () => {
    test('should return empty array initially', () => {
      const tasks = Task.getAllTasks();
      assert.strictEqual(tasks.length, 0);
    });

    test('should return all created tasks', () => {
      Task.createTask('Task 1');
      Task.createTask('Task 2');
      const tasks = Task.getAllTasks();

      assert.strictEqual(tasks.length, 2);
    });
  });

  describe('getTaskById', () => {
    test('should return task by id', () => {
      const created = Task.createTask('Test Task');
      const found = Task.getTaskById(created.id);

      assert.strictEqual(found.id, created.id);
    });

    test('should return null if task not found', () => {
      const found = Task.getTaskById('non-existent-id');
      assert.strictEqual(found, null);
    });
  });

  describe('updateTask', () => {
    test('should update task fields', () => {
      const created = Task.createTask('Original Title');
      const updated = Task.updateTask(created.id, { completed: true });

      assert.strictEqual(updated.completed, true);
      assert.strictEqual(updated.title, 'Original Title');
    });
  });

  describe('deleteTask', () => {
    test('should delete task by id', () => {
      const created = Task.createTask('Task to delete');
      const deleted = Task.deleteTask(created.id);

      assert.strictEqual(deleted, true);
      assert.strictEqual(Task.getAllTasks().length, 0);
    });

    test('should return false if task not found', () => {
      const deleted = Task.deleteTask('non-existent-id');
      assert.strictEqual(deleted, false);
    });
  });
});

function test(description, fn) {
  try {
    fn();
    console.log(`✓ ${description}`);
  } catch (error) {
    console.error(`✗ ${description}`);
    console.error(`  ${error.message}`);
  }
}

function describe(suite, fn) {
  console.log(`\n${suite}`);
  fn();
}
