import React from "react";
import {Component} from "react";
import { IntlContext } from "./IntlProviderWrapper";

class LanguageSwitch extends Component<any, any> {
    render() {
        const Li = (props: any) => <li {...props} style={{cursor: "pointer"}}>{props.children}</li>;

        return <IntlContext.Consumer>
            {({locale, switchToPolish, switchToEnglish}) => (
                <ul className="text-left">
                    { locale === "pl" ? null : <Li onClick={switchToPolish}>Polski</Li>}
                    { locale === "en" ? null : <Li onClick={switchToEnglish}>English</Li>}
                </ul>
            )}
        </IntlContext.Consumer>;
    }
}

export default LanguageSwitch;
