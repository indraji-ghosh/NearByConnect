import { useEffect, useState, useCallback } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";
import api from "@/api/axios";

// Hook to fetch current location and push it to the backend
const useLocationUpdate = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchLocationAndUpdate = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      Alert.alert(
        "Location Permission Needed",
        "Enable it in settings to find nearby users."
      );
      return;
    }

    const loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
      timeInterval: 10000,
      distanceInterval: 10,
    });

    setLocation(loc);
    setErrorMsg(null);

    try {
      await api.post("/location/update-location", {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      console.log("Location updated!");
      
    } catch (err) {
      console.error("Backend error:", err);
    }
  }, []);

  useEffect(() => {
    fetchLocationAndUpdate();
  }, [fetchLocationAndUpdate]);

  return { location, errorMsg, triggerLocationUpdate: fetchLocationAndUpdate };
};

export default useLocationUpdate;
