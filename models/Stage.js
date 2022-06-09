module.exports = (sequelize, DataTypes) => {
    const Stage = sequelize.define("Stage", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: '단계별 문제 고유 ID',
        },
        no: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '단계별 문제 번호',
        },
        type: {
            type: DataTypes.STRING(1),
            allowNull: false,
            comment: '단계별 문제 언어 - 0 : java, 1 : C, 2 : CPP',
        },
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
            comment: '단계별 문제 제목',
        },
        question: {
            type: DataTypes.STRING(200),
            allowNull: false,
            comment: '단계별 문제 내용',
        },
        print: {
            type: DataTypes.STRING(200),
            allowNull: false,
            comment: '단계별 문제 출력문',
        },
        code: {
            type: DataTypes.STRING(500),
            comment: '단계별 문제 코드',
        },
        answer_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '단계별 문제 정답의 개수',
        },
        answers: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '단계별 문제 정답'
        },
        desc_path: {
            type: DataTypes.STRING(10),
            allowNull: false,
            comment: '단계별 문제 설명 경로'
        }
    }, {
        charset: 'utf8',
        collate: "utf8_general_ci",
        tableName: 'Stage'
    });

    return Stage;
};