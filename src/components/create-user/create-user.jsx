import { useState } from "react";
import './create-user.css';

const CreateUser = (props) => {

    console.log(props);

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    const submitUser = (event) => {
        event.preventDefault();

        // const activeUser = JSON.parse(localStorage.getItem('active-user'));

        const newUser = {
            userName,
            password,
            id: Math.random(),
            role,
            email
        }

        // Localstorage
        const userList = JSON.parse(localStorage.getItem('users'));

        if (userList) {
            userList.push(newUser)
            localStorage.setItem('users', JSON.stringify(userList));
            alert('User Sucessfully Added!');
        } else {
            localStorage.setItem('users', JSON.stringify([newUser]))
            alert('User Sucessfully Added!');
        }

        // I am sending data from child to Parent Component
        props.setuserUpdated();

    }

    return (
        <form className="create-user-form" onSubmit={submitUser}>
            <div className="form-control">
                <label className="create-user-label" htmlFor="">
                    User Name:
                </label>
                <input
                    className="create-user-input"
                    value={userName} type="text"
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
            </div>
            <div className="form-control">
                <label className="create-user-label" htmlFor="">
                    Email:
                </label>
                <input
                    className="create-user-input"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-control create-user">
                <label className="create-user-label" htmlFor="">
                    Role:
                </label>
                <select className="create-user-input" value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div className="form-control">
                <label className="create-user-label" htmlFor="">
                    Password:
                </label>
                <input className="create-user-input"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="create-user-btn" type="submit">Submit</button>
        </form>
    )
}

export default CreateUser;