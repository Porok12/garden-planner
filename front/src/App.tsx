import React from 'react';
import Routing from "./Routing";
import NavBar from "./components/NavBar";
import {default as Footer} from "./components/Footer";
import {QueryBuilder} from "react-advanced-search-builder";

function App() {
    return (
        <div className="App">
            <QueryBuilder text="123"/>
            <Routing>
                <NavBar/>
            </Routing>
            <Footer />
        </div>
    );
}

export default App;
