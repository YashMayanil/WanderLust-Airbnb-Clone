const Listing = require("../models/listing")

// to render all listings
module.exports.index=async(req,res)=>{
 const allListings = await Listing.find({});
 res.render("listings/index.ejs", { allListings, currentFilter: null });
}


// newForm  route 
module.exports.renderNewFrom = (req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner"); // populate this is for showing the reviews for each post 
    if(!listing){
        req.flash("error","Listing you requested does not exits!")
        res.redirect("/listings")
    }
    res.render("listings/show.ejs",{listing});
}


module.exports.createListings=async(req,res,next)=>{  //whiel using wrapasync function you can remove try catch block
  
    let url = req.file.path;
    let filename=req.file.filename;

    const newListing =new Listing(req.body.listing);
    newListing.owner= req.user._id; // adding new field to listing of owner
    newListing.image={url,filename}
    await newListing.save();
    req.flash("success","New Listing is Created!")
    res.redirect("/listings");
}

module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id)
 
    if(!listing){
        req.flash("error","Listing you requested does not exits!")
        return res.redirect("/listings")
    }

    let originalImage=listing.image.url;
    originalImage.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listing,originalImage});
}


module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    
    if(typeof req.file !=="undefined"){
        let url = req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }    
    req.flash("success","Listing is Updated!")
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing=async(req,res)=>{
     let {id}=req.params;
     let deletedListing= await Listing.findByIdAndDelete(id);
     console.log(deletedListing);
     req.flash("success","Listing Deleted!")
     res.redirect("/listings")
}


module.exports.searchListings = async(req,res)=>{
  try {
    const { q } = req.query;
    
    if (!q) {
      req.flash("error", "Please enter a search term");
      return res.redirect("/listings");
    }
    
    // Search in title, location, and country fields (case-insensitive)
    const searchResults = await Listing.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { location: { $regex: q, $options: 'i' } },
        { country: { $regex: q, $options: 'i' } }
      ]
    });
    
    if (searchResults.length > 0) {
      res.locals.success = `Found ${searchResults.length} results for "${q}"`;
      res.render("listings/index.ejs", { allListings: searchResults, currentFilter: null });
    } else {
      req.flash("error", `No results found for "${q}"`);
      res.redirect("/listings");
    }
  } catch (error) {
    req.flash("error", "Search failed. Please try again.");
    res.redirect("/listings");
  }
}

module.exports.filterListing = async(req,res)=>{
  let { id } = req.params;
  let allListings = await Listing.find({ category: id });
  if (allListings.length != 0) {
    res.locals.success = `Listings Filtered by ${id}!`;
    res.render("listings/index.ejs", { allListings, currentFilter: id });
  } else {
    req.flash("error", `There is no any Listing for ${id}!`);
    res.redirect("/listings");
  }
}