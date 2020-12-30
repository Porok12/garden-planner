import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HomePage from './components/HomePage';
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import BrowsePage from "./components/BrowsePage";
import {Container} from "react-bootstrap";

class Routing extends Component<any, any> {
    render() {
        return <BrowserRouter>
            {this.props.children}
            <Container id="container" fluid>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/signin" component={SignInPage} />
                    <Route path="/signup" component={SignUpPage} />
                    <Route path="/browse" component={BrowsePage} />
                </Switch>
            </Container>
        </BrowserRouter>;
    }
}

export default Routing;
