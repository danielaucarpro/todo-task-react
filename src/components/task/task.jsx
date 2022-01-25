import './task.css';

const Task = (props) => {

    const deleteTask = () => {
        // Write Logic for deleting the data
        const tasksList = JSON.parse(localStorage.getItem('tasks'));

        if (tasksList) {
            // Delete the selected task from the taskList

            const index = tasksList.findIndex((task) => task.id === props.task.id);

            // If it is not -1
            if (index !== -1) {
                tasksList.splice(index, 1);

                localStorage.setItem('tasks', JSON.stringify(tasksList));
                alert("Task Succesfully Deleted");
                props.setTaskUpdated(true);
            }
        }
    }

    return (
        <div className="task-container">
            <div>Name: {props.task.taskName}</div>
            <div> Description: {props.task.taskDescription}</div>
            <div className="delete-container">
                <button className='btn-delete' onClick={deleteTask}>Delete Task</button>
            </div>
        </div>
    )
}

export default Task;