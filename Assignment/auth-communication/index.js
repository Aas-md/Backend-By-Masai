let express = require('express')
let app = express()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aasmohd110025@gmail.com',
        pass: 'Aaskhan9557',
    },
});

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Welcome to the API' })
})

app.listen(3000, () => {
    console.log("App is listening on port 3000")
})

app.get('/send-email', async (req, res) => {

    try {
        await transporter.sendMail({
            from: 'Aas Mohammad',
            to: 'aasmohd98972@gmail.com',
            subject: "This is the testing email I am solving Assignments",
            text: "Hello, this is a test email sent from Node.js using Nodemailer. I am solving the assignment related to authentication and communication."

        })
        return res.status(200).json({ message: 'Email sent successfully!' });
    } catch (err) {
        return res.status(404).json({ msg: "Something went wrong " + err })
    }
})