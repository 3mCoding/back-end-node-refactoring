const mysql = require('mysql');

const mysqlConnection = {
    init: function(){
        return mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: '0620',
            database: 'tmc_db'
        });
    },
    open: function(connection){
        connection.connect(function(err){
            if(err){
                console.error("MySQL 연결 실패");
                console.error('Error Code : ' + err.code);
                console.error('Error Message : ' + err.message);
            }else{
                console.log('MySQL 연결 성공');
            }
        });
    },
    close: function(connection){
        connection.end(function(err){
            if(err){
                console.error("MySQL Terminate 실패");
                console.error('Error Code : ' + err.code);
                console.error('Error Message : ' + err.mesage);
            }else{
                console.log('MySQL Terminate connection');
            }
        })
    }
}
module.exports = mysqlConnection;