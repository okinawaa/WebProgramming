import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from "./styles/GlobalStyle";
import {BrowserRouter} from "react-router-dom";
import MouseContextProvider from "./context/mouse-context";

ReactDOM.render(
    <React.StrictMode>
        <GlobalStyle/>
        <BrowserRouter>
            <MouseContextProvider>
                <App/>
            </MouseContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
