import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addTask } from '../features/todo/todoSlice';
import TodoListCom from './TodoListCom';

const TodoList = () => {
  const [task, setTask] = useState('');
  const tasks = useSelector((state) => state.todo.tasks);
  const dispatch = useDispatch();

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    console.log(task, task.trim() !== '')
    if (task.trim() !== '') {
      dispatch(addTask({ text: task }));
      setTask('');
    }
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={handleTaskChange}
        />

        <button className="add-button" onClick={handleAddTask}>
          Add
        </button>

      </div>
      <ul className="task-list">
        {tasks?.map((task) => (
          <TodoListCom key={task.id} task={task} />
        ))}
      </ul>
      <p className="incomplete-count">
        Tasks Incomplete: {tasks?.filter((task) => !task.completed).length}
      </p>
    </div>
  );
};

export default TodoList;
