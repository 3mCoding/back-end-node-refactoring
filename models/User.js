const mysql = require('mysql');
const db = require('../config/mysql');
const table = 'user_db';

module.exports = {
    getUser: function() {
        return new Promise ((resolve, reject) => {
            const connection = mysql.createConnection(db);
            connection.query(
                `SELECT email, name, student_number, step FROM ${table}`,
                (error, result, fields) =>{
                    if(error){
                        reject(error);
                    }else{
                        resolve(result);
                    }
                }
            );
            connection.end();
        })
    }
}