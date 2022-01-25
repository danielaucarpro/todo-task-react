import { useState } from "react";
import './create-task.css';

const CreateTask = (props) => {

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const submitTask = (event) => {
        event.preventDefault();

        const activeUser = JSON.parse(localStorage.getItem('active-user'));

        const newTask = {
            taskName,
            taskDescription,
            userID: activeUser.id,
            id: Math.random()
        }

        // Localstorage
        const taskList = JSON.parse(localStorage.getItem('tasks'));

        if (taskList) {
            taskList.push(newTask)
            localStorage.setItem('tasks', JSON.stringify(taskList));
            alert('Task Sucessfully Added!');
        } else {
            localStorage.setItem('tasks', JSON.stringify([newTask]))
            alert('Task Sucessfully Added!');
        }

        // I am sending data from child to Parent Component
        props.setTaskUpdated();

    }

    return (
        <form className="create-task-form" onSubmit={submitTask}>
            <div className="form-control create-task">
                <label className="create-task-label" htmlFor="">
                    Task Name:
                </label>
                <input
                    className="addTask-input"
                    value={taskName}
                    type="text"
                    onChange={(e) => setTaskName(e.target.value)}
                />
            </div>
            <div className="form-control create-task">
                <label className="create-task-label" htmlFor="">
                    Task Description:
                </label>
                <input
                    className="addTask-input"
                    value={taskDescription}
                    type="text"
                    onChange={(e) => setTaskDescription(e.target.value)}
                />
            </div>
            <button className="addTask-btn" type="submit">Add task</button>
        </form>
    )
}

export default CreateTask;