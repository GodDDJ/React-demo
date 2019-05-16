import React from 'react';
import './App.css';

import Course from './day03/Course';
import Student from './day03/Student';
import Teacher from './day03/Teacher';
import StudentCourse from './day03/StudentCourse';
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'
function App() {
  return (
    <div className="App">
    <div class="head">
	      <h1>选课管理系统</h1>
    </div>
        <BrowserRouter>
        <div className="nav">
        <h2 class="title">选课管理系统</h2>
          <ul>
            <li><Link to="/student">学生管理</Link></li>
            <li><Link to="/teacher">教师管理</Link></li>
            <li><Link to="/course">课程管理</Link></li>
            <li><Link to="/sc">选课管理</Link></li>
          </ul>
        </div>
        <div className="content">
          <Switch>
            <Route path="/student" component={Student}/>
            <Route path="/teacher" component={Teacher}/>
            <Route path="/course" component={Course}/>
            <Route path="/sc" component={StudentCourse}/>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
