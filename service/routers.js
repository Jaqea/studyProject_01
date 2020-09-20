const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const fs = require('fs')
const md5 = require('blueimp-md5')

var User = require('./user')
var Product = require('./product')
    // User.find(function(err, ret) {
    //         if (err) {
    //             console.log(err)
    //         } else {
    //             console.log(ret)
    //         }
    //     })
    // User.findByIdAndUpdate('5d5b6168da13611444a16caa', {
    //     avatar: 'http://127.0.0.1:3000/public/avatar/default-avatar.png'
    // }, { new: true }, function(err, user) {
    //     console.log(user)
    // })
    // Product.remove(function(err, data) {
    //     console.log(data)
    // })


router.post('/register', function(req, res) {
    let body = req.body
    User.findOne({
        $or: [
            { userEmail: body.userEmail }, { userName: body.userName }
        ]
    }, function(err, data) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: 'Internal error.'
            })
        }
        if (data) {
            return res.status(200).json({
                err_code: 1,
                message: 'Email or Name aleady exists.'
            })
        }
        //对密码进行md5加密
        body.userPassword = md5(md5(body.userPassword))
        new User(body).save(function(err, user) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: 'Internal error.'
                })
            }
            res.status(200).json({ //响应方法json自动把对象转为字符串
                err_code: 0,
                message: 'ok',
            })
        })
    })
})
router.post('/login', function(req, res) {
    let body = req.body
    User.findOne({
        userEmail: body.userEmail,
        userPassword: md5(md5(body.userPassword))
    }, function(err, user) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: 'Internal error.'
            })
        }
        if (!user) {
            return res.status(200).json({
                err_code: 1,
                message: 'Email or Password is invalid.'
            })
        }
        req.session.user = user
        res.status(200).json({
            err_code: 0,
            message: 'ok',
            user
        })
    })
})
router.get('/logout', function(req, res) {
    req.session.user = null
    res.status(200).json({
        err_code: 0,
        message: 'ok'
    })
})

router.post('/save', function(req, res) {
    let body = req.body
    User.findOne({
        userEmail: body.userEmail
    }, function(err, data) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: 'Internal error.'
            })
        }
        if (body.sex == 'secret') {
            body.sex = -1
        } else if (body.sex == 'boy') {
            body.sex = 0
        } else {
            body.sex = 1
        }
        User.findByIdAndUpdate(data._id, {
            userName: body.userName,
            bio: body.bio,
            sex: body.sex,
            birthday: body.birthday
        }, { new: true }, function(err, user) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: 'updated error.'
                })
            }
            res.status(200).json({
                err_code: 0,
                message: 'ok',
                user
            })
        })
    })
})

router.post('/updatePassword', function(req, res) {
    let body = req.body
    User.findOne({
        userPassword: md5(md5(body.userPassword))
    }, function(err, data) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: 'Internal error.'
            })
        }
        if (!data) {
            return res.status(200).json({
                err_code: 1,
                message: 'user is not exit.'
            })
        }
        User.findByIdAndUpdate(data._id, {
            userPassword: md5(md5(body.newPassword))
        }, { new: true }, function(err, user) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: 'updated error.'
                })
            }
            res.status(200).json({
                err_code: 0,
                message: 'ok',
                user
            })
        })
    })
})

