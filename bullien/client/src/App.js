import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import Pages from "./components/Pages";
import NavBar from "./components/Navbar/";
import './App.css'
import ReactGa from 'react-ga'
function App() {
    const [clickNavBanner,setClickNavBanner] = useState(false);
    useEffect(()=>{
        ReactGa.initialize('UA-205471897-2')

        // to report page view
        ReactGa.pageview(window.location.pathname + window.location.search)
    },[])
    return (
            <Router>
                <div className="App">
                    <NavBar setClickNavBanner={setClickNavBanner}/>
                    <Pages clickNavBanner={clickNavBanner}/>
                </div>
            </Router>
    );
}

export default App;