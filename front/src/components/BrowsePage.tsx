import React, {Component} from "react";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {gql, GraphQLClient} from "graphql-request";
import AuthHeader from "../services/AuthHeader";
import axios from "axios";

interface BrowsePageProps {}

type BrowsePageState = {
    results: Array<any>
}

class BrowsePage extends Component<BrowsePageProps, BrowsePageState>{
    state = {
        results: []
    }

    search() {
        const query = gql`
            {
                plants {
                    ... on PlantType {
                        commonName
                        binomialName
                        kingdom
                        family
                        genus
                    }
                }
            }
        `;
        const client = new GraphQLClient('graphql');
        client.request(query)
            .then((data) => this.setState({results: data.plants}))
            .catch((err) => console.log(err));
    }

    render() {
        return <div className="container">
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="search-icon">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={this.search.bind(this)}>Search</Button>
                </InputGroup.Append>
            </InputGroup>

            {
                this.state.results.map(r => <>{JSON.stringify(r)} <br/></>)
            }
        </div>;
    }
}

export default BrowsePage;
