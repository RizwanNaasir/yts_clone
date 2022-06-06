import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Route,Link, Routes} from "react-router-dom";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard,js";
import Reset from "./pages/auth/Reset";
import Task from "./pages/AddTask";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                {/*Auth Routes*/}
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/register" element={<Register/>} />
                <Route exact path="/reset" element={<Reset/>} />
                {/*End Auth Routes*/}
                <Route exact path="/dashboard" element={<Dashboard/>}/>
                <Route path='/details' element={<Details/>}/>
                <Route path='/task' element={<Task/>}/>
            </Routes>
        </Router>
    )
}
export default App;
