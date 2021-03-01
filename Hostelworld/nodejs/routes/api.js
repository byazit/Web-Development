const express = require('express');
const router = express.Router();
const Country = require('../models').Country;
const City = require('../models').City;
const Airport = require('../models').Airport;
const Route = require('../models').Route;
const { Op, Sequelize, JSONB, where } = require("sequelize");

router.get('/country/:nameId/routes', function (req, res) {

    if (!req.params.nameId) {
        return res.json({ success: false, data: { message: 'Missing parameter' } });
    } else {

        Country.hasMany(Airport, { foreignKey: 'countryId', });
        Airport.hasMany(Route, { foreignKey: 'destiny', sourceKey: 'airportName' });
        Route.belongsTo(Airport, { foreignKey: 'origin', targetKey: 'airportName' });
        Airport.belongsTo(City, { foreignKey: 'cityId' });
        City.belongsTo(Country, { foreignKey: 'countryId' });

        Country
            .findAll({
                raw: true,
                where: {
                    countryName: { [Op.ne]: req.params.nameId },
                    id: { [Op.ne]: isNaN(req.params.nameId) == false ? req.params.nameId : "" }, //check if it's an integer                    
                },
                attributes: [
                    //'id',
                    'countryName',
                ],
                include: [{
                    model: Airport,
                    where: {
                        id: {
                            [Op.ne]: null
                        }
                    },
                    attributes: [
                        /* 'id',
                        'cityId',
                        'airportName' */
                    ],
                    include: [{
                        model: Route,
                        where: {
                            id: {
                                [Op.ne]: null
                            },
                        },
                        attributes: [
                            /* 'origin',
                            'destiny' */
                        ],
                        include: [{
                            model: Airport,
                            where: {
                                id: {
                                    [Op.ne]: null
                                }
                            },
                            attributes: [],
                            include: [{
                                model: City,
                                where: {
                                    id: {
                                        [Op.ne]: null
                                    }
                                },
                                attributes: [
                                    //'cityName'
                                ],
                                include: [{
                                    model: Country,
                                    where: {
                                        [Op.or]: {
                                            countryName: req.params.nameId,
                                            id: isNaN(req.params.nameId) == false ? req.params.nameId : "" //check if it's an integer
                                        }
                                    },
                                    attributes: [
                                        //'countryName'
                                    ],
                                }],
                            }],
                        }],
                    }],
                }]
            })
            .then((airports) => {
                if (airports.length > 0) {                    
                    let clean = airports.filter((airports, index, self) =>
                        index === self.findIndex((t) => (t.countryName === airports.countryName)));//removing duplicate country
                    res.json({ success: true, data: clean });
                } else {
                    res.json({ sucess: false, data: null, message: 'Invalid Country ID or Name' });
                }
            })
            .catch((error) => res.status(400).send({ success: false, data: null, message: error }));
    }
})

router.get('/findRoute/:from/:to', function (req, res) {

    if (!req.params.from || !req.params.to) {
        return res.json({ success: false, data: { message: 'Missing parameter' } });
    } else {

        if(isNaN(req.params.from)==true || isNaN(req.params.to)==true){
            return res.json({ success: false, data: { message: 'Please pass valid integer!' } });
        }
        Route.belongsTo(Airport, { foreignKey: 'origin', targetKey: 'airportName' });
        Airport.belongsTo(Route, { foreignKey: 'airportName', targetKey: 'destiny' });
        Airport.belongsTo(City, { foreignKey: 'cityId' });
        City.hasMany(Airport, { foreignKey: 'cityId' });
        City.findAll({
            raw: true,
            where: {
                id: {
                    [Op.ne]: null
                }
            },
            attributes: [
                ['cityName', 'destiny']
            ],
            include: [{
                model: Airport,
                where: {
                    id: req.params.to 
                },
                attributes: [
                    /* 'id',
                    'cityId',
                    'airportName' */
                ],
                include: [{
                    model: Route,
                    where: {
                        //id: req.params.to
                    },
                    attributes: [
                        /* 'origin',
                        'destiny', */
                    ],
                    include: [{
                        model: Airport,
                        where: {
                            //id: req.params.to
                        },
                        attributes: [
                            'cityId',
                        ],
                        include: [
                            {
                                model: City,
                                where: {
                                    id: {
                                        [Op.ne]: null
                                    }
                                },
                                attributes: [
                                    ['cityName', 'Connection']
                                ],
                                required: false,
                            },
                            {
                                model: Route,
                                where: {
                                    //id: req.params.to
                                },
                                attributes: [
                                    /* 'origin',
                                    'destiny', */
                                ],
                                include: [{
                                    model: Airport,
                                    where: {
                                        id: req.params.from
                                    },
                                    attributes: [
                                        /* 'id',
                                        'cityId',
                                        'airportName' */
                                    ],
                                    include: [{
                                        model: City,
                                        where: {
                                            id: {
                                                [Op.ne]: null
                                            }
                                        },
                                        attributes: [
                                            ['cityName', 'Origin']
                                        ],
                                        required: false
                                    }],
                                }],
                            }],
                    }],
                }],
            }]
        })
            .then((airports) => {
                if (airports.length > 0) {
                    res.json({ success: true, data: airports });
                } else {
                    res.json({ sucess: false, data: null, message: 'Invalid Country ID or Name' });
                }
            })
            .catch((error) => res.status(400).send({ success: false, data: null, message: error }));
    }
})

module.exports = router;