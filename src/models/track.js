'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Track extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // this.belongsTo(models.Artist);
        }
    }
    Track.init(
        {
            TrackID: DataTypes.INTEGER,
            ArtistID: DataTypes.INTEGER,
            Name: DataTypes.STRING,
            Album: DataTypes.STRING,
            Composer: DataTypes.STRING,
            Grouping: DataTypes.STRING,
            GenreId: DataTypes.INTEGER,
            Kind: DataTypes.STRING,
            Size: DataTypes.STRING,
            Grouping: DataTypes.STRING,
            TotalTime: DataTypes.STRING,
            DiscNumber: DataTypes.STRING,
            TrackNumber: DataTypes.STRING,
            Year: DataTypes.STRING,
            AverageBpm: DataTypes.STRING,
            DateAdded: DataTypes.STRING,
            BitRate: DataTypes.STRING,
            SampleRate: DataTypes.STRING,
            Comments: DataTypes.STRING,
            PlayCount: DataTypes.STRING,
            Location: DataTypes.STRING,
            Remixer: DataTypes.STRING,
            Tonality: DataTypes.STRING,
            Label: DataTypes.STRING,
            Mix: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Track',
        }
    );
    Track.removeAttribute('id');
    return Track;
};
