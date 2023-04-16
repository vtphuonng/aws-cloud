import React, { useState } from "react";
import { getUser, resetUserSession } from "../service/AuthService";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const getData = 'https://skodtuhe2m.execute-api.us-east-1.amazonaws.com/develop/api'

const PremiumContent = () => {
    const user = getUser();
    const name = user !== 'undefined' && user ? user.name : '';
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    const logoutHandler = () => {
        resetUserSession();
        navigate('/login');
    }

    const getJSON = (event) => {
        event.preventDefault();

        const requestConfig = {
            headers: {}
        }
    }

    return (
        <div>
            Hello {name}! You have been loggined in! Welcome to the premium content.<br/>
            <input type="button" value="Logout" onClick={logoutHandler} />
        </div>
    )
}

export default PremiumContent;