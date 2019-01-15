import fs from 'fs';
import mongoose from 'app/services/database/mongodb'

const modelNames = [
  'Competition',
  'CompetitionTeam',
  'Event',
  'Match',
  'MatchTeam',
  'Player',
  'PlayerTeam',
  'PlayerUser',
  'Season',
  'Stat',
  'Team',
  'TeamUser',
  'Token',
  'User',
];

let models = {};
for (let modelName of modelNames) {
  const modelClass = require(`app/models/${modelName}`).default;
  const modelSchema = require(`app/db-schemas/${modelName}`).default;

  modelSchema.loadClass(modelClass)
  const model = mongoose.model(modelName, modelSchema)

  models[modelName] = model;
}

module.exports = models;

// fs.readdir('app/db-schemas', (_, files) => {
//   for (let file of files) {
//     if (file == 'index.js') {
//       continue;
//     }

//     const modelName = file.substring(0, file.length - 3);
//     const modelClass = require(`app/models/${modelName}`).default;
//     const modelSchema = require(`app/db-schemas/${modelName}`).default;

//     modelSchema.loadClass(modelClass)
//     const model = mongoose.model(modelName, modelSchema)
    
//     models[modelName] = model;
//   }
// })