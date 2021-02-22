import React, {Component} from "react";

class TileButton extends Component<any, any>{
    render() {
        const { children, onClick, disabled } = this.props;

        return <div className={`tile-btn ${disabled ? "disabled" : ""}`} onClick={onClick}>
            <span>
                { children }
            </span>
        </div>;
    }
}

export default TileButton
