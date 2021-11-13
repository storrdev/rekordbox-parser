const fs = require('fs/promises');
const path = require('path');
const config = require(path.join(__dirname, '../../config/config.json'));

async function deleteDb() {
    const file = config[process.env.NODE_ENV].storage;
    try {
        await fs.readFile(file);

        // If there is no file the promise above will reject and skip straight to the catch
        return fs.rm(config[process.env.NODE_ENV].storage);
    } catch (error) {
        console.log(`${process.env.NODE_ENV} database does not exist, so no need to delete it`);
        return null;
    }
}

module.exports = deleteDb;
