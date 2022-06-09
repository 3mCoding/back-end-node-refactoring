module.exports = (sequelize, DataTypes) => {
    const Level = sequelize.define("Level", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: '난이도 문제 고유 ID',
        },
        level: {
            type: DataTypes.STRING(1),
            allowNull: false,
            comment: '난이도 문제 수준 - 0: 순한맛, 1: 약간매운맛, 2:매운맛'
        },
        time: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '난이도 문제 소요 시간'
        },
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
            comment: '난이도 문제 제목',
        },
        question: {
            type: DataTypes.STRING(200),
            allowNull: false,
            comment: '난이도 문제 내용',
        },
        print: {
            type: DataTypes.STRING(200),
            allowNull: false,
            comment: '난이도 문제 출력문',
        },
        code: {
            type: DataTypes.STRING(500),
            comment: '난이도 문제 코드',
        },
        answer_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '난이도 문제 정답의 개수',
        },
        answers: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '난이도 문제 정답'
        },
        desc_path: {
            type: DataTypes.STRING(10),
            allowNull: false,
            comment: '난이도 문제 설명 경로'
        }
    }, {
        charset: 'utf8',
        collate: "utf8_general_ci",
        tableName: 'Level'
    });

    return Level;
};