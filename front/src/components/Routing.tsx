import React, {Component} from 'react';
import {BrowserRouter as Router, Route, RouteProps, Switch, Redirect} from 'react-router-dom';
import HomePage from './HomePage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import BrowsePage from './BrowsePage';
import {Container, Col, Row} from 'react-bootstrap';
import AuthorizationRoute from "./AuthorizationRoute";
import UsersPanel from "./UsersPanel";
import ProfilePage from "./ProfilePage";
import AccountCreated from "./AccountCreated";
import ResetPasswordPage from "./ResetPasswordPage";
import ResetPasswordPage2 from './ResetPasswordPage2';

const loginProps: RouteProps = {
    path: "/signin", component: SignInPage
};
const redirectPath = "signin";
const AnyoneRoute = Route;
const OnlyGuestRoute = AuthorizationRoute([]);
const UserRoute = AuthorizationRoute(['ROLE_USER'], redirectPath);
const AdminRoute = AuthorizationRoute(['ROLE_ADMIN'], redirectPath);

class Routing extends Component<any, any> {
    render() {
        return <Router>
            {this.props.children}
            <Container id="container" fluid className="mx-auto">
                <Switch>
                    <AnyoneRoute path="/" exact component={HomePage} />
                    <UserRoute path="/profile" component={ProfilePage} />
                    <AdminRoute path="/users" component={UsersPanel} />
                    <AnyoneRoute path="/signin" component={SignInPage} />
                    <AnyoneRoute path="/signup" component={SignUpPage} />
                    <AnyoneRoute path="/browse" component={BrowsePage} />
                    <AnyoneRoute path="/account" component={AccountCreated} />
                    <AnyoneRoute path="/reset" component={ResetPasswordPage} />
                    <AnyoneRoute path="/reset2" component={ResetPasswordPage2} />
                    <AnyoneRoute render={() => (<h1>Path not matched!</h1>)} />
                </Switch>
            </Container>
        </Router>;
    }
}

export default Routing;
