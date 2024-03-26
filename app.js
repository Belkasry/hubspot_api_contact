const express = require('express');
const axios = require('axios');
var cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())
//allow all requests from all domains & subdomains
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

require('dotenv').config()
const hubspot = require('@hubspot/api-client')
const hubspotClient = new hubspot.Client({accessToken: process.env.HUBSPOT_API_KEY});
const router = express.Router();

app.get('/', async (req, res) => {
    res.send('Hello World!');
});
app.post('/contacts', async (req, res) => {
    try {
        console.log('Creating contact...');
        const contact = {
            properties: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone
            }
        };
        const createContactResponse = await hubspotClient.crm.contacts.basicApi.create(contact)
        res.json(createContactResponse.body);

    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
