import axios from "axios";
import React, { useState } from "react";
import { setUserSession } from "../service/AuthService";
import { useNavigate } from "react-router-dom";
import './Login.scss';

const loginAPIUrl = 'https://skodtuhe2m.execute-api.us-east-1.amazonaws.com/develop/login';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            setErrorMessage('Both username and password are required');
            return;
        }
        setErrorMessage(null);
        const requestConfig = {
            headers: {
                'x-api-key': '5WsSXn8cNc2BoXAgTGa0W8omJNQl3Q6maOAMOHBW'
            }
        }
        const requestBody = {
            username: username, 
            password: password
        }

        axios.post(loginAPIUrl, requestBody, requestConfig).then((response) => {
            setUserSession(response.data.user, response.data.token);
            navigate('/premium-content');
        }).catch(error => {
            if (error.response.status === 401 || error.response.status === 403) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('The server is down! Try later');
            }
            // console.log(error);
        })
    }

    return (
        <div className="form">
            <form onSubmit={submitHandler}>
                <h5>Login</h5>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" value={username} onChange={event => setUsername(event.target.value)} />
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={event => setPassword(event.target.value)} />
                <input className="login" type="submit" value="Login" />
            </form>
            {errorMessage && <p className="message">{errorMessage}</p>}
        </div>
    )
}

export default Login;