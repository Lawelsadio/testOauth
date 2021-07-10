
const db = {};
db.user = require("./user.model");
db.role = require("./role.model");
db.ROLES = ["user", "admin", "assistant"];

module.exports = db;