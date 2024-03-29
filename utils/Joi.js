const validateCampground = (req, res, next) => {
  const campgroundSchema = Joi.object({
    campground: Joi.object({
      title: Joi.string().required(),
      price: Joi.number().required().min(0).max(9999),
      location: Joi.string().required(),
      image: Joi.string().required(),
      description: Joi.string().required(),
    }).required(),
  });
};


