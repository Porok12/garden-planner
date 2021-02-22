import React, {Component} from "react";
import leaf from "../assets/leaf.svg";
import {Button, Card} from "react-bootstrap";
import {faHeart, faShareAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class CardItem extends Component<any, any>{
    render() {
        console.log(this.props.data);
        const { commonName, binomialName } = this.props.data;

        return <div className="mb-3">
            <Card className="card-item">
                <Card.Img variant="top" src="https://www.mojpieknyogrod.pl/uploads/media/default/0001/57/rokitnik-pospolity-hippophae-rhamnoides-owocuje-jesienia-na-szczescie-czasochlonne-zbieranie-drobnych-owocow-ulatwiaja-mrozy-zdj-adobe-stock.jpeg" style={{maxWidth: "347px", transform: "scale(1.0)"}}/>
                <Card.Body>
                    <Card.Title>
                        {commonName}
                    </Card.Title>
                    <Card.Subtitle>
                        {binomialName}
                    </Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <div className="d-flex">
                        <Button variant="link">Read More</Button>
                        <div className="mx-auto" />
                        <Button variant="outline-primary" className="button--icon">
                            <FontAwesomeIcon icon={faHeart} />
                        </Button>
                        <div className="mx-1" />
                        <Button variant="outline-primary" className="button--icon">
                            <FontAwesomeIcon icon={faShareAlt} />
                        </Button>
                    </div>
                </Card.Footer>
            </Card>
        </div>;
    }
}

export default CardItem;



// <div className="mdl-card mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-shadow--2dp">
//     <figure className="mdl-card__media">
//         <img src="https://tfirdaus.github.io/mdl/images/laptop.jpg" alt=""/>
//     </figure>
//     <div className="mdl-card__title">
//         <h1 className="mdl-card__title-text">Learning Web Design</h1>
//     </div>
//     <div className="mdl-card__supporting-text">
//         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam accusamus, consectetur.</p>
//     </div>
//     <div className="mdl-card__actions mdl-card--border">
//         <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Read More</a>
//         <div className="mdl-layout-spacer"></div>
//         <button className="mdl-button mdl-button--icon mdl-button--colored"><i
//             className="material-icons">favorite</i></button>
//         <button className="mdl-button mdl-button--icon mdl-button--colored"><i
//             className="material-icons">share</i></button>
//     </div>
// </div>
