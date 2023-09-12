const route = require("express").Router();
const followController = require("../../../controllers/followController");

route.get("/:userId", followController.getFollow);
route.post("/:userId", followController.followUser);
route.delete("/unfollow/:userId/:follower", followController.unfollowUser);

module.exports = route;
