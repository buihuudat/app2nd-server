const Follow = require("../models/follow");

module.exports = {
  getFollow: async (req, res) => {
    try {
      const userId = req.params.userId;
      const follow = await Follow.findOne({ userId }).populate(
        "followers following"
      );
      return res.status(200).json(follow);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  followUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const followId = req.body.follower;

      const followedUser = await Follow.findOneAndUpdate(
        { username: userId },
        { $push: { following: followId } },
        { new: true, upsert: true }
      );
      const followerUser = await Follow.findOneAndUpdate(
        { username: followId },
        { $push: { followers: userId } },
        { new: true, upsert: true }
      );
      return res.status(200).json({ followedUser, followerUser });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  unfollowUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const followId = req.params.follower;

      const followedUser = await Follow.findOneAndUpdate(
        { username: userId },
        { $pull: { following: followId } }
      );
      const followerUser = await Follow.findOneAndUpdate(
        { username: followId },
        { $pull: { followers: userId } }
      );
      return res.status(200).json({ followedUser, followerUser });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
