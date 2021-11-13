const fs = require('fs/promises');
const parser = require('fast-xml-parser');

async function parseExport(xmlFilePath) {
    const xml = await fs.readFile(xmlFilePath, { encoding: 'utf8' });

    return parser.parse(xml, {
        attributeNamePrefix: '',
        ignoreAttributes: false,
        arrayMode: true,
    });
}

module.exports = parseExport;