router.post('/uploadImg', function(req, res) {
    let form = new formidable.IncomingForm() //创建上传表单
    form.encoding = 'utf-8' //设置编码
    form.uploadDir = 'public' + '/avatar/' //设置上传目录
    form.keepExtensions = true //保留后缀
    form.maxFieldsSize = 3145728 //设置文件大小
    form.parse(req, function(err, fields, files) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: 'Internal error.'
            })
        }
        var extName = '' //后缀名
        if (files.avatar.type == 'image/pjpeg') {
            extName = 'jpg'
        } else if (files.avatar.type == 'image/jpeg') {
            extName = 'jpg'
        } else if (files.avatar.type == 'image/png') {
            extName = 'png'
        } else if (files.avatar.type == 'image/x-png') {
            extName = 'png'
        }
        if (extName.length == 0) {
            res.status(200).json({
                err_code: 1,
                message: 'format error.'
            })
        }
        var avatarName = Math.random() + '.' + extName
        var newPath = form.uploadDir + avatarName
        fs.renameSync(files.avatar.path, newPath) //重命名
        User.findByIdAndUpdate(req.session.user._id, {
            avatar: 'http://127.0.0.1:3000' + '/' + newPath
        }, { new: true }, function(err, user) {
            if (err) {
                return res.status(500), json({
                    err_code: 500,
                    message: 'Internal error.'
                })
            }
            res.status(200).json({
                err_code: 0,
                message: 'ok',
                user
            })
        })
    })
})

router.post('/pageOne', function(req, res) {
    let body = req.body
    if (body.page == '1') {
        Product.find(function(err, data) {
            console.log(data)
            if (err) {
                res.status(500).json({
                    err_code: 500,
                    message: 'Internet error.'
                })
            } else {
                res.status(200).json({
                    err_code: 0,
                    message: 'ok',
                    page: data.slice(0, 8)
                })
            }
        })
    } else if (body.page == '2') {
        Product.find(function(err, data) {
            if (err) {
                res.status(500).json({
                    err_code: 500,
                    message: 'Internet error.'
                })
            } else {
                res.status(200).json({
                    err_code: 0,
                    message: 'ok',
                    page: data.slice(8, 16)
                })
            }
        })
    } else if (body.page == '3') {
        Product.find(function(err, data) {
            if (err) {
                res.status(500).json({
                    err_code: 500,
                    message: 'Internet error.'
                })
            } else {
                res.status(200).json({
                    err_code: 0,
                    message: 'ok',
                    page: data.slice(16, 24)
                })
            }
        })
    } else if (body.page == '4') {
        Product.find(function(err, data) {
            if (err) {
                res.status(500).json({
                    err_code: 500,
                    message: 'Internet error.'
                })
            } else {
                res.status(200).json({
                    err_code: 0,
                    message: 'ok',
                    page: data.slice(24, 32)
                })
            }
        })
    }
})

router.post('/pageOneSize', function(req, res) {
    let body = req.body
    if (body.pageSize == '8') {
        Product.find(function(err, data) {
            if (err) {
                res.status(500).json({
                    err_code: 500,
                    message: 'Internet error.'
                })
            } else {
                res.status(200).json({
                    err_code: 0,
                    message: 'ok',
                    page: data.slice(0, 8)
                })
            }
        })
    } else if (body.pageSize == '16') {
        Product.find(function(err, data) {
            if (err) {
                res.status(500).json({
                    err_code: 500,
                    message: 'Internet error.'
                })
            } else {
                res.status(200).json({
                    err_code: 0,
                    message: 'ok',
                    page: data.slice(0, 16)
                })
            }
        })
    } else if (body.pageSize == '24') {
        Product.find(function(err, data) {
            if (err) {
                res.status(500).json({
                    err_code: 500,
                    message: 'Internet error.'
                })
            } else {
                res.status(200).json({
                    err_code: 0,
                    message: 'ok',
                    page: data.slice(0, 24)
                })
            }
        })
    } else if (body.pageSize == '32') {
        Product.find(function(err, data) {
            if (err) {
                res.status(500).json({
                    err_code: 500,
                    message: 'Internet error.'
                })
            } else {
                res.status(200).json({
                    err_code: 0,
                    message: 'ok',
                    page: data.slice(0, 32)
                })
            }
        })
    }
})

