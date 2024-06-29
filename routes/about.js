/*  
    Maayan Aimelak ID: 205646722
    Yasmin Solomon ID: 315601005    
*/
const express = require('express');
const router = express.Router();

// GET detailed about the developers and return it in JSON format
router.get('/', function(req,res) {
    const developers = [
        {
            firstname: 'Maayan',
            lastname: 'Aimelak',
            id: '205646722',
            email: 'Maayanaimelak@gmail.com'
        },
        {
            firstname: 'Yasmin',
            lastname: 'solomon',
            id: '315601005',
            email: 'Yasmins105@gmail.com'
        }
    ];
    res.status(200).json(developers);
});

module.exports = router;
