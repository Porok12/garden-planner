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
import PlantDetails from "./PlantDetails";
import NewProjectPage from "./NewProjectPage";
import ProjectEditorPage from "./ProjectEditorPage";
import PlainEditorPage from "./PlainEditorPage";
import AboutPage from "./AboutPage";

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
                    <AnyoneRoute path="/new" component={NewProjectPage} />
                    <AnyoneRoute path="/editor2" component={PlainEditorPage} />
                    <AnyoneRoute path="/editor" component={ProjectEditorPage} />
                    <AnyoneRoute path="/plants" exact component={BrowsePage} />
                    <AnyoneRoute path="/plants/:plant" component={PlantDetails} />
                    <AnyoneRoute path="/account/reset/:token" exact component={ResetPasswordPage2} />
                    <AnyoneRoute path="/account/reset" component={ResetPasswordPage} />
                    <AnyoneRoute path="/account/active/:token" exact component={AccountCreated} />
                    <AnyoneRoute path="/account/active" component={AccountCreated} />
                    <AnyoneRoute path="/about" component={AboutPage} />
                    <AnyoneRoute render={() => (<h1>Path not matched!</h1>)} />
                </Switch>
            </Container>
        </Router>;
    }
}

export default Routing;
