import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faExclamationCircle,
    faExclamationTriangle, faLink,
    faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";

const messages = [
    {
        type: "warrning",
        message: "Do not ...",
        href: "link"
    },
    {
        type: "warrning",
        message: "Do not ...",
        href: "link"
    },
    {
        type: "warrning",
        message: "Do not ...",
        href: "link"
    }
]

class GardenConsole extends Component<any, any> {
    render() {
        return <div className="garden-console">
            <div className="garden-console__nav">
<span>
                        Korzystne
                        <FontAwesomeIcon icon={faCheckCircle} color={'green'}/>
                    </span>
                <span>
                        Wątpliwe
                        <FontAwesomeIcon icon={faQuestionCircle} color={'blue'}/>
                    </span>
                <span>
                        Uważaj
                        <FontAwesomeIcon icon={faExclamationTriangle} color={'hsl(53,100%,47%)'}/>
                    </span>
                <span>
                        Niekorzystne
                        <FontAwesomeIcon icon={faExclamationCircle} color={'red'}/>
                    </span>
                <div className="counter">
                    1
                </div>
                <div className="counter">
                    1
                </div>
            </div>
            <div className="garden-console__content">
                <ul>
                    {
                        messages.map(m => (<li className="garden-console__message">
                            <span>
                                {m.message} <FontAwesomeIcon icon={faLink} color={'gray'}/>
                            </span>
                        </li>))
                    }
                </ul>
            </div>
        </div>
    }
}

export default GardenConsole;