router.post('/pageTwo', function(req, res) {
    let body = req.body
    if (body.page == '1') {
        Product.find(function(err, data) {
            if (err) {
                res.status(500).json({
                    err_code: 500,
                    message: 'Internet error.'
                })
            } else {
                res.status(200).json({
                    err_code: 0,
                    message: 'ok',
                    page: data.slice(32, 40)
                })
            }
        })
    } else if (body.page == '2') {
        Product.find(function(err, data) {
            if (err) {
                res.status(500).json({
                    err_code: 500,
                    message: 'Internet error.'
                })
            } else {
                res.status(200).json({
                    err_code: 0,
                    message: 'ok',
                    page: data.slice(40, 48)
                })
            }
        })
    } else if (body.page == '3') {
        Product.find(function(err, data) {
            if (err) {
                res.status(500).json({
                    err_code: 500,
                    message: 'Internet error.'
                })
            } else {
                res.status(200).json({
                    err_code: 0,
                    message: 'ok',
                    page: data.slice(48, 56)
                })
            }
        })
    } else if (body.page == '4') {
        Product.find(function(err, data) {
            if (err) {
                res.status(500).json({
                    err_code: 500,
                    message: 'Internet error.'
                })
            } else {
                res.status(200).json({
                    err_code: 0,
                    message: 'ok',
                    page: data.slice(56, 64)
                })
            }
        })
    }
})

router.post('/pageTwoSize', function(req, res) {
    let body = req.body
    if (body.pageSize == '8') {
        Product.find(function(err, data) {
            console.log(data)
            if (err) {
                res.status(500).json({
                    err_code: 500,
                    message: 'Internet error.'
                })
            } else {
                res.status(200).json({
                    err_code: 0,
                    message: 'ok',
                    page: data.slice(0, 8)
                })
            }
        })
    } else if (body.pageSize == '16') {
        Product.find(function(err, data) {
            if (err) {
                res.status(500).json({
                    err_code: 500,
                    message: 'Internet error.'
                })
            } else {
                res.status(200).json({
                    err_code: 0,
                    message: 'ok',
                    page: data.slice(0, 16)
                })
            }
        })
    } else if (body.pageSize == '24') {
        Product.find(function(err, data) {
            if (err) {
                res.status(500).json({
                    err_code: 500,
                    message: 'Internet error.'
                })
            } else {
                res.status(200).json({
                    err_code: 0,
                    message: 'ok',
                    page: data.slice(0, 24)
                })
            }
        })
    } else if (body.pageSize == '32') {
        Product.find(function(err, data) {
            if (err) {
                res.status(500).json({
                    err_code: 500,
                    message: 'Internet error.'
                })
            } else {
                res.status(200).json({
                    err_code: 0,
                    message: 'ok',
                    page: data.slice(0, 32)
                })
            }
        })
    }
})

router.post('/join', function(req, res) {
    let body = req.body
    User.findOne({
        _id: req.session.user._id
    }, function(err, data) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: 'Internet error.'
            })
        }
        if (data.cart.length == 0) {
            User.findByIdAndUpdate(req.session.user._id, {
                $push: {
                    cart: body
                }
            }, { new: true }, function(err, user) {
                if (err) {
                    return res.status(500).json({
                        err_code: 500,
                        message: 'Internet error.'
                    })
                }
                res.status(200).json({
                    err_code: 0,
                    message: 'ok',
                    user
                })
            })
            return
        }
        if (data.cart.find(function(item) {
                if (item.name === body.name) {
                    return true
                }
            })) {
            res.status(200).json({
                err_code: 1,
                message: 'This thing is exits.'
            })
        } else {
            User.findByIdAndUpdate(req.session.user._id, {
                $push: {
                    cart: body
                }
            }, { new: true }, function(err, user) {
                if (err) {
                    return res.status(500).json({
                        err_code: 500,
                        message: 'Internet error.'
                    })
                }
                res.status(200).json({
                    err_code: 0,
                    message: 'ok',
                    user
                })
            })
        }
    })
})

router.post('/removeProduct', function(req, res) {
    let body = req.body
    User.findByIdAndUpdate(req.session.user._id, {
        $pull: {
            cart: body
        }
    }, { new: true }, function(err, user) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: 'Internet error.'
            })
        }
        res.status(200).json({
            err_code: 0,
            message: 'ok',
            user
        })
    })
})

module.exports = router