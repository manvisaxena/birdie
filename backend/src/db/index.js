const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    password: 'xnxPp6QfZbCYkY8',
    user: 'test-read',
    database: 'birdietest',
    host: 'birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com',
    port: '3306'
});

let birdiedb = {};

birdiedb.getcarerecipients = () => {
    return new Promise((resolve, reject) => {
        pool.query('select distinct care_recipient_id from events', (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });

    });
}

birdiedb.getdataforcarerecipientid = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`select count(event_type) as event_count, event_type from events where care_recipient_id = ${id} group by event_type`, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });

    });
}

birdiedb.getdataforcarerecipientidandevent = (id, eventType) => {
    return new Promise((resolve, reject) => {
        pool.query(`select payload from events where care_recipient_id = ${id} and event_type=${eventType}`, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });

    });
}




module.exports = birdiedb;