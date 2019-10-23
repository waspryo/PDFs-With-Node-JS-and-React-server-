const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');

const pdfTemplate = require('./documents')
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// POST - PDF generation and fetching of the data
app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.data), {}).toFile('result.pdf', (err) => {
        if (err) {
            return Promise.reject();
        }
        return Promise.resolve();
    })
})

// GET - Sned the generated PDF to the client
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`$(__dirname)/result.pdf`)
})

app.listen(port, () => console.log(`Listening on port ${port}`));