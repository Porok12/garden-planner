import React, {Component} from 'react';

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
        return <div>
            NavBar {this.state.time.toLocaleTimeString()}
        </div>;
    }
}

export default NavBar;
