//this middleware is used for verifiying that only registered
// user can add change or update the listings ....

const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js")
const {listingSchema,reviewSchema} =require("./schema.js")

module.exports.isLoggedIn=(req,res,next)=>{
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create a listing");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl ){
        res.locals.redirectUrl=req.session.redirectUrl ;
    }
    next();
}

module.exports.IsOwner =async(req,res,next)=>{
    let {id}= req.params;
    let listing= await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this listing");
        return res.redirect(`/listings/${id}`)
    }
    next();
}

//this middle ware assuring that only user which created review is able to delete review
module.exports.isReviewAuther =async(req,res,next)=>{
    let {id,reviewid}= req.params;
    let review= await Review.findById(reviewid);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of this review ");
        return res.redirect(`/listings/${id}`)
    }
    next();
}

module.exports.validateListing= (req,res,next)=>{
     let {error}=listingSchema.validate(req.body); // it checks that req.body does satisfys the all given conditions to listing schema 
    if(error){
        let errMsg= error.details.map((el)=>el.message.join(","))
        throw new ExpressError(404,errMsg);
    }else{
        next();
    }
}

module.exports.validateReview= (req,res,next)=>{
     let {error}=reviewSchema.validate(req.body); // it checks that req.body does satisfys the all given conditions to listing schema 
    if(error){
        let errMsg= error.details.map((el)=>el.message.join(","))
        throw new ExpressError(404,errMsg);
    }else{
        next();
    }
}


