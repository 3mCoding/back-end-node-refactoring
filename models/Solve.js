module.exports = (sequelize, DataTypes) => {
    const Solve = sequelize.define("Solve", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: '해결한 난이도 문제의 Log 고유 ID',
        }
    }, {
        charset: 'utf8',
        collate: "utf8_general_ci",
        tableName: 'Solve'
    });

    Solve.associate = models => {
        models.Solve.belongsTo(models.User, {
            foreignKey: 'user_email',
            sourceKey: 'email'
        });

        models.Solve.belongsTo(models.Level, {
            foreignKey: 'level_id',
            sourceKey: 'id'
        });
    };

    return Solve;
};