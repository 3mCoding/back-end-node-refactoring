const models = require('../../models');

exports.getQuest = async (req, res) => {
    const query = req.query;
    console.log(query.no);
    console.log(query.type)
    if (query.no === undefined || query.type === undefined) {
        return res.status(400).json({
            message: '문제의 언어 또는 문제의 번호를 찾을 수 없습니다.'
        });
    }
    const data = await models.Stage.findOne({
        where: {
            no: query.no,
            type: query.type
        }
    });
    if (data) {
        return res.status(200).json({
            data
        });
    } else {
        return res.status(404).json({
            message: '문제를 찾을 수 없습니다.'
        });
    }

}
exports.getQuests = async (req, res) => {
    const data = await models.Stage.findAll({
        attributes: [
            'id',
            'no',
            'title',
        ]
    });
    return res.status(200).json({
        data
    });
}
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
            models.User.update({
                stage: user.stage + 1,
                solve_count: user.solve_count + 1
            }, {
                where: {
                    email: body.email
                }
            })
            models.User.getUser(body.email)
                .then((data) => {
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