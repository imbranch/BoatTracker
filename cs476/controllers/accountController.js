const path = require('path');
const database = require(path.resolve(__dirname, '../database/database'));

exports.create = function(req, res) {
    const q = req.query;
    if (q.username && q.password && q.email && q.firstname && q.lastname && q.lineone && q.zip && q.city && q.state) {
        database.query('CALL insertAccountInfo(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [q.username, q.password, q.email, q.firstname, q.lastname, parseInt(q.prefix) || null, parseInt(q.number) || null, q.lineone, q.linetwo, q.zip, q.city, q.state],
        (err, result) => {
            if (err) {
                res.status(404).end();
                throw err;
            } else if (result) {
                res.status(200).json(result[0]);
            } else {
                res.status(404).end();
            }
        });
    }
}

exports.signIn = function(req, res) {
    if (req.query.username && req.query.password) {
        database.query('CALL getAccountInfo(?, ?)',
        [req.query.username, req.query.password],
        (err, result) => {
            if (err) {
                res.status(404).end();
                throw err;
            } else if (result) {
                res.status(200).json(result[0]);
            } else {
                res.status(404).end();
            }
        });
    }
}

exports.delete = function(req, res) {
    if (req.query.userid && req.query.password && !isNaN(parseInt(req.query.userid))) {
        const userId = parseInt(req.query.userid);
        database.query('SELECT user_id FROM users WHERE user_id = ? AND password = ?;',
        [userId, req.query.password],
        (err, result) => {
            if (err) {
                res.status(404).end();
                throw err;
            } else if (result) {
                database.query('CALL deleteUserAccount(?)',
                [userId],
                (err, result) => {
                    if (err) {
                        res.status(404).end();
                        throw err;
                    } else if (result) {
                        res.status(200).json([{status: 'success'}]);
                    } else {
                        res.status(404).end();
                    }
                });
            } else {
                res.status(404).end();
            }
        });
    }
}

exports.updateInfo = function(req, res) {
    if (req.query.userid && req.query.username && req.query.password && req.query.newpassword && req.query.firstname && req.query.lastname && req.query.email && !isNaN(parseInt(req.query.userid))) {
        const userId = parseInt(req.query.userid);
        database.query('SELECT user_id FROM users WHERE user_id = ? AND password = ?;',
        [userId, req.query.password],
        (err, result) => {
            if (err) {
                res.status(404).end();
                throw err;
            } else if (result) {
                database.query('CALL updateAccount(?, ?, ?, ?, ?, ?)',
                [userId, req.query.username, req.query.password, req.query.email, req.query.firstname, req.query.lastname],
                (err, result) => {
                    if (err) {
                        res.status(404).end();
                        throw err;
                    } else if (result) {
                        res.status(200).json([{status: 'success'}]);
                    } else {
                        res.status(404).end();
                    }
                });
            } else {
                res.status(404).end();
            }
        });
    }
}

exports.updateFavorites = function(req, res) {
    if (req.query.userid && req.query.password && req.query.fsubject && req.query.fauthor && !isNaN(parseInt(req.query.userid))) {
        const userId = parseInt(req.query.userid);
        database.query('SELECT user_id FROM users WHERE user_id = ? AND password = ?;',
        [userId, req.query.password],
        (err, result) => {
            if (err) {
                res.status(404).end();
                throw err;
            } else if (result) {
                database.query('CALL updateFavorites(?, ?, ?)',
                [userId, req.query.fsubject, req.query.fauthor],
                (err, result) => {
                    if (err) {
                        res.status(404).end();
                        throw err;
                    } else if (result) {
                        res.status(200).json([{status: 'success'}]);
                    } else {
                        res.status(404).end();
                    }
                });
            } else {
                res.status(404).end();
            }
        });
    }
}