const deleteDb = require('./delete-db');

describe('deleteDb function', () => {
    it('should not find a deleteable db', async () => {
        await deleteDb();
    });
});
