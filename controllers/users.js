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

        console.log("registerUser", registerUser);
        req.login(registerUser, err => {
            if(err) {
                return next(err);
            }
            else {
                req.flash('success', 'Welcome to Moving E-Shop');
                // console.log(req);
                res.redirect('/home');
            }
        })
    } catch (e) {
        console.log("register error:", e.message)
        req.flash('error', e.message);
        res.redirect('/register');
    }
    // console.log(registerUser);    
}

module.exports.renderLogin = (req, res)=> {

    // res.sendFile(__dirname + '/views/login.html');
    res.render('./login');
};


module.exports.login = (req, res)=> {
    // console.log("dfdfdsfdsfdsfs")
    // console.log("req", req);
    // console.log("res", res);
    req.flash('success', 'Walcome Back');
    const redirectUrl = req.session.returnTo || '/products';
    delete req.session.returnTo;
    res.redirect(redirectUrl);

}



module.exports.logout = (req, res) => {
    console.log("LOGOUT!!");
    req.logout();
    req.flash('success', "GoodBye");
    // console.log(req);
    res.redirect('/home')
}

