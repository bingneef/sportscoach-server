import fs from 'fs';
import mongoose from 'app/services/database/mongodb'
  
let models = {};
const files = fs.readdirSync('app/db-schemas');
for (let file of files) {
  if (file == 'index.js' || file[0] == '.') {
    continue;
  }

  try {
    const modelName = file.substring(0, file.length - 3);
    const modelSchema = require(`app/db-schemas/${modelName}`).default;
    const modelObject = require(`app/models/${modelName}`);
    const { pre = [], post = [], default:modelClass } = modelObject;
    
    for (let hook of pre) {
      modelSchema.pre(hook[0], hook[1]);
    }
    
    for (let hook of post) {
      modelSchema.post(hook[0], hook[1]);
    }
      
    modelSchema.loadClass(modelClass)
    const model = mongoose.model(modelName, modelSchema)
    models[modelName] = model;
  } catch (_) { /* not a model */ }
};

module.exports = models;