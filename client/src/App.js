import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

//components
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import TaskEdit from './components/TaskEdit';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState('');

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch('/api/auth/is-verify', {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parseResponse = await response.json();
      parseResponse === true
        ? setIsAuthenticated(true)
        : setIsAuthenticated(false);
    } catch (err) {
      console.log(err.message);
      console.log('???');
    }
  }

  async function getName() {
    try {
      const response = await fetch('/api/dashboard', {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setName(parseRes.user_name);
    } catch (err) {
      console.log(err.message);
      console.log('???');
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    toast('Logged out successfully!');
  };

  useEffect(() => {
    isAuth();
    getName();
  });

  return (
    <Fragment>
      <Router>
        {isAuthenticated ? (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">
              TodoList
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                {/* <li className="nav-item active">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li> */}
              </ul>
              <div className="nav-user">
                <div className="nav-user__info">
                  <p>{name}</p>
                </div>
                <button className="btn btn-primary" onClick={(e) => logout(e)}>
                  Logout
                </button>
              </div>
            </div>
          </nav>
        ) : null}
        <div className="container">
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/"
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route path="/task-add" exact={true} component={TaskEdit} />
          </Switch>
        </div>
      </Router>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
