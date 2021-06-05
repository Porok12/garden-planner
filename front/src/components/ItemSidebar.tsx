import React, {Component} from "react";

let temporary = [
    {
        name: "Ulubione",
        items: [
            "item1",
            "item2",
            "item3"
        ]
    },
    {
        name: "Drzewa",
        items: [
            "item4",
            "item5",
            "item6",
            "item7",
            "item8",
            "item9",
            "item0"
        ]
    },
    {
        name: "Krzewy",
        items: [
            "item1",
            "item2",
            "item3"
        ]
    },
]

type StateType = {
    selected: string;
    searchText: string;
}

class ItemSidebar extends Component<any, StateType> {
    state: StateType = {
        selected: "",
        searchText: ""
    }

    toggleCategory(category: string) {
        this.setState((pState: StateType) => ({
            selected: (pState.selected !== category) ? category : ""
        }))
    }

    handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState((pState: StateType) => ({
            searchText: e.target.value
        }))
    }

    clearSearch() {
        this.setState((pState: StateType) => ({
            searchText: ""
        }))
    }

    render() {
        const {searchText} = this.state;

        return <div className="editor-sidebar">
            <div className="editor-sidebar__nav">
                <div className="editor-sidebar__search">
                    <span className="search-icon"/>
                    <input type="text" onChange={this.handleSearch.bind(this)} value={searchText}/>
                    {searchText && <span className="removeable" onClick={this.clearSearch.bind(this)}/>}
                    <button>Search</button>
                </div>
                <div className="editor-sidebar__options">
                    <div className="editor-sidebar__option">
                        1
                    </div>
                    <div className="editor-sidebar__option">
                        2
                    </div>
                </div>
            </div>
            <div className="editor-sidebar__filters">
                <input type="checkbox"/>
            </div>
            <div className="editor-sidebar__content">
                {/*<ul>*/}
                {/*    <li className="editor-sidebar__item">*/}
                {/*        {"search"}*/}
                {/*    </li>*/}
                {/*    <li className="editor-sidebar__item">*/}
                {/*        {"search"}*/}
                {/*    </li>*/}
                {/*    <li className="editor-sidebar__item">*/}
                {/*        {"search"}*/}
                {/*    </li>*/}
                {/*</ul>*/}
                {
                    temporary.map(category =>
                        <ul>
                            <li className={`editor-sidebar__category ${this.state.selected === category.name ? "opened" : ""}`}
                                onClick={() => this.toggleCategory(category.name)}>
                                <span>{category.name}</span>
                            </li>
                            {
                                this.state.selected === category.name &&
                                category.items.map(item =>
                                    <li className="editor-sidebar__item">
                                        <span>{item}</span>
                                    </li>
                                )
                            }
                        </ul>
                    )
                }
            </div>
        </div>;
    }
}

export default ItemSidebar;