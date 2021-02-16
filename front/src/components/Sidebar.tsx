import React, { createRef } from "react";
import {Component} from "react";

class Sidebar extends Component<any, any> {
    ref: React.RefObject<HTMLDivElement>;

    constructor(props: any) {
        super(props);
        this.ref = createRef<HTMLDivElement>();
        this.state = {
            show: true
        }
    }

    render() {
        return <>
            <div className={`sidebar ${this.state.show ? "show" : "hidden"}`}
                 // style={{width: this.state.sidebar ? "300px" : "0"}}

                onClick={e => this.setState((prev: any) => ({show: !prev.show}))}
            >
                <div className="sidebar__header">
                    Header
                </div>
                <div className="sidebar__body">
                    <div className="sidebar__body__search">
                        <input type="text" placeholder="Search..."/>
                    </div>
                    <div className="sidebar__body__items">
                        <div className="item" ref={this.ref} draggable onDragStart={(e) => {
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
                        }}>
                            Item 1
                        </div>
                        <div className="item selected" draggable>
                            Item 2
                        </div>
                    </div>
                </div>
            </div>
        </>;
    }
}

export default  Sidebar;
