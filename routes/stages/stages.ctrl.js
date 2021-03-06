const models = require('../../models');

exports.getQuest = async (req, res) => {
    const query = req.query;

    if (query.no === undefined || query.type === undefined || query.no == '' || query.type == '') {
        return res.status(400).json({
            message: '문제의 언어 또는 문제의 번호를 찾을 수 없습니다.'
        });
    }
    await models.Stage.findOne({
            where: {
                no: query.no,
                type: query.type
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
    await models.Stage.findAll({
            attributes: [
                'id',
                'no',
                'title',
            ],
            where: {
                type: '0'
            }
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
                'stage',
                'solve_count'
            ],
            where: {
                email: body.email,
            }
        })
        .then(async (user) => {
            let stage = user.stage + 1;
            let solve_count = user.solve_count + 1;

            if (stage == 11) {
                stage = 1;
                solve_count = solve_count - 10;
            }

            models.User.update({
                stage: stage,
                solve_count: solve_count
            }, {
                where: {
                    email: body.email
                }
            })
            models.User.getUser(body.email)
                .then(() => {
                    return res.status(200).json({
                        stage: stage,
                        solve_count: solve_count
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