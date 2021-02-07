import React from "react";
import {Component} from "react";
import IdleTimer from "react-idle-timer";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import AuthService from "../services/AuthService";

interface PropsType extends RouteComponentProps<any>, React.Props<any> {

}

type StateType = {
    remaining: number;
    elapsed: number;
    user: any;
}

class LogoutManager extends Component<PropsType, StateType>{
    readonly timeout : number;
    private idleTimer : IdleTimer | null;
    private interval: NodeJS.Timeout | null;

    constructor(props: any) {
        super(props);
        this.interval = null;
        this.idleTimer = null;
        this.timeout = 1000 * 60 * 15;
        this.state = {
            remaining: this.timeout,
            elapsed: 0,
            user: AuthService.getCurrentUser()
        };
        this.handleOnIdle = this.handleOnIdle.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    handleOnIdle() {
        AuthService.logout();
        this.props.history.push("/");
    }

    updateState() {
        if (this.idleTimer) {
            const user = AuthService.getCurrentUser();
            const prevUser = this.state.user;

            if (user && !prevUser) {
                this.idleTimer.resume();
                this.idleTimer.reset();

            } else if (!user) {
                this.idleTimer.pause();
            }

            this.setState({
                remaining: this.idleTimer.getRemainingTime(),
                elapsed: this.idleTimer.getElapsedTime(),
                user: user
            });

            if (this.idleTimer.getRemainingTime() <= 3000) {
                console.log(this.idleTimer.getRemainingTime() + "ms to log out!")
            }
        }
    }

    componentDidMount() {
        this.updateState();
        this.interval = setInterval(this.updateState, 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {

        return <IdleTimer
            ref={ref => { this.idleTimer = ref }}
            onIdle={this.handleOnIdle}
            timeout={this.timeout}
        />;
    }
}

export default withRouter(LogoutManager);
