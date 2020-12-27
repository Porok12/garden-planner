const db = require("../../models");
const Plant = db.plant;

module.exports = {
    plants: (args, request) => {
        const {page, slice} = args.pagination;
        return Plant.findAll({
            where: { ...args.input },
            offset: (page - 1) * slice,
            limit: slice
        }).then(plants => {
            return Plant.count({ where: { ...args.input } })
                .then(count => {
                    plants.push({total: count});
                    return plants;
            });
        });
    },
    plant: (args) => {
        return Plant.findOne({where: { ...args.input }});
    },
    addPlant: (args, request) => {
        return Plant.create(args.input)
            .then(plant => "success")
            .catch(err => "fail");
    }
}
