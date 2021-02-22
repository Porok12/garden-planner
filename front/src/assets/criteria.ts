export type CritType = {
    type: string,
    items: Array<{
        label: string,
        value: string
    }>
}

const criteria: Array<CritType> = [
    {
        "type": "plant-habit",
        "items": [
            {
                "label": "Tree/Drzewo", "value": "tree"
            }, {
                "label": "Shrub/Krzak", "value": "shrub"
            }, {
                "label": "Vine/Pnącze", "value": "vine"
            }, {
                "label": "Shrublet/krzewinka", "value": "shrublet"
            }, {
                "label": "Herb/Zioło", "value": "herb"
            }, {
                "label": "Succulent/Sukulent", "value": "succulent"
            }
        ]
    },
    {
        "type": "life-cycle",
        "items": [
            {
                "label": "Annual/Jednoroczna", "value": "annual"
            }, {
                "label": "Biennial/Dwuletnia", "value": "biennial"
            }, {
                "label": "Perennial/Wieloletnia", "value": "perennial"
            }, {
                "label": "Other/Inna", "value": "other"
            }
        ]
    },
    {
        "type": "sun-requirements",
        "items": [
            {
                "label": "Full Sun", "value": "full sun"
            }, {
                "label": "Full Sun to Partial Shade", "value": "full sun to partial shade"
            }, {
                "label": "Partial or Dappled Shade", "value": "partial or dappled shade"
            }, {
                "label": "Partial Shade to Full Shade", "value": "partial shade to full shade"},
            {
                "label": "Full Shade", "value": "full shade"
            }
        ]
    },
    {
        "type": "water-requirements",
        "items": [
            {
                "label": "In Water", "value": "In Water"}, {
                "label": "Wet", "value": "Wet"
            }, {
                "label": "Wet Mesic", "value": "Wet Mesic"
            }, {
                "label": "Mesic", "value": "Mesic"
            }, {
                "label": "Dry Mesic", "value": "Dry Mesic"
            }, {
                "label": "Dry", "value": "Dry"
            }
        ]
    },
    {
        "type": "pH-preferences",
        "items": [
            {
                "label": "Extremely acid (3.5 – 4.4)", "value": "Extremely acid"
            }, {
                "label": "Very strongly acid (4.5 – 5.0)", "value": "Very strongly acid"
            }, {
                "label": "Strongly acid (5.1 – 5.5)", "value": "Strongly acid"
            }, {
                "label": "Moderately acid (5.6 – 6.0)", "value": "Moderately acid"
            }, {
                "label": "Slightly acid (6.1 – 6.5)", "value": "Slightly acid"
            }, {
                "label": "Neutral (6.6 – 7.3)", "value": "Neutral"
            }, {
                "label": "Slightly alkaline (7.4 – 7.8)", "value": "Slightly alkaline"
            }, {
                "label": "Moderately alkaline (7.9 – 8.4)", "value": "Moderately alkaline"
            }, {
                "label": "Strongly alkaline (8.5 – 9.0)", "value": "Strongly alkaline"
            }
        ]
    },
    {
        "type": "fruit",
        "items": [
            {
                "label": "Showy", "value": "Showy"
            },
            {
                "label": "Edible to birds", "value": "Edible to birds"
            },
            {
                "label": "Dehiscent", "value": "Dehiscent"
            },
            {
                "label": "Indehiscent", "value": "Indehiscent"
            },
            {
                "label": "Pops open explosively when ripe", "value": "Pops open explosively when ripe"
            },
            {
                "label": "Other", "value": "Other"
            }
        ]
    },
    {
        "type": "fruit-time",
        "items": [
            {
                "label": "Late winter or early spring", "value": "Late winter or early spring"
            },
            {
                "label": "Spring", "value": "Late spring or early summer"
            },
            {
                "label": "Summer", "value": "Summer"
            },
            {
                "label": "Late summer or early fall", "value": "Late summer or early fall"
            },
            {
                "label": "Fall", "value": "Fall"
            },
            {
                "label": "Late fall or early winter", "value": "Late fall or early winter"
            },
            {
                "label": "Winter", "value": "Winter"
            },
            {
                "label": "Year Round", "value": "Year Round"
            },
            {
                "label": "Other", "value": "Other"
            },
        ]
    },
    {
        "type": "edible-parts",
        "items": [
            {
                "label": "Bark", "value": "Bark"
            },
            {
                "label": "Stem", "value": "Stem"
            },
            {
                "label": "Leaves", "value": "Leaves"
            },
            {
                "label": "Roots", "value": "Roots"
            },
            {
                "label": "Seeds or Nuts", "value": "Seeds or Nuts"
            },
            {
                "label": "Sap", "value": "Sap"
            },
            {
                "label": "Fruit", "value": "Fruit"
            },
            {
                "label": "Flowers", "value": "Flowers"
            }
        ]
    }
]


export default criteria;
