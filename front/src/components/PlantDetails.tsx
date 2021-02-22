import React, {Component} from "react";
import {RouteChildrenProps} from "react-router-dom";
import {Button, Container} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft, faBackward, faCaretLeft, faCaretSquareLeft, faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import { Radar } from "react-chartjs-2";

const data = {
    labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
    datasets: [
        {
            label: '# of Votes',
            data: [2, 9, 3, 5, 2, 3],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        },
    ],
}

const options = {
    scale: {
        ticks: { beginAtZero: true },
    },
}

class PlantDetails extends Component<RouteChildrenProps, any>{
    render() {
        const params = this.props.match?.params;

        return <>
            <div>
                <Button onClick={() => this.props.history.goBack()}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Button>

                PlantDetails: {JSON.stringify(params)}
                <Container>
                    <Radar data={data} options={options} />
                </Container>
            </div>
        </>;
    }
}

export default PlantDetails;
