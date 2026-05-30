let express = require('express');
let app = express();
let mongoose = require('mongoose');
let taskRouter = require('./taskRouter');


app.use(express.json());

async function connectToDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/mongo-node-1');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
connectToDB();

app.use('/tasks', taskRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use((req, res) => {
    res.send('Path not found Please check the URL! or the method you are using!');
});