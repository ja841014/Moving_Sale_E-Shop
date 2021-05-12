const User = require('../models/user');
const { connection } = require("../database");


module.exports.renderRegister = (req, res)=> {
    res.render('./register');
}

module.exports.register = async(req, res, next) => {
    try {

        const {email, username, password, account} = req.body;
        
        const user = new User({email, username});

        // pass the user object and password in it and save it in db
        const registerUser = await User.register(user, password);

        const q = 'INSERT INTO user(user_id, username, account, email, pass) VALUES (?, ?, ?, ?, ?);';
        const d = [String(registerUser._id), username, account, email, password];
        await connection.promise().query(q, d);

        req.login(registerUser, err => {
            if(err) {
                return next(err);
            }
            else {
                req.flash('success', 'Welcome to Moving E-Shop');
                res.redirect('/home');
            }
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.renderLogin = (req, res)=> {
    res.render('./login');
};


module.exports.login = (req, res)=> {
    req.flash('success', 'Welcome Back');
    const redirectUrl = req.session.returnTo || '/products';
    delete req.session.returnTo;
    res.redirect(redirectUrl);

}



module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', "GoodBye");
    res.redirect('/home')
}

