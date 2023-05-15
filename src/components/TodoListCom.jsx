import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteTask, editTask, toggleComplete } from '../features/todo/todoSlice';

const TodoListCom = ({ task }) => {
    const [taskData, setTaskData] = useState('');
    const [editId, setEditId] = useState(null);
    const dispatch = useDispatch();

    const handleTaskChange = (e) => {
        setTaskData(e.target.value);
    };

    const handleDeleteTask = (id) => {
        dispatch(deleteTask({ id }));
    };

    const handleToggleComplete = (id) => {
        dispatch(toggleComplete({ id }));
    };

    const handleEditTask = (id, text) => {
        setEditId(id);
        setTaskData(text);
    };


    const handleSaveTask = () => {
        if (taskData.trim() !== '') {
            dispatch(editTask({ id: editId, text: taskData }));
            setTaskData('');
            setEditId(null);
        }
    };

    return (

        <li key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
            />
            {editId === task.id ? (
                <input
                    type="text"
                    value={taskData}
                    onChange={handleTaskChange}
                />
            ) : (
                <span>{task.text}</span>
            )
            }
            <div className="button-group">
                {editId === task.id ? (
                    <>
                        <button className="save-button" onClick={handleSaveTask}>
                            Save
                        </button>
                        <button className="delete-button" onClick={() => setEditId(null)}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button className="edit-button" onClick={() => handleEditTask(task.id, task.text)}>
                            Edit
                        </button>
                        <button className="delete-button" onClick={() => handleDeleteTask(task.id)}>
                            Delete
                        </button>
                    </>
                )}
            </div>
        </li >

    )
}

export default TodoListCom