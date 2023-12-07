"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = exports.pool = void 0;
var pg_1 = require("pg");
var dotenv_1 = require("dotenv");
var Pool = pg_1.default.Pool;
var process_1 = require("process");
dotenv_1.default.config();
var PG_URI = process_1.default.env.DATABASE_URI;
exports.pool = new Pool({
    connectionString: PG_URI,
});
var query = function (text, params, callback) {
    console.log('executed query', text);
    return exports.pool.query(text, params, callback);
};
exports.query = query;
