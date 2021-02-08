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
    Pagination, Spinner, Row
} from "react-bootstrap";
import {gql, GraphQLClient} from "graphql-request";
import AuthHeader from "../services/AuthHeader";
import axios from "axios";
import {config, useTransition, animated, useChain, useSpring} from "react-spring";
import MultiSelect from "react-multi-select-component";
import {FormattedMessage} from "react-intl";

interface BrowsePageProps {}

type Plant = {
    commonName: string;
    binomialName: string;
}

type BrowsePageState = {
    results: Array<Plant>
    loading: boolean
    selected: Array<any>
}

const Foo = (props: { list: Array<any> }) => {
    // const listTransitions = useTransition(props.list, {
    //     config: config.gentle,
    //     from: { opacity: 0, transform: "translate3d(-25%, 0px, 0px)" },
    //     enter: { opacity: 1, transform: "translate3d(0%, 0px, 0px)" },
    //     leave: { opacity: 0, height: 0, transform: "translate3d(25%, 0px, 0px)" },
    //     keys: props.list.map((item, index) => index)
    // });


    const transitionRef = useRef<any>();
    const listTransitions = useTransition(props.list, null, {
        ref: transitionRef,
        unique: true,
        trail: 800 / props.list.length,
        config: config.gentle,
        from: { opacity: 0, transform: "translate3d(-25%, 0px, 0px)" },
        enter: { opacity: 1, transform: "translate3d(0%, 0px, 0px)" },
        leave: { opacity: 0, height: 0, transform: "translate3d(25%, 0px, 0px)" },
        // @ts-ignore
        keys: props.list.map((item: any, index: number) => index)
    });

    const reset = () => {};
    // const reset = useCallback(() => {
    //     ref.current.map(clearTimeout)
    //     ref.current = []
    //     set([])
    //     ref.current.push(setTimeout(() => set(['Apples', 'Oranges', 'Kiwis']), 2000))
    //     ref.current.push(setTimeout(() => set(['Apples', 'Kiwis']), 5000))
    //     ref.current.push(setTimeout(() => set(['Apples', 'Bananas', 'Kiwis']), 8000))
    // }, [])

    // const springRef = useRef<any>();
    // const _props = useSpring({
    //     ref: springRef,
    //     config: config.stiff,
    //     from: { size: '20%', background: 'hotpink' },
    //     to: { size: false ? '100%' : '20%', background: false ? 'white' : 'hotpink' }
    // })

    useChain([/*springRef,*/ transitionRef]);

    return <>
        {/*{listTransitions((styles, item) => (*/}
        {/*    <animated.tr style={styles}>{item}</animated.tr>*/}
        {/*))}*/}

        {listTransitions.map(({ item, props, key }) => (
            <animated.tr key={key} style={props}>
                <th>{item.commonName}</th>
                <th>{item.binomialName}</th>
            </animated.tr>
            // <animated.div className="transitions-item" key={key} style={rest} onClick={reset}>
            //     <animated.div style={{ overflow: 'hidden', opacity: opacity }}>{item}</animated.div>
            // </animated.div>
        ))}
    </>;
}

class BrowsePage extends Component<BrowsePageProps, BrowsePageState>{
    state = {
        results: [],
        loading: false,
        selected: []
    }

    search() {
        this.setState({loading: true});

        // const query = gql`
        //     {
        //         plants {
        //             commonName
        //             binomialName
        //             kingdom
        //             family
        //             genus
        //         }
        //     }
        // `;
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
        const items = this.state.results.map((r: Plant) => <tr>
            <th>{r.commonName}</th>
            <th>{r.binomialName}</th>
        </tr>);

        return <>
            <div className="search-box">
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="search-icon">
                            <i className="fa fa-search fa-2x" aria-hidden="true"></i>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <div className="form-group">
                        <FormControl
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                        <FormLabel>
                            <FormattedMessage id="app.browse.search.prompt" />
                        </FormLabel>
                    </div>
                    <InputGroup.Append>
                        <Button variant="outline-primary" onClick={this.search.bind(this)}>
                            <FormattedMessage id="app.browse.search" />
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
            <div className="advanced-search">
                {/*<Form.Group controlId="formCheckbox2" className="text-left">*/}
                {/*    <Form.Check type="checkbox" label="Remember me" className="primary"/>*/}
                {/*</Form.Group>*/}
                {/*<Form.Group controlId="formCheckbox3" className="text-left">*/}
                {/*    <Form.Check type="checkbox" label="Remember me" className="primary"/>*/}
                {/*</Form.Group>*/}

                {/*<FormControl type="select"></FormControl>*/}
                {/*<Button>bta1</Button>*/}
                {/*<MultiSelect options={[*/}
                {/*    { label: "Strawberry 🍓", value: "strawberry", disabled: true },*/}
                {/*    { label: "Watermelon 🍉", value: "watermelon" },*/}
                {/*    { label: "Pear 🍐", value: "pear" },*/}
                {/*    { label: "Apple 🍎", value: "apple" }*/}
                {/*]}*/}
                {/*             value={this.state.selected}*/}
                {/*             onChange={(value: any) => this.setState({selected: value})}*/}
                {/*             labelledBy={"Select"}*/}
                {/*/>*/}
            </div>

            <div className="col-md-6 text-right">
                <ButtonGroup>
                    <Button variant="secondary"><i className="fa fa-list"></i></Button>
                    <Button variant="secondary"><i className="fa fa-th"></i></Button>
                </ButtonGroup>
                <Button className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                        aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <i className="ic fa fa-bars"></i>
                </Button>
            </div>

            {/*<div className="msb" id="msb">*/}
            {/*    <nav className="navbar navbar-default" role="navigation">*/}
            {/*        <div className="navbar-header">*/}
            {/*            <div className="brand-wrapper">*/}
            {/*                <div className="brand-name-wrapper">*/}
            {/*                    <a className="navbar-brand" href="#">*/}
            {/*                        <i className="fa fa-filter"></i> Filters*/}
            {/*                    </a>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </nav>*/}
            {/*</div>*/}

            <Table  striped bordered hover>
                <thead>
                    <tr>
                        <th>Common Name</th>
                        <th>Binomial Name</th>
                    </tr>
                </thead>
                <tbody>
                    <Foo list={this.state.results} />
                </tbody>
            </Table>

            <Spinner animation="border" role="status" hidden={!this.state.loading}>
                <span className="sr-only">Loading...</span>
            </Spinner>

            <Pagination>
                <Pagination.Prev></Pagination.Prev>
                <Pagination.Item active>1</Pagination.Item>
                <Pagination.Item>2</Pagination.Item>
                <Pagination.Next></Pagination.Next>
            </Pagination>
        </>;
    }
}

export default BrowsePage;
