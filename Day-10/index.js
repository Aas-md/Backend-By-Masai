let express = require('express');
let app = express();
require('dotenv').config();
let conncetToDB = require('./mognoConfig');
const userRouter = require('./userRoutes');
const todoRouter = require('./todoRoutes');

conncetToDB();

app.use(express.json());
app.use('/users', userRouter)
app.use('/todos', todoRouter)


app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' })
})

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
})