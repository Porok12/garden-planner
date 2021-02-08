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
    Pagination, Spinner, Row, Collapse, Col, Card
} from "react-bootstrap";
import {gql, GraphQLClient} from "graphql-request";
import AuthHeader from "../services/AuthHeader";
import axios from "axios";
import {config, useTransition, animated, useChain, useSpring} from "react-spring";
import MultiSelect from "react-multi-select-component";
import {FormattedMessage} from "react-intl";
import {faCaretDown, faSearch, faBars, faList, faTh} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import leaf from "../assets/leaf.svg";

interface BrowsePageProps {}

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
        selected: [],
        showAdvanced: false,
        gridMode: false
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
        const plantHabit = [
            {label: "Plant Habit", value: "plant habit"},
            {label: "Herb/Forb", value: "herb/forb"},
            {label: "Shrub", value: "shrub"},
            {label: "Tree", value: "tree"},
            {label: "Cactus/Succulent", value: "cactus/succulent"},
            {label: "Grass/Grass-like", value: "grass/grass-like"},
            {label: "Fern", value: "fern"},
            {label: "Vine", value: "vine"},
        ]

        const lifeCycle = [
            {label: "Annual", value: "annual"},
            {label: "Biennial", value: "biennial"},
            {label: "Perennial", value: "perennial"},
            {label: "Other", value: "other"},
        ]

        const sunRequirements = [
            {label: "Full Sun", value: "full sun"},
            {label: "Full Sun to Partial Shade", value: "full sun to partial shade"},
            {label: "Partial or Dappled Shade", value: "partial or dappled shade"},
            {label: "Partial Shade to Full Shade", value: "partial shade to full shade"},
            {label: "Full Shade", value: "full shade"},
        ]

        const waterPreferences = [
            {label: "In Water", value: "In Water"},
            {label: "Wet", value: "Wet"},
            {label: "Wet Mesic", value: "Wet Mesic"},
            {label: "Mesic", value: "Mesic"},
            {label: "Dry Mesic", value: "Dry Mesic"},
            {label: "Dry", value: "Dry"},
        ]

        const soilPhPreferences = [
            {label: "Extremely acid (3.5 – 4.4)", value: "Extremely acid"},
            {label: "Very strongly acid (4.5 – 5.0)", value: "Very strongly acid"},
            {label: "Strongly acid (5.1 – 5.5)", value: "Strongly acid"},
            {label: "Moderately acid (5.6 – 6.0)", value: "Moderately acid"},
            {label: "Slightly acid (6.1 – 6.5)", value: "Slightly acid"},
            {label: "Neutral (6.6 – 7.3)", value: "Neutral"},
            {label: "Slightly alkaline (7.4 – 7.8)", value: "Slightly alkaline"},
            {label: "Moderately alkaline (7.9 – 8.4)", value: "Moderately alkaline"},
            {label: "Strongly alkaline (8.5 – 9.0)", value: "Strongly alkaline"},
        ]

        const leaves = [
            "Good fall color",
            "Glaucous",
            "Unusual foliage color",
            "Evergreen",
            "Semi-evergreen",
            "Deciduous",
            "Fragrant",
            "Malodorous",
            "Variegated",
            "Spring ephemeral",
            "Needled",
            "Broadleaf",
            "Other"
        ]

        const fruit = [
            "Showy",
            "Edible to birds",
            "Dehiscent",
            "Indehiscent",
            "Pops open explosively when ripe",
            "Other"
        ]

        const fruitingTime = [
            "Late winter or early spring",
            "Spring",
            "Late spring or early summer",
            "Summer",
            "Late summer or early fall",
            "Fall",
            "Late fall or early winter",
            "Winter",
            "Year Round",
            "Other"
        ]

        const flowers = [
            "Showy",
            "Inconspicuous",
            "Fragrant",
            "Malodorous",
            "Nocturnal",
            "Blooms on old wood",
            "Blooms on new wood",
            "Other"
        ]

        const flowerColor = [
            "Brown",
            "Green",
            "Blue",
            "Lavender",
            "Mauve",
            "Orange",
            "Pink",
            "Purple",
            "Red",
            "Russet",
            "White",
            "Yellow",
            "Bi-Color",
            "Multi-Color",
            "Other"
        ]

        const bloomSize = [
            'Under 1"',
            '1"-2"',
            '2"-3"',
            '3"-4"',
            '4"-5"',
            '5"-6"',
            '6"-12"',
            'Over 12"'
        ]

        const flowerTime = [
            "Late winter or early spring",
            "Spring",
            "Late spring or early summer",
            "Summer",
            "Late summer or early fall",
            "Fall",
            "Late fall or early winter",
            "Winter",
            "Year Round",
            "Other"
        ]

        const cuitableLocations = [
            "Beach Front",
            "Street Tree",
            "Patio/Ornamental/Small Tree",
            "Xeriscapic",
            "Houseplant",
            "Terrariums",
            "Bog gardening",
            "Alpine Gardening",
            "Espalier",
            "Topiary"
        ]

        const uses = [
            "Windbreak or Hedge",
            "Dye production",
            "Provides winter interest",
            "Erosion control",
            "Guardian plant",
            "Groundcover",
            "Shade Tree",
            "Flowering Tree",
            "Water gardens",
            "Culinary Herb",
            "Medicinal Herb",
            "Vegetable",
            "Salad greens",
            "Cooked greens",
            "Cut Flower",
            "Dried Flower",
            "Will Naturalize",
            "Good as a cover crop",
            "Suitable as Annual",
            "Suitable for forage",
            "Useful for timber production",
            "Suitable for miniature gardens"
        ]

        const edibleParts = [
            "Bark",
            "Stem",
            "Leaves",
            "Roots",
            "Seeds or Nuts",
            "Sap",
            "Fruit",
            "Flowers"
        ]

        const eatingMethods = [
            "Tea",
            "Culinary Herb/Spice",
            "Raw",
            "Cooked",
            "Fermented"
        ]

        const wildlifeAttractant = [
            "Bees",
            "Birds",
            "Butterflies",
            "Hummingbirds",
            "Other Beneficial Insects"
        ]

        const resistances = [
            "Powdery Mildew",
            "Birds",
            "Deer Resistant",
            "Gophers/Voles",
            "Rabbit Resistant",
            "Squirrels",
            "Pollution",
            "Fire Resistant",
            "Flood Resistant",
            "Tolerates dry shade",
            "Tolerates foot traffic",
            "Humidity tolerant",
            "Drought tolerant",
            "Salt tolerant"
        ]

        const toxicity = [
            "Leaves are poisonous",
            "Roots are poisonous",
            "Fruit is poisonous",
            "Other"
        ]


        const items = this.state.results.map((r: Plant) => <tr>
            <th>{r.commonName}</th>
            <th>{r.binomialName}</th>
        </tr>);

        let card = <Card>
            <Card.Img variant="top" src={leaf} style={{maxHeight: "320px", transform: "scale(0.5)"}}/>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>;

        return <>
            <div className="search-box">
                <InputGroup>
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
                        <Button variant="outline-secondary" onClick={this.search.bind(this)} className="btn-svg">
                            <FontAwesomeIcon icon={faSearch} color="#fff" />
                            <FormattedMessage id="app.browse.search" />
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
                <Col className="text-right">
                    <Button variant="link"
                            style={{color: 'white'}}
                            onClick={() => this.setState(({showAdvanced}: BrowsePageState) => ({showAdvanced: !showAdvanced}))}
                            className="btn-svg"
                    >
                        <span>Wyszukiwanie zaawnsowane</span>
                        <FontAwesomeIcon icon={faCaretDown}
                                         size="2x"
                                         color="#fff"
                                         className={this.state.showAdvanced ? "rot180" : ""} />
                    </Button>
                </Col>
            </div>
            <Collapse in={this.state.showAdvanced}>
                <div className="advanced-search">
                    <Col className="col-6">
                        <Table>
                            <tbody>
                            <tr>
                                <th>
                                    Grupa roślin
                                </th>
                                <th>
                                    <MultiSelect options={plantHabit}
                                                 value={this.state.selected}
                                                 onChange={(value: any) => this.setState({selected: value})}
                                                 labelledBy={"Select"}
                                    />
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    Forma
                                </th>
                                <th>

                                </th>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </div>
            </Collapse>

            <div className="advanced-search row" style={{backgroundColor: 'white'}}>
                <div className="col">
                    <h3>Sort</h3>
                </div>
                <div className="col-md-6 text-right">
                    <ButtonGroup>
                        <Button variant={this.state.gridMode ? "secondary" : "primary"}
                                onClick={() => this.setState({gridMode: false})}>
                            <FontAwesomeIcon icon={faList} />
                        </Button>
                        <Button variant={this.state.gridMode ? "primary" : "secondary"}
                                onClick={() => this.setState({gridMode: true})}>
                            <FontAwesomeIcon icon={faTh} />
                        </Button>
                    </ButtonGroup>
                    {/*<Button className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"*/}
                    {/*        aria-expanded="false" aria-controls="navbar">*/}
                    {/*    <span className="sr-only">Toggle navigation</span>*/}
                    {/*    <FontAwesomeIcon icon={faBars} />*/}
                    {/*</Button>*/}
                </div>
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

            <div className="results-container">
                <div className="row">
                    {
                        this.state.results.map(res => (
                            <div className="col-12 col-md-6 col-lg-4">
                                {card}
                            </div>
                        ))
                    }
                </div>
                {/*<div className="row">*/}
                {/*    <div className="col-12">{card}</div>*/}
                {/*    <div className="col-12">{card}</div>*/}
                {/*    <div className="col-12">{card}</div>*/}
                {/*    <div className="col-12">{card}</div>*/}
                {/*</div>*/}
                {/*<Table  bordered hover>*/}
                {/*    <thead>*/}
                {/*    <tr>*/}
                {/*        <th>Common Name</th>*/}
                {/*        <th>Binomial Name</th>*/}
                {/*    </tr>*/}
                {/*    </thead>*/}
                {/*    <tbody>*/}
                {/*    <Foo list={this.state.results} />*/}
                {/*    </tbody>*/}
                {/*</Table>*/}
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
        </>;
    }
}

export default BrowsePage;
