import React from "react";
import { Component } from "react";
import { Route, RouteProps, Redirect, RedirectProps } from "react-router-dom";
import AuthService from "../services/AuthService";

const AuthorizationRoute = (roles: Array<string>, redirect?: string) => {
    return ((props: RouteProps) => {
        const user = AuthService.getCurrentUser();

        if (user) {
            const roleFound = roles.some(role => user.roles.includes(role));
            const isQuest = roles.length === 0 && user.roles.length === 0;

            if (roleFound || isQuest) {
                return <Route path={props.path} component={props.component} />
            }
        }

        if (redirect) {
            return <Redirect to={{
                pathname: redirect,
                state: {
                    from: props.path
                }
            }} />;
        } else {
            return <div>404</div>;
        }
    }) ;
};

export default AuthorizationRoute;
