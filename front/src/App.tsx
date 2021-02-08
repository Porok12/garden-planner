import React from 'react';
import Routing from "./components/Routing";
import NavBar from "./components/NavBar";
import {default as Footer} from "./components/Footer";
import LogoutManager from "./components/LogoutManager";
import {IntlProviderWrapper} from "./components/IntlProviderWrapper";

function App() {
    return (
        <div className="App">
            <IntlProviderWrapper>
                <Routing>
                    <NavBar/>
                    <LogoutManager />
                </Routing>
                <Footer />
            </IntlProviderWrapper>
        </div>
    );
}

export default App;
