let express = require('express');
let app = express();
let mongoose = require('mongoose');
let router = require('./router');
let Enrolment = require('./enrolmentModel');

app.use(express.json());

let connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/er-modeling')
        await Enrolment.syncIndexes();
        console.log('Connected to MongoDB')
    } catch (err) {
        console.log(err);
    }

}


connectToDB()
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    });



app.use('/', router);


