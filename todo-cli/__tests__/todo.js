/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();
const newday = new Date();
const oneDay = 60 * 60 * 24 * 1000;
today = new Date().toLocaleDateString("en-CA");
yesterday = new Date(newday.getTime() - 1 * oneDay).toLocaleDateString("en-CA");
tomorrow = new Date(newday.getTime() + 1 * oneDay).toLocaleDateString("en-CA");

describe("ToDo test cases", () => {
  beforeAll(() => {
    add({
      title: "task1",
      completed: false,
      dueDate: today,
    });
    add({
      title: "task2",
      completed: false,
      dueDate: yesterday,
    });
    add({
      title: "task3",
      completed: false,
      dueDate: tomorrow,
    });
  });
  test("Create new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "task4",
      completed: false,
      dueDate: today,
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });
  test("Mark todo complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Overdue", () => {
    let due1 = overdue();
    expect(due1.length).toBe(1);
    expect(due1[0]).toBe(all[1]);
  });
  test("Due today", () => {
    let due2 = dueToday();
    expect(due2.length).toBe(2);
    expect(due2[1]).toBe(all[3]);
    expect(due2[0]).toBe(all[0]);
  });
  test("Due later", () => {
    let due3 = dueLater();
    expect(due3.length).toBe(1);
    expect(due3[0]).toBe(all[2]);
  });
});
