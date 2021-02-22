import React, {Component, useRef} from "react";
import {
    Button,
    FormControl,
    FormLabel,
    InputGroup,
    Form,
    FormGroup,
    ButtonGroup,
    Table,
    Pagination, Spinner, Collapse, Col, Container
} from "react-bootstrap";
import {gql, GraphQLClient} from "graphql-request";
import {config, useTransition, animated, useChain, useSpring} from "react-spring";
import MultiSelect from "react-multi-select-component";
import {FormattedMessage} from "react-intl";
import {faCaretDown, faSearch, faBars, faList, faTh, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import leaf from "../assets/leaf.svg";
import {fetchBrowse} from "../store/browser/reducers";
import {connect} from "react-redux";
import Card from "./Card";
import ItemList from "./ItemList";
import SearchBox from "./SearchBox";
import SortBell from "./SortBell";

type Plant = {
    commonName: string;
    binomialName: string;
}

type BrowsePageState = {
    results: Array<Plant>;
    loading: boolean;
    selected: Array<any>;
    showAdvanced?: boolean;
    gridMode: boolean;
}

class BrowsePage extends Component<any, BrowsePageState>{
    state = {
        results: [
            {
                commonName: 'Sea buckthorn',
                binomialName: 'Hippophae rhamnoides'
            }
        ],
        loading: false,
        selected: [],
        showAdvanced: false,
        gridMode: false
    }

    search() {
        this.setState({loading: true});

        const query = gql`
            {
                trefle {
                    commonName
                    binomialName
                }
            }
        `;
        const client = new GraphQLClient('graphql');
        client.request(query)
            .then((data) => this.setState({results: data.trefle, loading: false}))
            .catch((err) => console.log(err));
    }

    render() {
        return <Container fluid="lg">
            <SearchBox onSearch={this.search.bind(this)} />
            <SortBell toggleGrid={(toggle) => this.setState({gridMode: toggle})} />

            <div className="results-container">
                <div className="row">
                    {
                        this.state.gridMode ?
                            this.state.results.map(res => (
                                <div className="col-12 col-md-6 col-lg-4">
                                    <Card data={res} />
                                </div>
                            ))
                            :
                            this.state.results.map(res => (
                                <div className="col-12">
                                    <ItemList data={res} />
                                </div>
                            ))
                    }
                </div>
            </div>

            <Spinner animation="border" role="status" hidden={!this.state.loading}>
                <span className="sr-only">Loading...</span>
            </Spinner>

            <Pagination>
                <Pagination.Prev></Pagination.Prev>
                <Pagination.Item active>1</Pagination.Item>
                <Pagination.Item>2</Pagination.Item>
                <Pagination.Next></Pagination.Next>
            </Pagination>
        </Container>;
    }
}

export default connect(null, {fetchBrowse})(BrowsePage);
