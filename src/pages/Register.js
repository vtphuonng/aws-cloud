import React, { useState } from "react";
import axios from "axios";
import './Register.scss';

const registerUrl = 'https://skodtuhe2m.execute-api.us-east-1.amazonaws.com/develop/register';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const submitHandler = (event) => {
        event.preventDefault();
        if (username.trim() === '' || email.trim() === '' || name.trim() === '' || password.trim() === ''){
            setMessage('All the fields are required');
        }
        setMessage(null);
        const requestConfig = {
            headers: {
                'x-api-key': '5WsSXn8cNc2BoXAgTGa0W8omJNQl3Q6maOAMOHBW'
            }
        }
        const requestBody = {
            username: username,
            email: email,
            name: name,
            password: password
        }

        axios.post(registerUrl, requestBody, requestConfig).then(response => {
            setMessage('Registeration Successfull')
        }).catch(error => {
            if (error.response.status === 401 || error.response.status === 403) {
                setMessage(error.response.data.message);
            } else {
                setMessage('The server is down! Try later');
            }
        })
    }

    return (
        <div className="form">
            <form onSubmit={submitHandler} className="register">
                <h5>Register</h5>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={name} onChange={event => setName(event.target.value)} />
                <label htmlFor="email">Email</label>
                <input type="text" name="email" value={email} onChange={event => setEmail(event.target.value)} />
                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={username} onChange={event => setUsername(event.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={event => setPassword(event.target.value)} />
                <input className="submit" type="submit" value="Register" />
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    )
}

export default Register;