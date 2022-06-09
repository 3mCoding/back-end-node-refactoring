module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING(30),
            primaryKey: true,
            validate: {
                isEmail: true,
            },
            comment: '학교 이메일',
        },
        student_num: {
            type: DataTypes.STRING(4),
            comment: '학번',
        },
        name: {
            type: DataTypes.STRING(10),
            allowNull: false,
            comment: '이름',
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false,
            comment: '학생 비밀번호',
        },
        stage: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '문제 단계',
        },
        solve_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '문제 푼 개수'
        }
    }, {
        charset: 'utf8',
        collate: "utf8_general_ci",
        tableName: 'User'
    });

    return User;
}