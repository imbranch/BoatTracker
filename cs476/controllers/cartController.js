const path = require('path');
const database = require(path.resolve(__dirname, '../database/database'));

exports.getCart = function(req, res) {
    if (req.query.userid && req.query.password && !isNaN(parseInt(req.query.userid))) {
        const userId = parseInt(req.query.userid);
        database.query('SELECT user_id FROM users WHERE user_id = ? AND password = ?;',
        [userId, req.query.password],
        (err, result) => {
            if (err) {
                res.status(404).end();
                throw err;
            } else if (result) {
                database.query('CALL getCart(?);',
                [userId],
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
            } else {
                res.status(404).end();
            }
        });
    }
};

exports.getCheckouts = function(req, res) {
    if (req.query.userid && req.query.password && !isNaN(parseInt(req.query.userid))) {
        const userId = parseInt(req.query.userid);
        database.query('SELECT user_id FROM users WHERE user_id = ? AND password = ?;',
        [userId, req.query.password],
        (err, result) => {
            if (err) {
                res.status(404).end();
                throw err;
            } else if (result) {
                database.query('CALL getCheckouts(?);',
                [userId],
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
            } else {
                res.status(404).end();
            }
        });
    }
};

exports.getReturns = function(req, res) {
    if (req.query.userid && req.query.password && !isNaN(parseInt(req.query.userid))) {
        const userId = parseInt(req.query.userid);
        database.query('SELECT user_id FROM users WHERE user_id = ? AND password = ?;',
        [userId, req.query.password],
        (err, result) => {
            if (err) {
                res.status(404).end();
                throw err;
            } else if (result) {
                database.query('CALL getReturns(?);',
                [userId],
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
            } else {
                res.status(404).end();
            }
        });
    }
};

exports.removeFromCart = function(req, res) {
    if (req.query.userid && req.query.password && req.query.bookid && !isNaN(parseInt(req.query.userid)) && !isNaN(parseInt(req.query.bookid))) {
        const bookId = parseInt(req.query.bookid);
        const userId = parseInt(req.query.userid);
        database.query('SELECT user_id FROM users WHERE user_id = ? AND password = ?;',
        [userId, req.query.password],
        (err, result) => {
            if (err) {
                res.status(404).end();
                throw err;
            } else if (result) {
                database.query('CALL deleteFromCart(?, ?);',
                [bookId, userId],
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

exports.checkout = function(req, res) {
    if (req.query.userid && req.query.password && req.query.bookid && !isNaN(parseInt(req.query.userid)) && !isNaN(parseInt(req.query.bookid))) {
        const bookId = parseInt(req.query.bookid);
        const userId = parseInt(req.query.userid);
        database.query('SELECT user_id FROM users WHERE user_id = ? AND password = ?;',
        [userId, req.query.password],
        (err, result) => {
            if (err) {
                res.status(404).end();
                throw err;
            } else if (result) {
                database.query('CALL checkoutBook(?, ?);',
                [bookId, userId],
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

exports.return = function(req, res) {
    if (req.query.userid && req.query.password && req.query.bookid && !isNaN(parseInt(req.query.userid)) && !isNaN(parseInt(req.query.bookid))) {
        const bookId = parseInt(req.query.bookid);
        const userId = parseInt(req.query.userid);
        database.query('SELECT user_id FROM users WHERE user_id = ? AND password = ?;',
        [userId, req.query.password],
        (err, result) => {
            if (err) {
                res.status(404).end();
                throw err;
            } else if (result) {
                database.query('CALL returnBook(?, ?);',
                [bookId, userId],
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