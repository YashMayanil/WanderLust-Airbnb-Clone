const User = require("../models/user.js");

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.signupUser=async(req,res)=>{
    try{
         let {username,email,password}= req.body;
        const newUser = new User({email,username});
        const registeredUser=await User.register(newUser,password)
        // console.log(registeredUser)
        //for login, passport defalut method
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err)
            }
        req.flash("success","Welcome to WanderLust")
        res.redirect("/listings")
        })

    }catch(e){
          req.flash("error",e.message)  
          res.redirect("/signup")
    }
}


module.exports.renderLogInForm=(req,res)=>{
    res.render("users/login.ejs")
}

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome Back to WanderLust!")
    let redirectUrl=res.locals.redirectUrl // the page which is user requesting from we directly  put them form where they are requesting
    res.redirect(redirectUrl || "/listings")
}


module.exports.logout=(req,res,next)=>{
    //for logout, passport default method
    req.logout((err)=>{
        if(err){
            next(err)
        }
        req.flash("success","you are logged out now")
        res.redirect("/listings")
    })
}