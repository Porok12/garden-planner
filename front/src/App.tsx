import React from 'react';
import Routing from "./Routing";
import NavBar from "./components/NavBar";
import {default as Footer} from "./components/Footer";

function App() {
    return (
        <div className="App">
            <Routing>
                <NavBar/>
            </Routing>
            <Footer />
        </div>
    );
}

export default App;
