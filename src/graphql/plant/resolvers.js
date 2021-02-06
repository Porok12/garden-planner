const fetch = require('node-fetch');
const db = require("../../models");
const Plant = db.plant;

module.exports = {
    plants: (args, request) => {
        const {page, slice} = args.pagination;
        return Plant.findAll({
            where: { ...args.input },
            offset: (page - 1) * slice,
            limit: slice
        });
    },
    plant: (args) => {
        return Plant.findOne({where: { ...args.input }});
    },
    addPlant: (args, request) => {
        return Plant.create(args.input)
            .then(plant => "success")
            .catch(err => "fail");
    },
    countPlants: (args, request) => {
        return Plant.count({
            where: { ...args.input }
        }).then(count => {
            return {
                total: count
            }
        });
    },
    trefle: (args, request, _) => {
        const API = 'https://trefle.io/api/v1';
        const API_PLANTS = `${API}/plants`;
        const API_SPECIES = `${API}/species`;
        const API_KINGDOMS = `${API}/kingdoms`;
        const API_SUBKINGDOMS = `${API}/subkingdoms`;
        const API_DIVISIONS = `${API}/divisions`;
        const API_FAMILIES = `${API}/families`;
        const API_GENUS = `${API}/genus`;
        const TOKEN = 'aiNYRAoC0YYXJ9xfD9VlfsNfM1wuEALBkqPWho2TWAU';
        const FILTER = 'filter[family]=pinaceae';
        const Q = 'q=pinus';

        //&page=2
        return fetch(`${API_PLANTS}${'/search'}?token=${TOKEN}&${Q}`)
            .then(res => res.json())
            .then(body => {
                const list = body.data.map(({common_name, scientific_name, family, genus}) => ({
                    commonName: common_name,
                    binomialName: scientific_name,
                    family: family,
                    genus: genus

                }));
                return list;
            });
    },
}

/* TODO:
    - duration (annual, biennial, perennial)
    - ediblePart []
    - edible
    - vegetable
    - observations
    - synonyms
    - growth
 */
