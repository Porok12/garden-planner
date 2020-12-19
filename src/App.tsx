import React from 'react';
import './App.scss';
import Routing from "./Routing";
import NavBar from "./components/NavBar";

function App() {
    return (
        <div className="App">
            <Routing>
                <NavBar/>
            </Routing>
        </div>
    );
}

export default App;
