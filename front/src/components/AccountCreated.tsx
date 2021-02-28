import React from "react";
import {Component} from "react";
import AccountService from "../services/AccountService";

class AccountCreated extends Component<any, any>{
    componentDidMount() {
        const token = this.props.match.params.token;
        AccountService.activateAccount(token).then((res) => console.log(res));
    }

    render() {
        return <div>
            Your account has been created/activated!
        </div>;
    }
}

export default AccountCreated;
