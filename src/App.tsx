import React from 'react';
import './App.scss';
import NavBar from './components/NavBar';
import {Button as ButtonBootStrap} from 'react-bootstrap';

function App() {
    return (
        <div className="App">
            <NavBar/>
            <br/>

            <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="customSwitch1"/>
                <label className="custom-control-label" htmlFor="customSwitch1">Toggle this switch element</label>
            </div>

            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                <label className="custom-control-label" htmlFor="customCheck1">Check this custom checkbox</label>
            </div>

            <ButtonBootStrap>btn2</ButtonBootStrap>
            <div className="form-outline">
                <input type="text" id="form1" className="form-control"/>
                <label className="form-label" htmlFor="form1">Example label</label>
            </div>

            <header className="App-header">
                App header
            </header>
        </div>
    );
}

export default App;
