const express = require('express');
import {Request, Response} from 'express';
import Client, {SearchParams} from 'fhir-kit-client';
import {BundleLink, Resource, Patient} from 'fhir/r4';
const router = express.Router();
const config = {baseUrl: 'https://r4.smarthealthit.org/'};
const fhirKitClient = require('fhir-kit-client');
const client: Client = new fhirKitClient(config);

// TODO: add more queries for listing patients?
router.get('/list', (req: Request, res: Response) => {
    // const patientName = req.body.name ?? '';
    // const count = req.body.count ?? '10'; // TODO: FHIR only supports client-side pagination. So we need to return a link to the next page and the client side needs to make sure it gets loaded. FUN...
    const msg = `An error occurred while listing patients.`; // TODO should probably make this more descriptive
    const sParams: SParams = getSearchParams(req);

    try {
        client.search(sParams).then((data) => {
            if (isBundle(data)) {
                if (data.total === 0 || !data.entry) {
                    res.status(200).send({});
                    return;
                }

                const count = sParams.searchParams.count as string;
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
            console.error(`${msg}\n`);
            console.error(e);
            res.status(500).send(msg);
        });
    } catch (e) {
        console.error(`${msg}\n`);
        console.error(e);
        res.status(500).send(msg);
    }
});

router.get('/info', async (req, res) => {
    const pId: string = req.query.id as string ?? '';

    if (pId == '') {
        console.error('No id provided.');
        res.status(400).send();
        return;
    }

    try {
        const response = await client.search({
            resourceType: '$everything',
            compartment: {resourceType: 'Patient', id: pId},
        });

        if (response.total === 0 || !response.entry) {
            console.error(`Could not find patient with ID ${pId}`);
            res.status(404).send();
            return;
        }

        let patient : fhir4.Patient = {} as Patient;
        const pInfo : [Resource] = [] as unknown as [Resource];
        for (const entry of response.entry) {
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
const findNextPageLink = (links: BundleLink[]) => {
    for (const link of links) {
        if (link.relation === 'next') {
            return link.url;
        }
    }

    return '';
};

const parseData = (patient: Patient, pInfo: [Resource]) => {
    return {
        patient: patient,
        records: [...pInfo],
    };
};

// TODO: Add more params/restructure this?
const getSearchParams = (req: Request): SParams => {
    const params : SParams = {
        resourceType: 'Patient',
        searchParams: {
            _count: '0',
            name: "",
            family: ""
        },
    };

    if (!req.query) {
        return params;
    }

    for (const key in req.query) {
        if (key === 'name') {
            const name: string = req.query.name as string;
            params.searchParams.name = name.replace(/[&\/\\#,+()$~%.":*?<>{}]/g, '');
        } else if (key === 'count') {
            const count: string = req.query.count as string;
            params.searchParams._count = count.replace(/[&\/\\#,+()$~%.":*?<>{}]/g, '');
        } else if (key === 'family') {
            const name: string = req.query.name as string;
            params.searchParams.name = name.replace(/[&\/\\#,+()$~%.":*?<>{}]/g, '');
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
