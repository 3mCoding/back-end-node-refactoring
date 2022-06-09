const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./User')(sequelize, Sequelize);
db.Solve = require('./Solve')(sequelize, Sequelize);
db.Difficulty = require('./Difficulty')(sequelize, Sequelize);
db.Stage = require('./Stage')(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize
    .authenticate()
    .then(() => {
        console.log('데이터베이스 연결 성공')
    }).catch(err => {
        console.log('데이터베이스 연결 실패 :', err);
    });

module.exports = db;