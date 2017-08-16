/**
 * Created by user on 2/25/2017.
 */


exports.before = function(req,res,next){
    //uncomment for passport authentication
    // if(!req.isAuthenticated()){
    //     res.redirect('/authenticate/login')
    // }
    //
    // res.locals.authenticated = req.isAuthenticated();

    next();
};

exports.index = function(req,res){
    res.render('index');
};