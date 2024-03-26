const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
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

// app.get('/contacts', (req, res) => {
//     try {
//         console.log('Getting contact details...');
//         const response = axios.get(`https://api.hubapi.com/crm/v3/objects/contacts`, {
//             headers: {
//                 Authorization: `Bearer pat-eu1-8f65c118-1e0e-4abb-9f86-f43bf3d05e2c`,
//                 'Content-Type': 'application/json'
//             },
//             params: {
//                 properties: ['firstname', 'lastname', 'email'] // Specify the properties you want to retrieve
//             }
//         });
//
//         console.log('Contact details:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error getting contact:', error.response ? error.response.data : error.message);
//     }
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
