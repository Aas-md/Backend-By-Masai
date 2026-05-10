let express = require('express');
let app = express();
let mongoose = require('mongoose');
let router = require('./router');

app.use(express.json());

let connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/er-modeling')

    } catch (err) {
        console.log(err);
    }

}
connectToDB();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use('/', router);


