const { Sequelize } = require('sequelize');

// Utils
const initDb = require('../utils/init-db');
const parseExport = require('../utils/parse-export');

// Models
const { sequelize, Artist, Genre, Playlist, PlaylistTrack, Track } = require('../models');

class RekordboxLibrary {
    constructor() {
        this.xmlFile = '';
        this.collection = [];
        this.playlists = [];
        this.artists = [];

        this.sequelize = sequelize;
    }

    async init() {
        await initDb(this.sequelize);
    }

    async load(xmlFile) {
        this.xmlFile = xmlFile;

        const { DJ_PLAYLISTS } = await parseExport(this.xmlFile);
        const collection = DJ_PLAYLISTS[0].COLLECTION[0].TRACK.map((track) => track);

        // Artists & Genres
        const artists = [];
        const genres = [];

        collection.forEach(({ Artist, Genre }) => {
            if (!artists.includes(Artist)) {
                artists.push(Artist);
            }
            if (!genres.includes(Genre)) {
                genres.push(Genre);
            }
        });

        // Artists
        this.artists = (await Artist.bulkCreate(artists.map((Name) => ({ Name })))).map((a) => a.toJSON());
        const artistKeys = {};
        this.artists.forEach((artist) => {
            artistKeys[artist.Name] = artist.id;
        });

        // Genres
        this.genres = (await Genre.bulkCreate(genres.map((Name) => ({ Name })))).map((a) => a.toJSON());
        const genreKeys = {};
        this.genres.forEach((genre) => {
            genreKeys[genre.Name] = genre.id;
        });

        // Tracks
        collection.forEach((track) => {
            // Switch artist name string for related artist id
            track.ArtistId = artistKeys[track.Artist];
            delete track.Artist;

            // Switch genre name string for related artist id
            track.GenreId = genreKeys[track.Genre];
            delete track.Genre;
        });

        this.collection = await Track.bulkCreate(collection);

        // Playlists
        const playlists = DJ_PLAYLISTS[0].PLAYLISTS[0].NODE[0].NODE.map((playlist) => playlist);

        this.playlists = await Playlist.bulkCreate(
            playlists.map(({ Name, Type, KeyType, Entries }) => ({ Name, Type, KeyType, Entries }))
        );
        const playlistKeys = {};
        this.playlists.forEach((playlist) => {
            playlistKeys[playlist.Name] = playlist.id;
        });

        const playlistTracks = [];

        playlists.forEach((playlist) => {
            const PlaylistId = playlistKeys[playlist.Name];

            if (typeof playlist.TRACK !== 'undefined') {
                playlist.TRACK.forEach(({ Key }) => {
                    playlistTracks.push({ PlaylistId, TrackID: Key });
                });
            }
        });

        await PlaylistTrack.bulkCreate(playlistTracks);

        return { collection: this.collection, playlists: this.playlists };
    }
}

module.exports = RekordboxLibrary;
