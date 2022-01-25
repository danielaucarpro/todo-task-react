import { useEffect, useState } from "react";
import CreateTask from "../create-task/create-task";
import Task from "../task/task";
import './home.css';

const Home = () => {
    // Empty array by deafult;
    const [taskList, setTaskList] = useState([]);
    const [taskUpdated, setUpdateTask] = useState(false);

    // useEffect is a hook that is like a lifecycle
    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        // If this comes out to be null, then just assign []
        setTaskList(tasks || []);
    }, [])

    // Firing use effect when taskCreate dependency is changed
    useEffect(() => {
        const taskList = JSON.parse(localStorage.getItem('tasks'));
        setTaskList(taskList || []);
    }, [taskUpdated])

    // If i pass empty array inside useEffect it will be only fired once when page is loaded
    // If i pass a dependency inside useEffect, it will be fired when that dependency changes or is updated somehow

    return (
        <div className="main-container">
            <div className="create-task-section">
                <CreateTask setTaskUpdated={() => setUpdateTask(!taskUpdated)} />
            </div>
            <div className="show-tasks-container">
                {
                    // If yout want to iterate on UI, you need to use map in React
                    taskList.map((task, index) => {
                        return <Task setTaskUpdated={() => setUpdateTask(!taskUpdated)} key={index} task={task} />
                    })
                }
            </div>
        </div>
    )
}

export default Home;