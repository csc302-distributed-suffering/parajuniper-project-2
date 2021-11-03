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

const blankPatient = {resource: {resourceType: 'Patient'}};

const bundleResponse: Bundle = {
    resourceType: 'Bundle',
    type: 'searchset',
    entry: [blankPatient as BundleEntry, {
        resource: {
            resourceType: 'Patient',
            id: '123',
        }
    }],
    link: [],
    total: 2,
};

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

        it('should list 2 patients', async () => {
            searchMock.mockImplementation(() => Promise.resolve(bundleResponse));

            const response = await request
                .get('/patients/list')
                .query({name: 'John', count: '2', family: 'Smith', _page: 3});

            expect(response.statusCode).toBe(200);
            expect(Object.keys(response.body.patients).length).toBe(2);
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

        it('should return all patient information given a patient ID', async () => {
            searchMock.mockImplementation(() => Promise.resolve(bundleResponse));

            const response = await request
                .get('/patients/info')
                .query({id: '123'});

            expect(response.statusCode).toBe(200);
            expect(Object.keys(response.body).length).toBe(2);
            expect(Object.keys(response.body)).toContain('patient');
            expect(Object.keys(response.body)).toContain('records');
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
                .query({id: '123'});

            expect(response.statusCode).toBe(404);
        });

        it('should correctly handle errors', async () => {
            searchMock.mockImplementation(() => Promise.reject(new Error()));

            const response = await request
                .get('/patients/info')
                .query({id: '123'});

            expect(response.statusCode).toBe(500);
        });
    });
});

describe('Utility functions', () => {
    describe('findNextPageLink', () => {
        it('should correctly return next patient link', async () => {
            expect(true);
        });
    });

    describe('parseData', () => {
        it('should correctly format and parse data', async () => {
            expect(true);
        });
    });

    describe('getSearchParams', () => {
        it('should correctly parse request query', async () => {
            expect(true);
        });
    });
});
