const joi = require("joi");

module.exports.listingSchema = joi.object({
    listing:joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        location:joi.string().required(),
        price:joi.number().required(),
        country:joi.string().required().min(0), // means the number should be greater than 0 or 0
        image:joi.string().allow("",null), // for image it can be empty or null
    }).required()
}
)

module.exports.reviewSchema= joi.object({
    review:joi.object({
        rating: joi.number().required().min(1).max(5),
        comment: joi.string().required(),
    }).required()
})