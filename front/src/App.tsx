import React from 'react';
import Routing from "./components/Routing";
import NavBar from "./components/NavBar";
import {default as Footer} from "./components/Footer";
import {QueryBuilder} from "react-advanced-search-builder";
import LogoutManager from "./components/LogoutManager";

function App() {
    return (
        <div className="App">
            <QueryBuilder text="123"/>
            <Routing>
                <NavBar/>
                <LogoutManager />
            </Routing>
            <Footer />
        </div>
    );
}

export default App;
