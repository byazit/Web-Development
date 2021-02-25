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
        City.hasMany(Airport, { foreignKey: 'id' });
        Airport.belongsTo(City, { foreignKey: 'cityId' });

        Country.hasMany(City, { foreignKey: 'id' });
        City.belongsTo(Country, { foreignKey: 'countryId' });

        const myData = [];

        Airport
            .findAll({
                raw: true,
                where: {
                    id: {
                        [Op.ne]: null
                    }
                },
                attributes: [
                    ['id', 'airportId'],
                    'cityId'
                ],
                include: [{
                    model: City,
                    where: {
                        id: {
                            [Op.ne]: null
                        }
                    },
                    attributes: [
                        'cityName'
                    ],
                    include: [{
                        model: Country,
                        where: {
                            [Op.or]: {
                                countryName: req.params.nameId,
                                id: req.params.nameId
                            }
                        },
                        attributes: ['countryName'],
                    }],
                }],
            })
            .then((airports) => {
                if(airports.length>0){
                    for (let i = 0; i < airports.length; i++) {
                        myData[i] = {
                            airportId: airports[i].airportId,
                            cityId: airports[i].cityId,
                            cityName: airports[i]['City.cityName'],
                            countryName: airports[i]['City.Country.countryName'],
                        }
                    }
                    res.json({ success: true, data: myData });
                }else{
                    res.json({ sucess: false,data: null,message: 'Invalid Country ID or Name' });
                }
            })
    }
})

module.exports = router;