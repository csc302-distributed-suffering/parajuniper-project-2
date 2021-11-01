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
                if (data.total === 0 || !data.entry) {
                    res.status(200).send({});
                    return;
                }

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

/*
* SUMMARIES:
* Allergies
* Conditions
* Procedures
* Family History
* Clinical Impressions
*/
router.get('/patientSummaryInfo', async (req, res) => {
    const pId = req.body.id ?? -1;

    if (pId == -1) {
        console.error('No patient id found for request.');
        res.status(400).send();
        return;
    }
});

/*
* DIAGNOSTIC:
* Observations
* Media
* Diagnostic Reports
* Specimens
* BodyStructure
* Imaging Studies
* Questionnaire Responses
* Molecular Sequencing Info
*/
router.get('/patientDiagnosticInfo', async (req, res) => {
    const pId = req.body.id ?? -1;

    if (pId == -1) {
        console.error('No patient id found for request.');
        res.status(400).send();
        return;
    }
});

/*
* MEDICATIONS:
* Medication Requests
* Administered Medication
* Dispensed Medication
* Medication Statement
* Immunizations
* Immunization Evaluations
* Recommended Immunizations
*/
router.get('/patientMedicationInfo', async (req, res) => {
    const pId = req.body.id ?? -1;

    if (pId == -1) {
        console.error('No patient id found for request.');
        res.status(400).send();
        return;
    }
});

/*
* CARE PROVISION:
* Care Plan
* Care Team
* Care Goals
* Service Request
* Nutrition Order
* Vision Prescription
* Risk Assessments
* Request Groups
*/
router.get('/patientCareInfo', async (req, res) => {
    const pId = req.body.id ?? -1;

    if (pId == -1) {
        console.error('No patient id found for request.');
        res.status(400).send();
        return;
    }
});

/*
* COMMUNICATIONS:
* Communication
* Communication Request
* Device Requests
* Device Use Statement
* Supply Request
* Supply Delivery
*/
router.get('/patientCommunicationsInfo', async (req, res) => {
    const pId = req.body.id ?? -1;

    if (pId == -1) {
        console.error('No patient id found for request.');
        res.status(400).send();
        return;
    }
});

/*
* SUPPORT:
* Coverage
* Coverage Eligibility Requests
* Coverage Eligibility Responses
* Enrollment Requests
* Enrollment Responses
*/
router.get('/patientSupportInfo', async (req, res) => {
    const pId = req.body.id ?? -1;

    if (pId == -1) {
        console.error('No patient id found for request.');
        res.status(400).send();
        return;
    }
});

/*
* BILLING:
* Claims
* Claim Responses
* Invoices
*/
router.get('/patientBilingInfo', async (req, res) => {
    const pId = req.body.id ?? -1;

    if (pId == -1) {
        console.error('No patient id found for request.');
        res.status(400).send();
        return;
    }
});

/*
* PAYMENT:
* Payment Notices
* Payment Reconciliations
*/
router.get('/patientPaymentInfo', async (req, res) => {
    const pId = req.body.id ?? -1;

    if (pId == -1) {
        console.error('No patient id found for request.');
        res.status(400).send();
        return;
    }
});

/*
* GENERAL:
* Account(s)
* Charged Items
* Explanation of Benefits
* Research Subject
*/
router.get('/patientGeneralInfo', async (req, res) => {
    const pId = req.body.id ?? -1;

    if (pId == -1) {
        console.error('No patient id found for request.');
        res.status(400).send();
        return;
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
