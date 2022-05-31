import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route,Link, Switch} from "react-router-dom";
import Details from "./components/Details";
import Home from "./components/Home";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/details/:id' component={Details}/>
            </Switch>
        </Router>
    )
}
export default App;
