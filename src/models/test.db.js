module.exports = function pushData(db) {
    db.role.create({
        id: 1,
        name: "user"
    });

    db.role.create({
        id: 2,
        name: "moderator"
    });

    db.role.create({
        id: 3,
        name: "admin"
    });

    db.user.create({
        id: 1,
        username: 'agata',
        email: 'aga@best.pl',
        password: 'A665A45920422F9D417E4867EFDC4FB8A04A1F3FFF1FA07E998E86F7F7A27AE3'.toLowerCase(),
        activated: '1'
    }).then(user => {
        user.addRole(1);
        user.createProject({
            name: 'First project',
            description: 'Project created for testing purposes'
        });
    });

    db.plant.create({
        commonName: 'siberian pine',
        binomialName: 'pinus sibirica',
        kingdom: 'plantae',
        family: 'pinaceae',
        genus: 'pinus'
    });

    db.plant.create({
        commonName: 'eastern white pine',
        binomialName: 'pinus strobus',
        kingdom: 'plantae',
        family: 'pinaceae',
        genus: 'Pinus'
    });

    db.plant.create({
        commonName: 'swiss pine',
        binomialName: 'pinus cembra',
        kingdom: 'plantae',
        family: 'pinaceae',
        genus: 'pinus'
    });

    db.plant.create({
        commonName: 'korean pine',
        binomialName: 'pinus koraiensis',
        kingdom: 'plantae',
        family: 'pinaceae',
        genus: 'pinus'
    });

    db.plant.create({
        commonName: 'siberian dwarf pine',
        binomialName: 'pinus pumila',
        kingdom: 'plantae',
        family: 'pinaceae',
        genus: 'pinus'
    });
}
