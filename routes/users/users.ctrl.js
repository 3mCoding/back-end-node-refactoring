const models = require('../../models');
const bcrypt = require('bcrypt');

exports.join = async (req, res) => {
    const body = req.body;

    try {
        const checkEmail = await models.User.findOne({
            where: {
                email: body.email,
            },
        });

        if (checkEmail) {
            return res.status(401).json({
                message: '이미 가입한 미림인입니다.',
            });
        }

        const salt = 10;
        const hashPassword = bcrypt.hashSync(body.password, salt);

        await models.User.create({
            name: body.name,
            email: body.email,
            password: hashPassword,
            student_num: body.student_num,
            stage: 1,
            solve_count: 0
        }, {
            validate: true
        }).catch(error => {
            console.log(error);
            return res.status(400).json({
                message: '이메일 형식이 올바르지 않습니다.'
            });
        })
        const data = await models.User.getUser(body.email);
        return res.status(200).json({
            message: '회원가입 되었습니다.',
            data
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: '서버 오류'
        });
    }
};

exports.login = async (req, res) => {
    const body = req.body;
    try {
        const user = await models.User.findOne({
            where: {
                email: body.email
            }
        });
        if (user) {
            const passwordValid = bcrypt.compareSync(body.password, user.password);
            if (passwordValid) {
                const data = await models.User.getUser(body.email);
                return res.status(200).json({
                    message: '로그인 되었습니다.',
                    data
                });
            } else {
                return res.status(400).json({
                    message: '비밀번호가 일치하지 않습니다.'
                });
            }
        } else {
            return res.status(404).json({
                message: '계정이 존재하지 않습니다.'
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: '서버 오류'
        });
    }
};
exports.ranking = async (req, res) => {
    models.User.findAll({
            attributes: [
                'name',
                'student_num',
                'solve_count',
            ],
            order: [
                ['solve_count', 'DESC']
            ]
        })
        .then(data => {
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
}