/*  
    Maayan Aimelak ID: 205646722
    Yasmin Solomon ID: 315601005    
*/
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
// module to provide and generate random ID
const uuid = require('uuid');

try {
    const Schema = mongoose.Schema;

    // USERS collection structure
    const usersSchema = new Schema({
        id: Number,
        first_name: String,
        last_name: String,
        birthday: Date,
    });

    // CALORIES collection structure
    const caloriesSchema = new Schema({
        user_id: {
            type: Number,
            required: true,
        },
        year: {
            type: Number,
            required: false,
            validate: [validateDate, null, null, '1900-2300'],
        },
        month: {
            type: Number,
            required: false,
            validate: [validateDate, null, '1-12', null],
        },
        day: {
            type: Number,
            required: false,
            validate: [validateDate, '1-31', null, null],
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ['breakfast', 'lunch', 'dinner', 'other'],
        },
        amount: {
            type: Number,
            required: true,
        },
        id: {
            type: String,
            index: true,
            required: true,
            unique: true,

            // create a random value number to the ID parameter
            default: () => {
                return uuid.v4();
            }
        }
    });











    
    // function to validate date values
    function validateDate(day, month, year) {
        if (day != null && month == null && year == null) {
            if (day >= 1 && day <= 31) {
                return day;
            }
        }
        else if (day == null && month != null && year == null) {
            if (month >= 1 && month <= 12) {
                return month;
            }
        }
        else if (day == null && month == null && year != null) {
            if (year >= 1900 && year <= 2300) {
                return year;
            }
        }
    }

    // define User and Calorie models
    const User = mongoose.model('user', usersSchema);
    const Calorie = mongoose.model('calorie', caloriesSchema);
    

    // create a single document of a user
    const user = new User({
        id: '123123',
        first_name: 'moshe',
        last_name: 'israeli',
        // use UTC to ensure correct date representation
        birthday: new Date(Date.UTC(1990, 0, 10)), 
    });

    // middleware to set default date values
    caloriesSchema.pre('save', function (next) {
        const timeRightNow = new Date();

        if (this.year == null) {
            this.year = timeRightNow.getFullYear();
        }
        if (this.month == null) {
            this.month = timeRightNow.getMonth() + 1;
        }
        if (this.day == null) {
            this.day = timeRightNow.getDate();
        }

        next();
    });

    // function to check if user exists in DB and create if not
    async function checkUserExistenceAndCreate(user) {
        try {
            const findUserInDB = await User.findOne({ id: user.id });
            if (findUserInDB == null) {
                const createNewUser = await User.create(user);
                return createNewUser;
            }
            return findUserInDB;
        } catch (errorMessage) {
            console.error(errorMessage);
            throw errorMessage;
        }
    }

    checkUserExistenceAndCreate(user).then().catch(console.error);
    module.exports = { Calorie, User };

} catch (error) {
    console.log('error message is: ' + error);
    throw (error);
}

