import React, {Component} from "react";

type StepType = {
    name: string
    validation?: () => void
    content: JSX.Element
}

type PropsType = {
    steps: Array<StepType>
    onFinish: () => void
}

type StateType = {
    current: number
}

class StepModal extends Component<PropsType, StateType>{
    state = {
        current: 1
    }

    render() {
        const { children, steps, onFinish } = this.props;
        const { current } = this.state;

        const goNext = () => this.setState((prev: StateType) => ({current: prev.current + 1}));
        const goBack = () => this.setState((prev: StateType) => ({current: prev.current - 1}));
        const prevButton = this.state.current === 1 ? <span/> : <button onClick={goBack}>{'<'}</button>;
        const nextButton = this.state.current === 2 ?
            <button onClick={onFinish}>{'Finish'}</button> :
            <button onClick={goNext}>{'>'}</button>;


        return <div className="step-container">
            <div className="step-container__header">
                {
                    steps.map((step, i) => (
                        <li className={`step 
                            ${i + 1 < current ? 'step-ok' : ''} 
                            ${i + 1 === current ? 'step-current' : ''}
                            `}
                        >
                            <div className={`step-circle`}>
                                <div className="step-circle__text">
                                    { i+1 }
                                </div>
                            </div>
                            <div>
                                {step.name}
                            </div>
                        </li>
                    ))
                }
            </div>
            <div className="step-container__content">
                {
                    steps[this.state.current-1].content
                }
            </div>
            <div className="step-container__navigation">
                {prevButton}
                {nextButton}
            </div>
        </div>;
    }
}

export default StepModal;
