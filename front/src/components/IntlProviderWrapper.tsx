import React from "react";
import {Component} from "react";
import {IntlContext, IntlProvider} from "react-intl";
import {MessageFormatElement} from "intl-messageformat-parser";
import messages_pl from "../translations/pl.json";
import messages_en from "../translations/en.json";

type MessageType = Record<string, string> | Record<string, MessageFormatElement[]>;
type MessagesType = {
    [id: string]: MessageType;
}
const messages: MessagesType = {
    'pl': messages_pl,
    'en': messages_en
};
const language = navigator.language.split(/[-_]/)[0];

type ContextType = {
    locale: string;
    messages: any;
    switchToPolish?: (e: any) => void;
    switchToEnglish?: (e:any) => void;
}

const Context = React.createContext<ContextType>({
    locale: language,
    messages: messages[language]
});

class IntlProviderWrapper extends Component<any, ContextType> {
    constructor(args: any) {
        super(args);

        this.switchToPolish = this.switchToPolish.bind(this);
        this.switchToEnglish = this.switchToEnglish.bind(this);

        this.state = {
            locale: language,
            messages: messages[language],
            switchToPolish: this.switchToPolish,
            switchToEnglish: this.switchToEnglish
        };
    }

    switchToPolish() {
        this.setState({ locale: "pl", messages: messages["pl"] });
    }

    switchToEnglish() {
        this.setState({ locale: "en", messages: messages["en"] });
    }

    render() {
        const { children } = this.props;
        const { locale, messages } = this.state;
        return (
            <Context.Provider value={this.state}>
                <IntlProvider
                    key={locale}
                    locale={locale}
                    messages={messages}
                    defaultLocale="en"
                >
                    {children}
                </IntlProvider>
            </Context.Provider>
        );
    }
}

export { IntlProviderWrapper, Context as IntlContext };
