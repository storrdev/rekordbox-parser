// index.js
const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');

async function initDb(sequelize) {
    const umzug = new Umzug({
        migrations: {
            glob: 'migrations/*.js',
            resolve: ({ name, path, context }) => {
                const migration = require(path);
                return {
                    // adjust the parameters Umzug will
                    // pass to migration methods when called
                    name,
                    up: async () => migration.up(context, Sequelize),
                    // down: async () => migration.down(context, Sequelize),
                };
            },
        },
        context: sequelize.getQueryInterface(),
        storage: new SequelizeStorage({ sequelize }),
        logging: false,
    });

    await sequelize.authenticate();
    return umzug.up();
}

module.exports = initDb;
