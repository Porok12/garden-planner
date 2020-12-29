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
}
