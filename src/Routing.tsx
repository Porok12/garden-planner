import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HomePage from './components/HomePage';

class Routing extends Component<any, any> {
    render() {
        return <BrowserRouter>
            {this.props.children}
            <Switch>
                <Route path="/" exact component={HomePage} />
            </Switch>
        </BrowserRouter>;
    }
}

export default Routing;
