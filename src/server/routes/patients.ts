const express = require('express');
import {Request, Response} from 'express';
import Client, {SearchParams} from 'fhir-kit-client';
import {BundleLink, Resource, Patient, Bundle} from 'fhir/r4';
const router = express.Router();
const config = {baseUrl: 'https://r4.smarthealthit.org/'};
const fhirKitClient = require('fhir-kit-client');
const client: Client = new fhirKitClient(config);

const patientResourceCategories = [
    'Annotation', 'Signature', 'Account', 'AdverseEvent', 'AllergyIntolerance', 'Appointment',
    'AppointmentResponse', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BodyStructure',
    'CarePlan', 'CareTeam', 'ChargeItem', 'Claim', 'ClaimResponse', 'ClinicalImpression',
    'Communication', 'CommunicationRequest', 'Composition', 'Condition', 'Consent', 'Contract',
    'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue',
    'Device', 'DeviceRequest', 'DeviceUseStatement', 'DiagnosticReport', 'DocumentManifest',
    'DocumentReference', 'Encounter', 'EnrollmentRequest', 'EpisodeOfCare', 'ExplanationOfBenefit',
    'FamilyMemberHistory', 'Flag', 'Goal', 'Group', 'GuidanceResponse', 'ImagingStudy',
    'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'Invoice', 'List',
    'MeasureReport', 'Media', 'MedicationAdministration', 'MedicationDispense', 'MedicationRequest',
    'MedicationStatement', 'MolecularSequence', 'NutritionOrder', 'Observation', 'Person',
    'Procedure', 'Provenance', 'QuestionnaireResponse', 'RelatedPerson', 'RequestGroup',
    'ResearchSubject', 'RiskAssessment', 'Schedule', 'ServiceRequest', 'Specimen', 'SupplyDelivery',
    'SupplyRequest', 'Task', 'VisionPrescription', 'Practitioner', 'Organization', 'Patient',
];

// TODO: add more queries for listing patients?
router.get('/list', async (req: Request, res: Response) => {
    // const patientName = req.body.name ?? '';
    // const count = req.body.count ?? '10'; // TODO: FHIR only supports client-side pagination. So we need to return a link to the next page and the client side needs to make sure it gets loaded. FUN...
    const msg = `An error occurred while listing patients.`; // TODO should probably make this more descriptive
    const sParams: SParams = getSearchParams(req);

    try {
        const data = await client.search(sParams);
        if (isBundle(data)) {
            if (data.total === 0 || !data.entry) {
                res.status(200).send({});
                return;
            }

            const count = sParams.searchParams.count as string;
            const responseData = {
                nextPageLink: '',
                prevPageLink: '',
                totalMatches: 0,
                returnedMatches: 0,
                patients: [],
            };
            responseData.totalMatches = data.total;
            const links = findLinks(data.link);
            responseData.nextPageLink = links.next;
            responseData.prevPageLink = links.prev;
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
    } catch (e) {
        console.error(`${msg}\n${e}`);
        res.status(500).send('test');
    }
});

router.get('/info', async (req, res) => {
    console.log(req.query);
    const pId: string = req.query.id as string ?? '';

    if (pId == '') {
        console.error('No id provided.');
        res.status(400).send();
        return;
    }

    try {
        const pInfo : [Resource] = [] as unknown as [Resource];

        let response = await client.search({
            resourceType: '$everything',
            compartment: {resourceType: 'Patient', id: pId},
        });

        console.log('RESPONSE: received');

        if (response.total === 0 || !response.entry) {
            console.error(`Could not find patient with ID ${pId}`);
            res.status(404).send();
            return;
        }


        let result = [];
        while (response && response.entry && response.entry.length > 0) {
            result = result.concat(response.entry);
            response = await client.nextPage({bundle: response as Bundle});
            console.log('========================\nresponse page:', response);
        }

        console.log('Parsed pages');

        let patient : fhir4.Patient = {} as Patient;
        for (const entry of result) {
            if (entry.resource.id === pId) {
                patient = entry.resource;
            } else {
                pInfo.push(entry.resource);
            }
        }

        const parsedData = parseData(patient, pInfo);
        res.status(200).send(parsedData);
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

// ---------------- Util Methods ----------------
const findLinks = (links: BundleLink[]) => {
    console.log(links);
    const parsedLinks = {next: '', prev: ''};
    for (const link of links) {
        if (link.relation === 'next') {
            parsedLinks.next = link.url;
        } else if (link.relation === 'previous') {
            parsedLinks.prev = link.url;
        }
    }

    return parsedLinks;
};

const parseData = (patient: Patient, pInfo: [Resource]) => {
    const data = {};
    for (const res of patientResourceCategories) {
        data[res] = [];
    }

    for (const res of pInfo) {
        console.log('====================\nTYPE', res.resourceType);
        console.log('RES', res);
        console.log('====================');
        data[res.resourceType].push(res);
    }

    return {
        patient: patient,
        records: data,
    };
};

// TODO: Add more params/restructure this?
const getSearchParams = (req: Request): SParams => {
    const params : SParams = {
        resourceType: 'Patient',
        searchParams: {
            _count: '0',
        },
    };

    if (!req.query) {
        return params;
    }

    for (const key in req.query) {
        if (key === 'given' && req.query[key] !== '') {
            const given: string = req.query.given as string;
            params.searchParams.given = given.replace(/[&\/\\#,+()$~%.":*?<>{}]/g, '');
        } else if (key === '_count' && req.query[key] !== '') {
            const count: string = req.query._count as string;
            params.searchParams._count = count.replace(/[&\/\\#,+()$~%.":*?<>{}]/g, '');
        } else if (key === 'family' && req.query[key] !== '') {
            const family: string = req.query.family as string;
            params.searchParams.family = family.replace(/[&\/\\#,+()$~%.":*?<>{}]/g, '');
        } else if (key === '_getpages' && req.query[key] !== '') {
            const getPages: string = req.query._getpages as string;
            params.searchParams._getpages = getPages.replace(/[&\/\\#,+()$~%.":*?<>{}]/g, '');
        } else if (key === '_getpagesoffset' && req.query[key] !== '') {
            const getPagesOffset: string = req.query._getpagesoffset as string;
            params.searchParams._getpagesoffset = getPagesOffset.replace(
                /[&\/\\#,+()$~%.":*?<>{}]/g, '',
            );
        } else if (key === '_bundletype' && req.query[key] !== '') {
            const bundleType: string = req.query._bundletype as string;
            params.searchParams._bundletype = bundleType.replace(/[&\/\\#,+()$~%.":*?<>{}]/g, '');
        } else if (key === '_pretty' && req.query[key] !== '') {
            const pretty: string = req.query._pretty as string;
            params.searchParams._pretty = pretty.replace(/[&\/\\#,+()$~%.":*?<>{}]/g, '');
        } else if (key === 'id' && req.query[key] !== '') {
            const id: string = req.query.id as string;
            params.searchParams.id = id.replace(/[&\/\\#,+()$~%.":*?<>{}]/g, '');
        }
    }

    return params;
};

// ---------------- Type Guards ----------------
const isPatient = (resource: fhir4.Resource): resource is fhir4.Patient => {
    return resource.resourceType === 'Patient';
};

const isBundle = (resource: fhir4.Resource): resource is fhir4.Bundle => {
    return resource.resourceType === 'Bundle';
};

interface SParams {
    resourceType: string,
    searchParams?: SearchParams,
}

module.exports = router;

