const fictionSchema = require('../schemas/fiction_schema');
const db = require('../util/db');

let fictionModel = db.model('fiction',fictionSchema);

module.exports = fictionModel;