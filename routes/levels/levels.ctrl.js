const models = require('../../models');

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
    await models.Level.findAll({
            attributes: [
                'id',
                'title',
                'levels',
                'time'
            ]
        })
        .then(data => {
            return res.status(200).json({
                data
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
                        level_id: body.levelId
                    });
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
        });
};