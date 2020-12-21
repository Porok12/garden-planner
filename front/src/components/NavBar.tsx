import React, {Component} from 'react';
import { Navbar } from 'react-bootstrap';

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
            <Navbar.Brand>
                NavBar
            </Navbar.Brand>
            <Navbar.Text>
                {this.state.time.toLocaleTimeString()}
            </Navbar.Text>
        </Navbar>;
    }
}

export default NavBar;
