const express = require('express')
const router = express.Router()
const config = { baseUrl: 'https://r3.smarthealthit.org/' };
const fhirKitClient = require('fhir-kit-client');
const client = new fhirKitClient(config);


router.get('/demoRoute', (req, res) => {
    try{
        res.status(200).send({text: "Hi! I am the server."});
    } catch(e){
        res.status(500).send({error: e});
    }
})

module.exports = router