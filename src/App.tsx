import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import {MantineProvider} from "@mantine/core";

// import Task from "./pages/AddTask";

function App() {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <Router>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    {/*Auth Routes*/}
                    {/*End Auth Routes*/}
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path='/details/:id' element={<Details/>}/>
                    {/*<Route path='/task' element={<Task/>}/>*/}
                </Routes>
            </Router>
        </MantineProvider>
    )
}

export default App;
