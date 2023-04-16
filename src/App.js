import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PremiumContent from "./pages/PremiumContent";
import { useEffect, useState } from "react";
import { getUser, getToken, setUserSession, resetUserSession } from "./service/AuthService";
import axios from "axios";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import './App.scss';

const verifyTokenAPIURL = 'https://dw239ekvb9.execute-api.ap-southeast-2.amazonaws.com/prod/verify';

function App() {

  const [isAuthenticating, setAuthentication] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token === 'undefined' || token === undefined || token === null || !token) {
      return;
    }
    const requestConfig = {
      headers: {
        'x-api-key': 'scUbBFJMSu71Z7FL0H6o78u3BB70dYBIaYG5nf4c'
      }
    }
    const requestBody = {
      user: getUser(),
      token: token
    }

    axios.post(verifyTokenAPIURL, requestBody, requestConfig).then(response => {
      setUserSession(response.data.user, response.data.token)
      setAuthentication(false);
    }).catch(() => {
      resetUserSession();
      setAuthentication(false);
    })
  }, [isAuthenticating]);

  const token = getToken();
  if (isAuthenticating && token) {
    return <div className="content">Authenticating...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <div className="inner">
            <div className="navbar">
              <a href="/" className="logo">
                <img src={require('./assets/images/logo.png')} alt="Logo"/>
              </a>
              <div className="menu">
                <NavLink className="menu-item" to="/">Home</NavLink>
                <NavLink className="menu-item" to="/about">About Us</NavLink>
                <NavLink className="menu-item" to="/services">Services</NavLink>
                <NavLink className="menu-item" to="/register">Register</NavLink>
                <NavLink className="menu-item" to="/login">Login</NavLink>
                <NavLink className="menu-item" to="/premium-content">Premium Content</NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route element={<PublicRoute />}>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path='/premium-content' element={<PremiumContent />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
