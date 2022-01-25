import { useEffect, useState } from "react";
import CreateUser from "../create-user/create-user";
import Users from "../users/users";
import './dashboard.css';

const Dashboard = () => {
    // Empty array by deafult;
    const [userList, setUserList] = useState([]);
    const [userUpdated, setUpdatedUser] = useState(false);

    // useEffect is a hook that is like a lifecycle
    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('users'));
        // If this comes out to be null, then just assign []
        setUserList(users || []);
    }, [])

    // Firing use effect when taskCreate dependency is changed
    useEffect(() => {
        const userList = JSON.parse(localStorage.getItem('users'));
        setUserList(userList || []);
    }, [userUpdated])

    // If i pass empty array inside useEffect it will be only fired once when page is loaded
    // If i pass a dependency inside useEffect, it will be fired when that dependency changes or is updated somehow

    return (
        <div className="main-container">
            <div className="create-task-section">
                <CreateUser setuserUpdated={() => setUpdatedUser(!userUpdated)} />
            </div>
            <div className="show-users-container">
                {
                    // If yout want to iterate on UI, you need to use map in React
                    userList.map((user, index) => {
                        return <Users setuserUpdated={() => setUpdatedUser(!userUpdated)} key={index} users={user} />
                    })
                }
            </div>
        </div>
    )
}

export default Dashboard;