// Functional Component

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

function Login() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // Previously we used to use useHistory (But its now deprecated)


    const submitForm = (event) => {
        // We add preventdeafult so that page doesn't reload
        event.preventDefault();

        const userObject = {
            email: email,
            password: password
        }

        // Localstorage
        const userList = JSON.parse(localStorage.getItem('users'));

        // If something is present in localstorage with key users
        if (userList) {
            // This will check and find if there is a user and if yes then check password
            const foundUser = userList.find((user) => user.email === userObject.email);

            if (foundUser) {
                if (foundUser.password === userObject.password) {
                    console.log(foundUser.role);
                    if (foundUser.role === 'admin') {
                        navigate("/dashboard", { replace: true });
                    } else {
                        navigate("/home", { replace: true });
                    }
                    alert('User Succesfully Logged in!');
                    localStorage.setItem('active-user', JSON.stringify([foundUser]));

                    // User to home page

                } else {
                    alert('User Password not match!');
                }
            } else {
                alert("User does not exist");
            }

        } else {
            alert("No user in database");
        }

    }

    return (
        <form className='login-form' onSubmit={submitForm}>
            <h1>Login</h1>
            <div className="form-control">
                <label className='login-label' htmlFor="email">Email: </label>
                <input className='login-input' type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </div>
            <div className="form-control">
                <label className='login-label' htmlFor="password">Password: </label>
                <input className='login-input' type="password" value={password} onChange={(event) => setPassword(event.target.value)} req />
            </div>

            <button className='login-btn'>Submit</button>
            <Link to="/signup">Don't Have an Account ?</Link>
        </form>
    )
}

export default Login;