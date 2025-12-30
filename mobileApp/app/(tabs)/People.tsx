import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useLocationUpdate from "@/hooks/useLocationUpdate";
import PeopleCard from "@/components/PeopleCard";
import useFetchNearbyPeople from "@/hooks/useFetchNearbyPeople";
import { Fragment } from "react";

const People = () => {
  // Hook 1 — always runs
  const { location, errorMsg, triggerLocationUpdate } = useLocationUpdate();

  // Prepare coords safely
  const coords = location
    ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
    : undefined;

  // Hook 2 — always runs
  const { nearbyPeople, loading, error } =  useFetchNearbyPeople(coords ?? { latitude: 0, longitude: 0 });

  // Render states AFTER hooks
  if (!location) {
    return <Text style={styles.centerText}>Getting your location...</Text>;
  }

  if (loading) {
    return <Text style={styles.centerText}>Finding nearby people...</Text>;
  }

  if (error || errorMsg) {
    return (
      <Text style={styles.centerText}>
        {error || errorMsg}
      </Text>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Near By People</Text>

        <Pressable
          style={styles.refreshBtn}
          onPress={async () => {
            try {
              await triggerLocationUpdate();
              ToastAndroid.show(
                "Location updated!",
                ToastAndroid.SHORT
              );
            } catch {
              ToastAndroid.show(
                "Failed to update location",
                ToastAndroid.SHORT
              );
            }
          }}
        >
          <Text style={styles.refreshText}>Refresh</Text>
        </Pressable>
      </View>

      {/* People List */}
      <ScrollView style={styles.content}>
      {nearbyPeople.nearbyUsers.map((user) => (
       <Fragment key={user.username}>
        <PeopleCard user={user} />
        </Fragment>
      ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default People;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  refreshBtn: {
    position: "absolute",
    right: 20,
  },
  refreshText: {
    fontSize: 16,
    color: "blue",
  },
  content: {
    flex: 1,
  },
  centerText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
