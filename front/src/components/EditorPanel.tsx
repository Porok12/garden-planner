import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faLock, faLockOpen, faPlus} from "@fortawesome/free-solid-svg-icons";

const layers = [
    {
        name: "Layer 1",
        visible: false,
        locked: true,
        disabled: true
    },
    {
        name: "Layer 2",
        visible: true,
        locked: false,
        disabled: false
    }
]

class EditorPanel extends Component<any, any> {
    render() {
        return <div className="layer-panel">
            <div>
                <FontAwesomeIcon icon={faPlus}/>
            </div>
            <ul>
                {
                    layers.map(l => <li className="layer-panel__layer">
                        <span className="layer-panel__layer__name">{l.name}</span>
                        <span className="layer-panel__layer__options">
                        <FontAwesomeIcon icon={l.visible ? faEye : faEyeSlash}/>
                        <FontAwesomeIcon icon={l.locked ? faLock : faLockOpen} color={l.disabled ? 'gray' : 'black'}/>
                    </span>
                    </li>)
                }
            </ul>
            <div className="item-editor border-top">
                item-editor <br/>
                <div>Color: TODO</div>
                <div>Name: <input type="text" style={{width: '50%'}}/></div>
                <div>Description: ...</div>
                <div>
                    scale: <input type="range" style={{width: '50%'}}/>
                </div>
                <div>
                    rotation: <input type="range" style={{width: '50%'}}/>
                </div>
                <div>
                    position:
                    <input type="number" style={{width: '25%'}}/>
                    <input type="number" style={{width: '25%'}}/>
                </div>
            </div>
        </div>
    }
}

export default EditorPanel;