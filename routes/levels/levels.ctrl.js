const models = require('../../models');
const {
    Op
} = require('sequelize');
const {
    sequelize
} = require('../../models');

exports.getQuest = async (req, res) => {
    const query = req.query;

    if (query.id === undefined) {
        return res.status(400).json({
            message: '난이도 문제 조회 형식이 유효하지 않습니다.'
        });
    }

    await models.Level.findOne({
            where: {
                id: query.id
            }
        })
        .then(data => {
            if (data) {
                return res.status(200).json({
                    data
                });
            } else {
                return res.status(404).json({
                    message: '문제를 찾을 수 없습니다.'
                });
            }
        });
};

exports.getQuests = async (req, res) => {
    const email = req.params.email;
    await sequelize.query(`select l.id, l.title, l.level, l.time, IFNULL((select true from Solve s where l.id = s.level_id and s.user_email = '${email}'), false) as 'solved' from Level l order by l.level`)
        .then(Questions => {
            const data = Questions[0];
            return res.status(200).json({
                data
            });
        })
        .catch(e => {
            console.log(e);
            return res.status(500).json({
                message: '서버 오류'
            });
        });
};

exports.solveQuestion = async (req, res) => {
    const body = req.body;
    models.User.findOne({
            attributes: [
                'solve_count'
            ],
            where: {
                email: body.email,
            }
        })
        .then(async (user) => {
            models.User.update({
                solve_count: user.solve_count + 1
            }, {
                where: {
                    email: body.email
                }
            })
            models.User.getUser(body.email)
                .then((data) => {
                    console.log(data.email);
                    models.Solve.create({
                        user_email: data.email,
                        level_id: body.id
                    });
                    return res.status(200).json({
                        solve_count : data.solve_count
                    });
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({
                        message: '서버 오류'
                    });
                });
        });
};

exports.suggestQuestion = async (req, res) => {
    const query = req.query;

    if (query.time === undefined || query.level === undefined) {
        return res.status(400).json({
            message: '문제 추천 API의 형식이 유효하지 않습니다.'
        });
    }

    const time_a = (Number)(query.time) - 10;
    const time_b = (Number)(query.time) + 10;
    await models.Level.findAll({
            where: {
                level: query.level,
                time: {
                    [Op.between]: [time_a, time_b],
                }
            }
        })
        .then(async (questions) => {
            if (questions.length > 0) {
                const rand_id = Math.floor(Math.random() * questions.length) + 1;
                await models.Level.findOne({
                        where: {
                            id: rand_id
                        }
                    })
                    .then(async (data) => {
                        return res.status(200).json({
                            data
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(500).json({
                            message: '서버 오류'
                        });
                    });
            } else {
                models.Level.findOne({
                        order: sequelize.fn('RAND')
                    })
                    .then(async (data) => {
                        return res.status(200).json({
                            data
                        });
                    })
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                message: '서버 오류'
            });
        });
};