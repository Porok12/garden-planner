import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {Component} from "react";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {fetchBrowse} from "../store/browser/reducers";


type PropsType = {
    items: any[]
    name: string
}

type StateType = {
    show: boolean
}

class MyMultiSelect extends Component<PropsType, StateType> {
    state = {
        show: false
    }

    render() {
        const { items, name } = this.props;
        const { show } = this.state;
        const toggle = () => this.setState((prev: StateType) => ({show: !prev.show}));
        const hide = show ? "" : "hide";
        const prefix = "mulsel";

        return <div className="my-multiselect">
            <div
                className="input-wrapper"
                onClick={toggle.bind(this)}
            >
                <span>{name}</span>
                <div
                    className={"caret " + (show ? "flip" : "")}
                >
                    {/*<svg>*/}
                    {/*    <path d="M6 9L12 15 18 9" />*/}
                    {/*</svg>*/}
                    <FontAwesomeIcon icon={faCaretDown} />
                </div>
            </div>
            <div
                className={"options " + hide}
            >
                {
                    items.map(item => (
                        <div className="item">
                            <div className="item-wrapper">
                                <input id={prefix+item} type="checkbox" className="msel-checkbox" />
                                <label htmlFor={prefix+item} className="msel-label" >
                                    {item}
                                </label>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>;
    }
}

// MyMultiSelect.defaultProps = {
//     items: ['a', 'b']
// }

export default MyMultiSelect;
