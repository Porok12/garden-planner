import React from 'react';
import Routing from "./components/Routing";
import NavBar from "./components/NavBar";
import {default as Footer} from "./components/Footer";
import LogoutManager from "./components/LogoutManager";
import {IntlProviderWrapper} from "./components/IntlProviderWrapper";
import {Provider} from "react-redux";
import store from "./store";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <IntlProviderWrapper>
                    <Routing>
                        <NavBar/>
                        <LogoutManager />
                    </Routing>
                    <Footer />
                </IntlProviderWrapper>
            </div>
        </Provider>
    );
}

export default App;
