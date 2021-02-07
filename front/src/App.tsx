import React from 'react';
import Routing from "./components/Routing";
import NavBar from "./components/NavBar";
import {default as Footer} from "./components/Footer";
import LogoutManager from "./components/LogoutManager";

function App() {
    return (
        <div className="App">
            <Routing>
                <NavBar/>
                <LogoutManager />
            </Routing>
            <Footer />
        </div>
    );
}

export default App;
