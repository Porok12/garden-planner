import React, {Component} from 'react';
import {Button, ButtonGroup, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import AuthService from "../services/AuthService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faComment, faConciergeBell} from '@fortawesome/free-solid-svg-icons';

interface PropsType {

}

type State = {
    time: Date,
    logged: boolean
}

class NavBar extends Component<PropsType, State> {
    tick() {
        this.setState({
            time: new Date()
        })
    }

    componentWillMount() {
        this.tick();
    }

    componentDidMount() {
        setInterval(() => this.tick(), 1000);

        // const user: object = AuthService.getCurrentUser();
        // this.setState({
        //    logged: user != null
        // });
    }

    render() {
        let userPanel;
        if (this.state.logged) {
            userPanel = <div>
                <NavDropdown id="navProfile" title={<b>Profile</b>} alignRight
                             // show
                             // onMouseOver={() => console.log('1')}
                             // onMouseLeave={() => console.log('2')}
                >
                    <NavDropdown.Item>Item 1</NavDropdown.Item>
                    <NavDropdown.Item>Item 2</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Button}>Logout</NavDropdown.Item>
                </NavDropdown>
            </div>;
        }

        return <Navbar bg="primary" variant="light">
            <LinkContainer to="/">
                <Navbar.Brand>
                    NavBar
                </Navbar.Brand>
            </LinkContainer>

            <Navbar.Text>
                {this.state.time.toLocaleTimeString()}
            </Navbar.Text>
            <Nav className="ml-auto">
                <Nav.Link>
                    <FontAwesomeIcon icon={faBell} size="2x" color="#fff"/>
                </Nav.Link>

                <Nav.Link>
                    <FontAwesomeIcon icon={faComment} size="2x" color="#fff"/>
                </Nav.Link>

                <LinkContainer to="/browse">
                    <Nav.Link>Browse</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/signin">
                    <Nav.Link>Signin</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                </LinkContainer>

                {userPanel}
            </Nav>
        </Navbar>;
    }
}

export default NavBar;
