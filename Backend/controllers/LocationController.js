import User from "../models/User.js"
export const updateUserLocation = async (req, res) => {
    const { user } = req;

    try {
        const { latitude, longitude } = req.body; 

        if (!latitude || !longitude) {
            return res.status(400).json({ message: 'Latitude and Longitude are required.' });
        }

    if (!user?.id) {
        return res.status(401).json({ message: 'Unauthorized: User not authenticated.' });
    }

    // Find the user by ID and update their location
    const updated = await User.findByIdAndUpdate(
        req.user.id,
        {
            location: {
                type: 'Point',
                coordinates: [longitude, latitude], // lng first!
            },
            lastLocationUpdate: new Date(),
            isOnline: true,
        },
        { new: true } 
    );

    if (!updated) {
        return res.status(404).json({ message: 'User not found.' });
    }

        res.json({ 
      success: true, 
      location: updated.location.coordinates 
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
