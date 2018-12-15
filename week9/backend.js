const ENV = 'DEV';
let cfg;
if(ENV == 'DEV')
  cfg = require('./sec_env.js').dev;
else
  cfg = require('./sec_env.js').prod;

let mysql = require('mysql');

const TABLE_NAME = 'workouts';
const Q_INIT = `SELECT * FROM ${TABLE_NAME}`;
const S_DELETE_ROW = `DELETE FROM ${TABLE_NAME} WHERE id = ?`;
const S_INSERT = `INSERT INTO ${TABLE_NAME} (id, name, reps, weight, date, lbs) VALUES (0, ?, ?, ?, ?, ?)`;
const S_UPDATE = `UPDATE ${TABLE_NAME} SET name=?, reps=?, weight=?, date=? where id=?`;
const S_TRUNCATE = `TRUNCATE ${TABLE_NAME}`;

let pool = mysql.createPool({
    connectionLimit : 10,
    host            : `${cfg.dbHost}`,
    user            : `${cfg.dbUser}`,
    password        : `${cfg.dbPass}`,
    database        : 'cs290_boettchc'
  });
  

function getConnection()
{
   return mysql.createConnection( { 
    connectionLimit : 10,
    host            : `${cfg.dbHost}`,
    user            : `${cfg.dbUser}`,
    password        : `${cfg.dbPass}`,
    database        : 'cs290_boettchc',
    timezone        : 'PDT'
  });
}

function truncateTable() {
    return new Promise( function(resolve, reject) {
        pool.query(S_TRUNCATE, function(err, result, fields){
            if(err)
                return reject(err);
            else
                resolve(result);
        });
    });
}

function deleteRow(rowId) {
    return new Promise( function(resolve, reject) {
        pool.query(S_DELETE_ROW, [rowId], function(err, result, fields){
            if(err)
                return reject(err);
            else
                resolve(result);
        });
    });
}


function initialQuery(context) {
    return new Promise( function(resolve, reject) {
        pool.query(Q_INIT, function(err, result, fields){
            if(err)
                return reject(err);
            else
                resolve(result);
        });
    });
}

function insertRow(context) {
    return new Promise( function(resolve, reject) {
        pool.query(S_INSERT, context, function(err, result, fields){
            if(err)
                return reject(err);
            else
                resolve(result);
        });
    });
}

function updateRow(context) {
    return new Promise( function(resolve, reject) {
        pool.query(S_UPDATE, context, function(err, result, fields){
            if(err)
                return reject(err);
            else
                resolve(result);
        });
    });
}

module.exports = {
    updateRow: updateRow,
    insertRow: insertRow,
    initialQuery: initialQuery,
    deleteRow: deleteRow,
    truncateTable: truncateTable,
    pool: pool,
    getConnection: getConnection,
};  