import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HomePage from './components/HomePage';
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";

class Routing extends Component<any, any> {
    render() {
        return <BrowserRouter>
            {this.props.children}
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/signin" component={SignInPage} />
                <Route path="/signup" component={SignUpPage} />
            </Switch>
        </BrowserRouter>;
    }
}

export default Routing;
