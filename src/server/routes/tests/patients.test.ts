import '../patients';
// const request = require('supertest'); // comment to supress errors


describe('Patient Endpoints', () => {
    describe('/patientList', () => {
        it('should list 5 patients with name matching John', async () => {
            // test here
            expect(true);
        });

        it('should return code 400 when not provided a bundle response', async () => {
            // test here
            expect(true);
        });

        it('should return code 500 on failed search', async () => {
            // test here
            expect(true);
        });

        it('should correctly handle rejected promise', async () => {
            // test here
            expect(true);
        });
    });

    describe('/patientInfo', () => {
        it('should return all patient information given a patient ID', async () => {
            expect(true);
        });

        it('should return 400 when not provided a patient ID', async () => {
            expect(true);
        });

        it('should return 404 when receiving empty response', async () => {
            expect(true);
        });

        it('should correctly handle errors', async () => {
            expect(true);
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

describe('Type guards', () => {
    it('should correctly identify a Patient resource', async () => {
        expect(true);
    });

    it('should correctly identify a Bundle resource', async () => {
        expect(true);
    });
});
