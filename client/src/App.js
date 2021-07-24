import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState, useEffect } from 'react';
import AdminLogin from './components/admin/adminlogin';
import Login from './components/user/login';
import NewWorkout from './components/user/newWorkout';
import Register from './components/user/register';
import AddTraining from './views/admin/addTraining';
import AddWorkout from './views/admin/addWorkout';
import AdminMain from './views/admin/adminMain';
import CalendarComp from './components/user/calendar';
import EditTraining from './views/admin/editTraining';
import EditWorkout from './views/admin/editWorkout';
import Main from './views/user/main';
import Profile from './views/user/profile';
import UserProgress from './views/admin/userProgress';
import {Redirect, Router} from '@reach/router'
import Wrapper from './components/wrapper';
import UserList from './components/admin/userList';


function App() {
  const [token, setToken] = useState(true)
  const [admin, setAdmin] = useState(true)

  return (
    <div className="App">
    <Wrapper>
      <Router>
        <Login path="/" setToken={setToken} />
        <Register path="/register" />
        { token ? (
          <>
          <Main path="/main" />
          <NewWorkout path="/users/:id/newworkout" />
          <Profile path="/users/:idx/profile" />
          <CalendarComp path="/users/:id/calendar" />
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
