import React, {Component} from 'react';
import {Button, ButtonGroup, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import AuthService from "../services/AuthService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faComment, faConciergeBell, faUser, faEnvelope, faCog, faSignOutAlt, faCaretDown, faFolder} from '@fortawesome/free-solid-svg-icons';
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import IdleTimer from 'react-idle-timer';
import { IdleTimerProps } from 'react-idle-timer';
import leaf from "../assets/leaf.svg";
import {FormattedMessage} from "react-intl";

interface PropsType extends RouteComponentProps<any>, React.Props<any> {

}

type State = {
    time: Date;
    redirect?: string;
}

class NavBar extends Component<PropsType, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            time: new Date()
        };
    }

    tick() {
        this.setState({
            time: new Date()
        });
    }

    componentWillMount() {
        this.tick();
    }

    componentDidMount() {
        setInterval(() => this.tick(), 1000);
    }

    render() {
        const {redirect, time} = this.state;
        const user: object = AuthService.getCurrentUser();

        let userPanel, guestOptions;
        if (user) {
            userPanel = <div>
                <NavDropdown id="navProfile" title={<b>
                    <FormattedMessage id="app.nav.profile" />
                    <FontAwesomeIcon icon={faCaretDown} color="#000"/>
                </b>} alignRight
                             // show
                             // onMouseOver={() => console.log('1')}
                             // onMouseLeave={() => console.log('2')}
                >
                    <NavDropdown.Item>
                        <FormattedMessage id="app.nav.profile.projects" />
                        <FontAwesomeIcon icon={faFolder} color="#000" className="float-right" />
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <FormattedMessage id="app.nav.profile.settings" />
                        <FontAwesomeIcon icon={faCog} color="#000" className="float-right" />
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Button} onClick={() => {
                            AuthService.logout();
                            this.props.history.push("/");
                            // this.setState({redirect: "/"});
                        }}>
                            <FormattedMessage id="app.nav.profile.logout" />
                        <FontAwesomeIcon icon={faSignOutAlt} size="1x" color="#000" className="float-right" />
                    </NavDropdown.Item>
                </NavDropdown>
            </div>;
        } else {
            guestOptions = <>
                <LinkContainer to="/signin">
                    <Nav.Link>
                        <FormattedMessage id="app.nav.signin" />
                    </Nav.Link>
                </LinkContainer>

                <LinkContainer to="/signup">
                    <Nav.Link>
                        <FormattedMessage id="app.nav.signup" />
                    </Nav.Link>
                </LinkContainer>
            </>;
        }

        if (redirect) {
            return <Redirect to={redirect} />;
        }

        return <Navbar bg="primary" variant="light">
            <LinkContainer to="/">
                <Navbar.Brand>
                    <img
                        alt=""
                        src={leaf}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Garden Planner
                </Navbar.Brand>
            </LinkContainer>

            <Navbar.Text>
                {time.toLocaleTimeString()}
            </Navbar.Text>
            <Nav className="ml-auto">
                {/*<Nav.Link>*/}
                {/*    <FontAwesomeIcon icon={faBell} size="2x" color="#fff"/>*/}
                {/*</Nav.Link>*/}

                {/*<Nav.Link>*/}
                {/*    <FontAwesomeIcon icon={faComment} size="2x" color="#fff"/>*/}
                {/*</Nav.Link>*/}

                {/*<Nav.Link>*/}
                {/*    <FontAwesomeIcon icon={faUser} size="2x" color="#fff"/>*/}
                {/*</Nav.Link>*/}

                {/*<Nav.Link>*/}
                {/*    <FontAwesomeIcon icon={faEnvelope} size="2x" color="#fff"/>*/}
                {/*</Nav.Link>*/}


                <LinkContainer to="/plants">
                    <Nav.Link>
                        <FormattedMessage id="app.nav.browse" />
                    </Nav.Link>
                </LinkContainer>

                {guestOptions}
                {userPanel}
            </Nav>
        </Navbar>;
    }
}

export default withRouter(NavBar);// as React.ComponentClass<PropsType>;
