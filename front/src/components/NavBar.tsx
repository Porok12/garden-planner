import React, {Component} from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

interface PropsType {

}

type State = {
    time: Date
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
    }

    render() {
        return <Navbar bg="primary" variant="light" sticky="top">
            <LinkContainer to="/">
                <Navbar.Brand>
                    NavBar
                </Navbar.Brand>
            </LinkContainer>

            <Navbar.Text>
                {this.state.time.toLocaleTimeString()}
            </Navbar.Text>
            <Nav className="ml-auto">
                <LinkContainer to="/signin">
                    <Nav.Link>Signin</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
            </Nav>
        </Navbar>;
    }
}

export default NavBar;
