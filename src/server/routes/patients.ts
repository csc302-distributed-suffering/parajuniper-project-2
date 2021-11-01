import express = require('express');
import Client from 'fhir-kit-client';
import {BundleLink} from 'fhir/r4';
const router = express.Router();
const config = {baseUrl: 'https://r3.smarthealthit.org/'};
const fhirKitClient = require('fhir-kit-client');
const client: Client = new fhirKitClient(config);


router.get('/patientInfo', (req, res) => {
    const patientName = req.body.name ?? '';
    const count = req.body.count ?? '10'; // TODO: FHIR only supports client-side pagination. So we need to return a link to the next page and the client side needs to make sure it gets loaded. FUN...
    const msg = `An error occurred while fetch result for patient ${patientName}.`;

    try {
        client.search({
            resourceType: 'Patient',
            // TODO: how do we deal with name collisions? maybe add diff search params?
            searchParams: {name: patientName, _count: count, _page: '3'},

        }).then((data) => {
            if (isBundle(data)) {
                const responseData = {
                    nextPageLink: '',
                    totalMatches: 0,
                    returnedMatches: 0,
                    patients: [],
                };
                responseData.totalMatches = data.total;
                responseData.nextPageLink = findNextPageLink(data.link);
                responseData.returnedMatches = responseData.totalMatches > parseInt(count) ?
                    parseInt(count) :
                    responseData.totalMatches;

                for (const entry of data.entry) {
                    if (isPatient(entry.resource)) {
                        responseData.patients.push(entry.resource);
                    }
                }

                res.status(200).send(responseData);
            } else {
                console.warn('Response was not a bundle.');
                res.status(400).send();
            }
        }).catch((e) => {
            console.error(`${msg}.\n`);
            console.error(e);
            res.status(500).send(msg);
        });
    } catch (e) {
        console.error(`${msg}.\n`);
        console.error(e);
        res.status(500).send(msg);
    }
});


// ---------------- Util Methods ----------------
const findNextPageLink = (links: BundleLink[]) => {
    for (const link of links) {
        if (link.relation === 'next') {
            return link.url;
        }
    }

    return '';
};

// ---------------- Type Guards ----------------
const isPatient = (resource: fhir4.Resource): resource is fhir4.Patient => {
    return resource.resourceType === 'Patient';
};

const isBundle = (resource: fhir4.Resource): resource is fhir4.Bundle => {
    return resource.resourceType === 'Bundle';
};

module.exports = router;
