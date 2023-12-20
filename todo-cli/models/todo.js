'use strict';
const {
 Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overdueTasks = await Todo.overdue();
      overdueTasks.forEach(task => console.log(task.displayableString()));
      console.log("\n");

      console.log("Due Today");
      const dueTodayTasks = await Todo.dueToday();
      dueTodayTasks.forEach(task => console.log(task.displayableString()));
      console.log("\n");

      console.log("Due Later");
      const dueLaterTasks = await Todo.dueLater();
      dueLaterTasks.forEach(task => console.log(task.displayableString()));
    }

    static async overdue() {
      const today = new Date();
      return await Todo.findAll({
        where: {
          dueDate: {
            [db.Sequelize.Op.lt]: today,
          },
          completed: false,
        },
      });
    }
    
    static async dueToday() {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      return await Todo.findAll({
        where: {
          dueDate: {
            [db.Sequelize.Op.gte]: today,
            [db.Sequelize.Op.lt]: tomorrow,
          },
          completed: false,
        },
      });
    }
    
    static async dueLater() {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      return await Todo.findAll({
        where: {
          dueDate: {
            [db.Sequelize.Op.gte]: tomorrow,
          },
          completed: false,
        },
      });
    }
    
    static async markAsComplete(id) {
      const todo = await Todo.findByPk(id);
      if (todo) {
        todo.completed = true;
        await todo.save();
      }
    }
    
    displayableString() {
      let checkbox = this.completed ? "[X]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  
 }
 Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
 }, {
    sequelize,
    modelName: 'Todo',
 });
 return Todo;
};
