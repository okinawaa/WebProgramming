import logo from './logo.svg';
import './App.css';
import Header from "./components/header/Header";
import {BrowserRouter as Router} from 'react-router-dom'
import MainSection from "./components/main/MainSection";
import {useEffect, useState} from "react";

function App() {

    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive: true});

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <Router>
            <div className="App">
                <Header scrollPosition={scrollPosition}/>
                <MainSection scrollPosition={scrollPosition}/>
            </div>
        </Router>
    );
}

export default App;
