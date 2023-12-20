const todoList = () => {
  const all = [];

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    return all.filter(todo => !todo.completed && todo.dueDate < currentDate);
  };

  const dueToday = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    return all.filter(todo => !todo.completed && todo.dueDate === currentDate);
  };

  const dueLater = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    return all.filter(todo => !todo.completed && todo.dueDate > currentDate);
  };

  const toDisplayableList = (list) => {
    let output = "";

    const formatTodo = (todo) => {
      const checkbox = todo.completed ? "[x]" : "[ ]";
      return `${checkbox} ${todo.title} ${todo.dueDate}\n`;
    };

    const overdueList = list.filter(todo => todo.dueDate < new Date().toISOString().split("T")[0]);
    const dueTodayList = list.filter(todo => todo.dueDate === new Date().toISOString().split("T")[0] && !todo.completed);
    const dueLaterList = list.filter(todo => todo.dueDate > new Date().toISOString().split("T")[0] || (todo.dueDate === new Date().toISOString().split("T")[0] && todo.completed));

    output += "My Todo-list\n\n";
    output += "Overdue\n";
    overdueList.forEach(todo => {
      output += formatTodo(todo);
    });
    output += "\nDue Today\n";
    dueTodayList.forEach(todo => {
      output += formatTodo(todo);
    });
    output += "\nDue Later\n";
    dueLaterList.forEach(todo => {
      output += formatTodo(todo);
    });

    return output;
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList
  };
};

const todos = todoList();

todos.add({ title: 'Submit assignment', dueDate: '2023-12-19', completed: false });
todos.add({ title: 'Pay rent', dueDate: '2023-12-20', completed: true });
todos.add({ title: 'Service Vehicle', dueDate: '2023-12-20', completed: false });
todos.add({ title: 'File taxes', dueDate: '2023-12-21', completed: false });
todos.add({ title: 'Pay electric bill', dueDate: '2023-12-21', completed: false });

console.log("My Todo-list\n");

console.log("Overdue");
let overdues = todos.overdue();
console.log(todos.toDisplayableList(overdues));

console.log("\nDue Today");
let itemsDueToday = todos.dueToday();
console.log(todos.toDisplayableList(itemsDueToday));

console.log("\nDue Later");
let itemsDueLater = todos.dueLater();
console.log(todos.toDisplayableList(itemsDueLater));

module.exports = todoList; // Export the todoList function for testing
