/*  
    Maayan Aimelak ID: 205646722
    Yasmin Solomon ID: 315601005    
*/
const express = require('express');
const { Calorie } = require('../models/dataBase');
const router = express.Router();
// GET detailed report for a specific month and year
router.get('/', async (req, res) => {
    try {
        const { user_id, year, month } = req.query;

        // validate user_id, year, and month are provided
        if (!user_id || !year || !month) {
            return res.status(400).json({ error: 'Missing parameters: user_id, year, and month are required.' });
        }

        // convert year and month to numbers
        const parsedYear = parseInt(year, 10);
        const parsedMonth = parseInt(month, 10);

        // check if year and month are valid numbers
        if (isNaN(parsedYear) || isNaN(parsedMonth)) {
            return res.status(400).json({ error: 'Invalid year or month format. Please provide valid numbers.' });
        }

        const calorieDocuments = await Calorie.find({ user_id, year: parsedYear, month: parsedMonth });

        // initialize report object with categories
        const reportDocument = {
            breakfast: [],
            lunch: [],
            dinner: [],
            other: []
        };

        // populate reportDocument with data from calorieDocuments
        calorieDocuments.forEach((calorie) => {
            const { day, description, amount, category } = calorie;
            reportDocument[category].push({ day, description, amount });
        });

        // return the reportDocument
        res.status(200).json(reportDocument);
    } catch (error) {
        console.error('Error fetching calories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
