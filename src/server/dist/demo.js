var express = require('express');
var router = express.Router();
var config = { baseUrl: 'https://r3.smarthealthit.org/' };
var fhirKitClient = require('fhir-kit-client');
var client = new fhirKitClient(config);
router.get('/demoRoute', function (req, res) {
    try {
        res.status(200).send({ text: "Hi! I am the server." });
    }
    catch (e) {
        res.status(500).send({ error: e });
    }
});
module.exports = router;
//# sourceMappingURL=demo.js.map