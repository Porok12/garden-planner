import React, { Component, createRef, useRef } from 'react';
import SecCanvas from "./threejs/SecCanvas";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBoxOpen, faLayerGroup, faPaintBrush, faPlus, faSeedling, faTools} from "@fortawesome/free-solid-svg-icons";
import {connect, Provider, useSelector} from "react-redux";
import {disableOrbitControls, disableSky, enableOrbitControls, setBrushOpacity, setBrushSize, setBrush} from "../store/canvas/actions";
import { RootState } from '../store';
import TileButton from "./TileButton";
import {FormattedMessage} from "react-intl";

class HomePage extends Component<any, any> {
    state = {
        fullscreen: false,
        sidebar: true
    }

    render() {
        return <>
            <div className="d-flex justify-content-center">
                <div className="m-2">
                    <TileButton onClick={() => this.props.history.push('new')}>
                        <FontAwesomeIcon icon={faPlus} />
                        <br/>
                        <span>
                            <FormattedMessage id="app.home.new" />
                        </span>
                    </TileButton>
                </div>
                <div className="m-2">
                    <TileButton disabled>
                        <FontAwesomeIcon icon={faBoxOpen} />
                        <br/>
                        <span>
                            <FormattedMessage id="app.home.open" />
                        </span>
                    </TileButton>
                </div>
            </div>
        </>;
    }
}

export default connect((state: RootState) => state.canvas,
    {disableOrbitControls, enableOrbitControls, disableSky, setBrushOpacity, setBrushSize, setBrush})(HomePage);
