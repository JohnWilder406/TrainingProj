import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState, useEffect } from 'react';
import AdminLogin from './components/adminlogin';
import Login from './components/login';
import NewWorkout from './components/newWorkout';
import Register from './components/register';
import AddTraining from './views/addTraining';
import AddWorkout from './views/addWorkout';
import AdminMain from './views/adminMain';
import Calendar from './views/calendar';
import EditTraining from './views/editTraining';
import EditWorkout from './views/editWorkout';
import Main from './views/main';
import Profile from './views/profile';
import UserProgress from './views/userProgress';
import {Redirect, Router} from '@reach/router'
import Wrapper from './components/wrapper';
import UserList from './components/userList';


function App() {
  const [token, setToken] = useState(true)
  const [admin, setAdmin] = useState(true)

  return (
    <div className="App">
    <Wrapper>
      <Router>
        <Login path="/" setToken={true} />
        <Register path="/register" />
        { token ? (
          <>
          <Main path="/main" />
          <NewWorkout path="/users/:id/newworkout" />
          <Profile path="/users/:id/profile" />
          <Calendar path="/users/:id/calendar" />
          </>
        ) : (
          <Redirect from="/main" to="/" noThrow/>
        )
        }

      </Router>
    </Wrapper>
      <Router>
        <AdminLogin path="/admin" setAdmin={setAdmin} />
        {
          admin ? (
            <>
            <AdminMain path="/admin/main" />
            <AddTraining path="/admin/addplan" />
            <EditTraining path="/admin/:id/editplan" />
            <AddWorkout path="/admin/training/:id/addworkout" />
            <EditWorkout path="/admin/training/:id/editworkout" />
            <UserProgress path="/admin/userprogress" />
            <UserList path="/admin/userlist" />
            </>
          ) : (
            <Redirect from="/admin" to="/" />
          )
        }
      </Router>
    </div>
  );
}

export default App;
