'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Tracks', {
            TrackID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            ArtistId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'Artists',
                    },
                    key: 'id',
                },
            },
            Name: {
                type: Sequelize.STRING,
            },
            Album: {
                type: Sequelize.STRING,
            },
            Composer: {
                type: Sequelize.STRING,
            },
            Grouping: {
                type: Sequelize.STRING,
            },
            GenreId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'Genres',
                    },
                    key: 'id',
                },
            },
            Kind: {
                type: Sequelize.STRING,
            },
            Size: {
                type: Sequelize.STRING,
            },
            Grouping: {
                type: Sequelize.STRING,
            },
            TotalTime: {
                type: Sequelize.STRING,
            },
            DiscNumber: {
                type: Sequelize.STRING,
            },
            TrackNumber: {
                type: Sequelize.STRING,
            },
            Year: {
                type: Sequelize.STRING,
            },
            AverageBpm: {
                type: Sequelize.STRING,
            },
            DateAdded: {
                type: Sequelize.STRING,
            },
            BitRate: {
                type: Sequelize.STRING,
            },
            SampleRate: {
                type: Sequelize.STRING,
            },
            Comments: {
                type: Sequelize.STRING,
            },
            PlayCount: {
                type: Sequelize.STRING,
            },
            Rating: {
                type: Sequelize.STRING,
            },
            Location: {
                type: Sequelize.STRING,
            },
            Remixer: {
                type: Sequelize.STRING,
            },
            Tonality: {
                type: Sequelize.STRING,
            },
            Label: {
                type: Sequelize.STRING,
            },
            Mix: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Tracks');
    },
};
