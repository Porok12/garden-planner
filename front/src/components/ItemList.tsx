import React, {Component} from "react";
import leaf from "../assets/leaf.svg";
import {Button, Card, Col, Row} from "react-bootstrap";
import {faHeart, faShareAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class ItemList extends Component<any, any>{
    render() {
        console.log(this.props.data);
        const { commonName, binomialName } = this.props.data;

        return <div className="mb-3">
            <Card className="card-item">
                <Row>
                    <Col md="4">
                        <Card.Img variant="top" src="https://www.mojpieknyogrod.pl/uploads/media/default/0001/57/rokitnik-pospolity-hippophae-rhamnoides-owocuje-jesienia-na-szczescie-czasochlonne-zbieranie-drobnych-owocow-ulatwiaja-mrozy-zdj-adobe-stock.jpeg" style={{maxWidth: "347px", transform: "scale(1.0)"}}/>
                    </Col>
                    <Col md="8">
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
                        {/*<Card.Footer>*/}
                        {/*    <div className="d-flex">*/}
                        {/*        <Button variant="link">Read More</Button>*/}
                        {/*        <div className="mx-auto" />*/}
                        {/*        <Button variant="outline-primary" className="button--icon">*/}
                        {/*            <FontAwesomeIcon icon={faHeart} />*/}
                        {/*        </Button>*/}
                        {/*        <div className="mx-1" />*/}
                        {/*        <Button variant="outline-primary" className="button--icon">*/}
                        {/*            <FontAwesomeIcon icon={faShareAlt} />*/}
                        {/*        </Button>*/}
                        {/*    </div>*/}
                        {/*</Card.Footer>*/}
                    </Col>
                </Row>
            </Card>
        </div>;
    }
}

export default ItemList;
