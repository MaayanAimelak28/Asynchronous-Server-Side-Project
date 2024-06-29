/*  
    Maayan Aimelak ID: 205646722
    Yasmin Solomon ID: 315601005    
*/
const express = require('express');
const router = express.Router();
const { User } = require('../models/dataBase');

// GET detailed description of a specific user
router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // find user by id in the database
        const user = await User.findOne({ id: userId });
        // if user not found
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // return user details in JSON format
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
