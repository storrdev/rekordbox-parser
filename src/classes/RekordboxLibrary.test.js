const { expect } = require('@jest/globals');

const deleteDb = require('../utils/delete-db');

const RekordboxLibrary = require('./RekordboxLibrary');

describe('RekordboxLibrary class', () => {
    beforeAll(async () => {
        await deleteDb();
    });

    afterAll(async () => {
        // await deleteDb();
    });

    it('.load() loads an xml file successfully', async () => {
        const library = new RekordboxLibrary();
        await library.init();

        const { collection } = await library.load('./rekordbox-collection.xml');

        expect(Array.isArray(collection)).toBe(true);
        expect(collection.length).toBeGreaterThan(0);
    });
});
