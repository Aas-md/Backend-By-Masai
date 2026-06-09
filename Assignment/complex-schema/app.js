let express = require('express');
let app = express();
let mongoose = require('mongoose');
let userRouter = require('./userRouter');
app.use(express.json());

let connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/complex-schema');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

connectToDB();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use("/users", userRouter);

app.use("", (req, res) => {
    res.send("Not Found");
});