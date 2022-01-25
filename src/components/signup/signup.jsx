// Functional Component

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {



    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const submitForm = (event) => {
        // We add preventdeafult so that page doesn't reload
        event.preventDefault();


        const newUser = {
            userName: userName,
            email: email,
            password: password,
            // Math.random to give any random ID to the created User
            id: Math.random(),
            role: 'user'
        }

        // Localstorage
        const userList = JSON.parse(localStorage.getItem('users'));

        // If something is present in localstorage with key users
        if (userList) {

            // If user already exists, show alert

            const foundUser = userList.find((user) => user.email === newUser.email);

            if (foundUser) {
                alert("User already exists");
            } else {
                userList.push(newUser)
                localStorage.setItem('users', JSON.stringify(userList));
                alert('User Succesfully Signed up!');
                // User to home page
                navigate("/login", { replace: true });
            }

        } else {
            // If there is no user key present inside the localstorage
            localStorage.setItem('users', JSON.stringify([newUser]))
            alert('User Succesfully Signed up!');
            // User to home page
            navigate("/login", { replace: true });
        }

    }

    return (
        <form className='login-form' onSubmit={submitForm}>
            <h1>Signup</h1>
            <div className="form-control">
                <label className='login-label' htmlFor="userName">User Name: </label>
                <input className='login-input' type="text" value={userName} onChange={(event) => setUserName(event.target.value)} required />
            </div>
            <div className="form-control">
                <label className='login-label' htmlFor="email">Email: </label>
                <input className='login-input' type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </div>
            <div className="form-control">
                <label className='login-label' htmlFor="password">Password: </label>
                <input className='login-input' type="password" value={password} onChange={(event) => setPassword(event.target.value)} req />
            </div>

            <button className='login-btn'>Submit</button>
            <Link to="/login">Already Have an Account ?</Link>

        </form>
    )
}

export default Signup;