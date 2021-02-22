import React, { createRef } from "react";
import {Component} from "react";
import leaf from "../assets/leaf.svg";

class Sidebar extends Component<any, any> {
    ref: React.RefObject<HTMLDivElement>;

    constructor(props: any) {
        super(props);
        this.ref = createRef<HTMLDivElement>();
        this.state = {

        }
    }

    render() {
        const show = this.props.show;

        return <>
            <div className={`sidebar ${show ? "show" : "hidden"}`}
                 // style={{width: this.state.sidebar ? "300px" : "0"}}

                onClick={e => this.setState((prev: any) => ({show: !prev.show}))}
            >
                <div className="sidebar__header">
                    Plants
                </div>
                <div className="sidebar__body">
                    <div className="sidebar__body__search">
                        <input type="text" placeholder="Search..."/>
                    </div>
                    <div className="sidebar__body__items">
                        {
                            ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'].map(desc => (
                                <div className="item" draggable onPointerOver={e => void {}}>
                                    <div className="item-image">
                                        <img src={leaf} draggable={false}/>
                                    </div>
                                    <div className="item-description">
                                        {desc}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>;
    }
}

export default  Sidebar;

// if (this.ref.current) {
//     const crt = this.ref.current.cloneNode(true);
//     // @ts-ignore
//     crt.style.width = "0px";
//     // @ts-ignore
//     crt.style.fontSize = "1px";
//     // @ts-ignore
//     crt.innerText = ".";
//     // crt.style.display = "none"; /* or visibility: hidden, or any of the above */
//     document.body.appendChild(crt);
//     // @ts-ignore
//     e.dataTransfer.setDragImage(crt, 0, 0);
// }
