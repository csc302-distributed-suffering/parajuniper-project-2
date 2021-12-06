import {Bundle, BundleEntry} from 'fhir/r4';
import supertest from 'supertest';
import fhirKitClient from 'fhir-kit-client';
const express = require('express');
const patientRoutes = require('../patients');

// Set up mocked express server
const app = express();
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/patients', patientRoutes);
const request = supertest(app);

const searchMock = jest.fn();
fhirKitClient.prototype.search = searchMock;

// jest.mock('fhir-kit-client', () => {
//     const mfhirKitClient = {search: jest.fn()};
//     return function(cfg) {
//         return mfhirKitClient;
//     };
// });

const blankPatient = {resource: {resourceType: 'Patient', id: '0'}};

const bundleResponse: Bundle = {
    resourceType: 'Bundle',
    type: 'searchset',
    entry: [blankPatient as BundleEntry, {
        resource: {
            resourceType: 'Patient',
            id: '123',
            name: [
                {
                    given: [
                        'John',
                    ],
                    family: 'Smith',
                },
            ],
        },
    }, {
        resource: {
            resourceType: 'Patient',
            id: '124',
            name: [
                {
                    given: [
                        "John"
                    ],
                    family: "Smith"
                }
            ]
        },
    }],
    link: [],
    total: 3,
};

const bundleResponseIdTest: Bundle = {
    resourceType: 'Bundle',
    type: 'searchset',
    entry: [{
        resource: {
            resourceType: 'Patient',
            id: '124',
            name: [
                {
                    given: [
                        "John"
                    ],
                    family: "Smith"
                }
            ]
        },
    }],
    link: [],
    total: 1,
}

const emptyBundleResponse: Bundle = {
    resourceType: 'Bundle',
    type: 'searchset',
    link: [],
};


describe('Patient Endpoints', () => {
    describe('/list', () => {
        beforeEach(() => {
            searchMock.mockReset();
        });

        it('should list duplicate patients', async () => {
            searchMock.mockImplementation(() => Promise.resolve(bundleResponse));

            const response = await request
                .get('/patients/list')
                .query({name: 'John', count: '2', family: 'Smith', _page: 3});

            expect(response.statusCode).toBe(200);
            expect(Object.keys(response.body.patients).length).toBe(2);
        });

        it('should list single patients', async () => {
            searchMock.mockImplementation(() => Promise.resolve(bundleResponseIdTest));

            const response = await request
                .get('/patients/list')
                .query({name: 'John', count: '1', family: 'Smith', _page: 1});

            expect(response.statusCode).toBe(200);
            expect(Object.keys(response.body.patients).length).toBe(1);
        });

        it('should correctly handle empty bundle response', async () => {
            searchMock.mockImplementation(() => Promise.resolve(emptyBundleResponse));

            const response = await request
                .get('/patients/list')
                .query({name: 'John', count: '2'});

            expect(response.statusCode).toBe(200);
        });

        it('should return code 400 when not provided a bundle response', async () => {
            searchMock.mockImplementation(() => Promise.resolve({}));

            const response = await request
                .get('/patients/list')
                .query({name: 'John', count: '2'})
                .expect(400);

            expect(response.statusCode).toBe(400);
        });

        it('should return code 500 on failed search', async () => {
            searchMock.mockImplementation(() => Promise.reject(new Error('')));

            const response = await request
                .get('/patients/list')
                .query({name: 'John', count: '2'});

            expect(response.statusCode).toBe(500);
        });
    });

    describe('/info', () => {
        beforeEach(() => {
            searchMock.mockReset();
        });

        it('should return patient information given a patient ID', async () => {
            searchMock.mockImplementation(() => Promise.resolve(bundleResponseIdTest));

            const response = await request
                .get('/patients/info')
                .query({_id: '124'});

            expect(response.statusCode).toBe(200);
            expect(Object.keys(response.body).length).toBe(5);
            expect(Object.keys(response.body)).toContain('entry');
            expect(Object.keys(response.body.entry[0])).toContain('resource')
            expect(Object.keys(response.body.entry[0].resource)).toContain('id')
            expect(response.body.entry[0].resource.id).toBe("124")
        });

        it('should return 400 when not provided a patient ID', async () => {
            const response = await request
                .get('/patients/info')
                .query({});

            expect(response.statusCode).toBe(400);
        });

        it('should return 404 when receiving empty response', async () => {
            searchMock.mockImplementation(() => Promise.resolve(emptyBundleResponse));

            const response = await request
                .get('/patients/info')
                .query({_id: '123'});

            expect(response.statusCode).toBe(404);
        });

        it('should correctly handle errors', async () => {
            searchMock.mockImplementation(() => Promise.reject(new Error()));

            const response = await request
                .get('/patients/info')
                .query({_id: '123'});

            expect(response.statusCode).toBe(500);
        });
    });
});

describe('Utility functions', () => {
    describe('getSearchParams', () => {
        it('should correctly parse request query', () => {
            expect(true)
        });
    });
});
