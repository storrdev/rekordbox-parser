'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('PlaylistTracks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            PlaylistId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'Playlists',
                    },
                    key: 'id',
                },
            },
            TrackID: {
                type: Sequelize.STRING,
                references: {
                    model: {
                        tableName: 'Tracks',
                    },
                    key: 'TrackID',
                },
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
        await queryInterface.dropTable('PlaylistTracks');
    },
};
