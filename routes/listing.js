const express = require("express")
const router = express.Router();
const wrapAsync= require("../utils/wrapAsync.js")
const {listingSchema,reviewSchema} =require("../schema.js")
const ExpressError = require("../utils/ExpressError.js")
const Listing=require("../models/listing.js");
const {isLoggedIn,IsOwner,validateListing}= require("../middleware.js");
const { Cursor } = require("mongoose");
const multer = require("multer")
const {storage}= require("../cloudconfig.js")
const upload = multer({ storage })

const listingController = require("../controllers/listings.js")


//index route
router.get("/", wrapAsync(listingController.index));

//new route (this route should be first from show route bcoz new word serches for the id)
router.get("/new",isLoggedIn,listingController.renderNewFrom);

//filter route
router.get("/filter/:id",listingController.filterListing)

//search route
router.get("/search",listingController.searchListings)

//show route
router.get("/:id",wrapAsync(listingController.showListing));

//Create route
router.post("/",isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListings));

//edit route
router.get("/:id/edit",isLoggedIn,listingController.renderEditForm);

//update route
router.put("/:id",isLoggedIn,IsOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing));

//delete route
router.delete("/:id",isLoggedIn,IsOwner,wrapAsync(listingController.deleteListing))



module.exports=router;