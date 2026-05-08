if(process.env.NODE_ENV !="production"){
    require('dotenv').config()
}
const express= require("express");
const app = express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate"); //it hellps to create layout
const ExpressError = require("./utils/ExpressError.js")
const session = require("express-session")
const flash=require("connect-flash")
const passport =require("passport");
const LocalStrategy= require("passport-local")
const User = require("./models/user.js")


const listingsRouter=require("./routes/listing.js")
const reviewsRouter=require("./routes/review.js")
const userRouter=require("./routes/user.js")


const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")))


const sessionOptions={
    secret:"mysupersecretcdoe",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+ 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true   // used for security (cross scipting attacks)
    }
}

app.get("/", (req, res) => {
    res.redirect("/listings");
});

//use of session
app.use(session(sessionOptions))
app.use(flash())


// use of passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use((req,res,next)=>{
    res.locals.currUser =req.user;
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})


//listing route
app.use("/listings",listingsRouter)


app.get("/listings/category/:category",(req,res)=>{
    console.log(req.params)
})

//Reviews router
app.use("/listings/:id/reviews",reviewsRouter)

//User Router(creating user)
app.use("/",userRouter)


//page not found error
app.use((req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"))
})

//custom defined middleware for handling error 
app.use((err,req,res,next)=>{
   let{statusCode=500,message="SomeThing Went Wrong!"}=err;
   res.status(statusCode).render("error.ejs",{err})
   //res.status(statusCode).send(message)
    // res.send("Something went wrong")
})

app.listen(8000,()=>{
    console.log("server is listining...");
});