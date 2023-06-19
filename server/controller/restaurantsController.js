import restaurantsModel from "../models/restaurantsModel.js";

const getAllRestaurants = async (request, response) => {
  // console.log("this is a getAll request");
  const allRestaurants = await restaurantsModel.find({}).populate({path:"shops", select:["name", "likes"]});
  console.log("allRestaurants", allRestaurants);
  response.status(200).json({
    allRestaurants,
    number: allRestaurants.length,
    message: "this is the list of cities",
  });
  console.log("allRestaurants>>>>>, allRestaurants ");
};

const getRestaurantsByLocation = async (request, response) => {
  console.log("request>>>>", request.params);
  // const location = request.params.location
  const { location } = request.params;
  const { likes } = request.query;
  console.log("likes", likes);

  if (likes) {
    try {
      const restaurantsWithLocAndLikes = await restaurantsModel.find({
        location: location,
        likes: { $gte: likes },
      });
      if (restaurantsWithLocAndLikes.length === 0) {
     
        response.status(200).json({
            msg:"sorry, no number of likes for this location"
        })
      
     } else {
    response.status(200).json({
        restaurantsWithLocAndLikes,
        number: restaurantsWithLocAndLikes.length,
      });    
}
      
    } catch (error) {
      console.log("error>>>>", error);
      response.status(500).json({
        msg: "You cannot code!",
      });
    }
  }
  try {
    const requestedLocations = await restaurantsModel.find({
      location: location,
    });
    console.log("requestedLocations>>>>", requestedLocations);
    if (requestedLocations.length === 0) {
      response.status(200).json({
        msg: "sorry, no results with that location",
      });
    } else {
      response.status(200).json({
        requestedLocations,
        number: requestedLocations.length,
      });
    }
  } catch (error) {
    console.log("error>>>>", error);
    response.status(500).json({
      message: "Go check your code, it is not working",
    });
  }
};
export { getAllRestaurants, getRestaurantsByLocation };
