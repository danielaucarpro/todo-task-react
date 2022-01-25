import { useEffect, useState } from 'react/cjs/react.development';
import './users.css';

const Users = (props) => {

    console.log(props);

    const [update, setUpdate] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        setUserName(props.users.userName);
        setEmail(props.users.email);
        setPassword(props.users.password);
        setRole(props.users.role);
    }, [update])

    const updateUser = () => {
        setUpdate(true);
    }

    const updateUserObject = (e) => {

        e.preventDefault();

        const updateUser = {
            userName,
            email,
            password,
            role,
            id: props.users.id
        }

        const userList = JSON.parse(localStorage.getItem('users'));
        const updatedUserList = userList.map((user) => {
            if (user.id === props.users.id) {
                user = updateUser;
            }
            return user;
        })

        localStorage.setItem('users', JSON.stringify(updatedUserList));
        localStorage.setItem('active-user', updateUser);
        setUpdate(false);
        props.setuserUpdated(true);
    }

    const deleteUser = () => {
        // Write Logic for deleting the data
        const userList = JSON.parse(localStorage.getItem('users'));
        console.log(props.users);

        if (userList) {
            // Delete the selected task from the taskList

            const index = userList.findIndex((user) => user.id === props.users.id);

            // If it is not -1
            if (index !== -1) {
                userList.splice(index, 1);

                localStorage.setItem('users', JSON.stringify(userList));
                alert("User Succesfully Deleted");
                props.setuserUpdated(true);
            }
        }
    }

    return (
        <div className="user-container">

            {
                update ?
                    <div>
                        <form className='update-form' onSubmit={updateUserObject}>
                            <div className='form-control users-control'>
                                <label htmlFor="">UserName:</label>
                                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                            </div>
                            <div className='form-control users-control'>
                                <label htmlFor="">Email:</label>
                                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='form-control users-control'>
                                <label htmlFor="">Password:</label>
                                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='form-control users-control'>
                                <label htmlFor="">Role:</label>
                                <select value={role} onChange={(e) => setRole(e.target.value)} required>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <button className='btn-delete'>Update</button>
                        </form>
                    </div> :
                    <div className='task-container'>
                        <div className='users-control'>Name: {props.users.userName}</div>
                        <div className='users-control'>Email: {props.users.email}</div>
                        <div className='users-control'>Role: {props.users.role}</div>
                        <div className="delete-container">
                            <button className='btn-delete' onClick={deleteUser}>Delete</button>
                            <button className='btn-delete' onClick={updateUser}>Update</button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Users;