/*  
    Maayan Aimelak ID: 205646722
    Yasmin Solomon ID: 315601005    
*/
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { Calorie, User } = require('../models/dataBase');

// validate input using express-validator
const validateInput = [
  check('user_id').isNumeric().withMessage('User ID must be a number'),
  check('description').trim().notEmpty().withMessage('Description cannot be empty'),
  check('category').isIn(['breakfast', 'lunch', 'dinner', 'other']).withMessage('Invalid category'),
  check('amount').isNumeric().withMessage('Amount must be a number'),
];

// POST request to add new calorie consumption
router.post('/', validateInput, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // convert user_id to string explicitly
  const { user_id, year, month, day, description, category, amount } = req.body;

  try {
    // validate user_id exists in users collection
    const userExists = await User.findOne({ id: user_id });
    // if user not found
    if (!userExists) {
      return res.status(404).send('User not found');
    }

    // create new calorie consumption document
    const newCalorie = new Calorie({
      user_id,
      year,
      month,
      day,
      description,
      category,
      amount,
    });

    await newCalorie.save();
    // return the calorie consumption added in JSON format
    res.status(201).json(newCalorie);
  } catch (error) {
    console.error('Error adding calorie consumption:', error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
