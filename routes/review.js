const express = require("express");
const router =express.Router({mergeParams:true}); // this is beacause accepting the request of url id 
const wrapAsync= require("../utils/wrapAsync.js")
const {validateReview,isLoggedIn,isReviewAuther}= require("../middleware.js");
const Review = require("../models/review.js")
const Listing=require("../models/listing.js");
const reviewController =require("../controllers/reviews.js")

//Post route (adding new review)
router.post("/", isLoggedIn,validateReview,wrapAsync(reviewController.addNewReview))


//Delete review (route)
router.delete("/:reviewid",isLoggedIn,isReviewAuther,wrapAsync(reviewController.deleteReview)) 


module.exports=router;