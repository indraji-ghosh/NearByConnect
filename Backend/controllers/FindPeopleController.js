import mongoose from "mongoose";
import User from "../models/User.js";

export const findNearbyPeople = async (req, res) => {
  const userId = req.user?.id;
  const { latitude, longitude, maxDistance = 3000 } = req.body;

  if (!latitude || !longitude || !userId) {
    return res.status(400).json({
      message: "Latitude, longitude, and userId are required"
    });
  }

  try {
    const nearbyUsers = await User.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [
              parseFloat(longitude),
              parseFloat(latitude)
            ]
          },
          distanceField: "distance",
          maxDistance: Number(maxDistance), // meters
          spherical: true,
          query: {
        _id: { $ne: new mongoose.Types.ObjectId(userId) },
        "location.coordinates": { $exists: true }
      }
        }
      },
      { $limit: 50 },
      {
        $project: {
          username: 1,
          profileImage: 1,
          isOnline: 1,
          lastSeen: 1,
          distance: {
            $round: [{ $divide: ["$distance", 1000] }, 2] // km
          }
        }
      }
    ]);

    res.json({
      success: true,
      count: nearbyUsers.length,
      nearbyUsers
    });

  } catch (error) {
    console.error("Geo search error:", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
