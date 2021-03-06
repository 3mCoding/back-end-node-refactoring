const models = require('../../models');
const bcrypt = require('bcrypt');
const salt = 10;
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
        return res.status(201).json({
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
                    result: '로그인 되었습니다.',
                    data
                });
            } else {
                return res.status(400).json({
                    result: '비밀번호가 일치하지 않습니다.'
                });
            }
        } else {
            return res.status(404).json({
                result: '계정이 존재하지 않습니다.'
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            result: '서버 오류'
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
exports.update = async (req, res) => {
    const body = req.body;
    const param = req.params;
    if (body.name === undefined || body.studentNumber === undefined || body.name == '' || body.studentNumber == '') {
        return res.status(400).json({
            message: '변경할 회원의 이름과 학번이 존재하지 않습니다.'
        });
    }
    models.User.update({
            name: body.name,
            student_num: body.studentNumber
        }, {
            where: {
                email: param.email
            }
        })
        .then((User) => {
            console.log(User)
            if (User == 0) {
                return res.status(404).json({
                    message: '회원 정보를 변경할 회원을 찾을 수 없습니다.'
                });
            }
            return res.status(200).json({
                message: '회원 정보가 수정되었습니다.'
            });
        })
        .catch((e) => {
            console.log(e);
            return res.status(500).json({
                message: '서버 오류'
            });
        })
}
exports.delete = async (req, res) => {
    const email = req.params.email;
    models.User.destroy({
            where: {
                email: email
            }
        }).then(User => {
            if (User == 0) {
                return res.status(404).json({
                    message: '탈퇴할 회원을 찾을 수 없습니다.'
                });
            }
            return res.status(200).json({
                message: '탈퇴되었습니다.'
            });
        })
        .catch((e) => {
            console.log(e);
            return res.status(500).json({
                message: '서버 오류'
            });
        })
}
exports.passwordUpdate = async (req, res) => {
    const body = req.body;
    const param = req.params;
    if (body.password === undefined || body.newPassword === undefined || body.password == '' || body.newPassword == '') {
        return res.status(400).json({
            message: 'Request Body 형식이 유효하지 않습니다.'
        });
    }
    await models.User.findOne({
            where: {
                email: param.email
            }
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: '회원을 찾을 수 없습니다.'
                });
            }
            const passwordValid = bcrypt.compareSync(body.password, user.password);
            if (passwordValid) {
                const hashPassword = bcrypt.hashSync(body.newPassword, salt);
                models.User.update({
                        password: hashPassword
                    }, {
                        where: {
                            email: param.email
                        }
                    })
                    .then(() => {
                        return res.status(200).json({
                            message: '비밀번호가 변경되었습니다.'
                        });
                    })
                    .catch(e => {
                        console.log(e);
                        return res.status(500).json({
                            message: '서버 오류'
                        });
                    })
            }
        })
        .catch(e => {
            console.log(e);
            return res.status(500).json({
                message: '서버 오류'
            });
        })
}