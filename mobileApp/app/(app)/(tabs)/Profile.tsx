import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Feather from '@expo/vector-icons/Feather';
export default function ProfilePage() {
  const [locationVisible, setLocationVisible] = useState(true);

  const interests = [
    { icon: '🎵', label: 'Music', color: '#DBEAFE' },
    { icon: '✈️', label: 'Travel', color: '#CFFAFE' },
    { icon: '💪', label: 'Fitness', color: '#FEF3C7' },
    { icon: '🎮', label: 'Gaming', color: '#E9D5FF' },
    { icon: '🍕', label: 'Foodie', color: '#FED7AA' },
    { icon: '🎨', label: 'Art', color: '#FBCFE8' },
  ];
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile Header */}
          <View style={styles.header}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.cameraButton}>
                <Feather name="camera" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <Text style={styles.name}>Alex Chen</Text>
          </View>

          {/* Bio Section */}
          <View style={styles.section}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.sectionTitle}>Bio</Text>
                <TouchableOpacity>
                  <Feather name="edit-3" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <Text style={styles.bioText}>
                Explorer, coffee enthusiast, and amateur photographer. Always down for a spontaneous adventure! 📸 ☕
              </Text>
            </View>
          </View>

          {/* Interests Section */}
          <View style={styles.section}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
              <Text style={styles.sectionTitle}>Interests</Text>
              <TouchableOpacity>
              <Feather name="edit-3" size={24} color="black" />
              </TouchableOpacity>
              </View>
              <View style={styles.interestsContainer}>
                {interests.map((interest, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.interestTag, { backgroundColor: interest.color }]}
                  >
                    <Text style={styles.interestText}>
                      {interest.icon} {interest.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Location Visibility */}
          <View style={styles.section}>
            <View style={styles.card}>
              <View style={styles.locationRow}>
                <View style={styles.locationInfo}>
                  <Text style={styles.locationIcon}>📍</Text>
                  <View style={styles.locationText}>
                    <Text style={styles.locationTitle}>Location Visibility</Text>
                    <Text style={styles.locationSubtitle}>
                      Show my location to nearby people.
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[
                    styles.toggle,
                    locationVisible ? styles.toggleActive : styles.toggleInactive,
                  ]}
                  onPress={() => setLocationVisible(!locationVisible)}
                >
                  <View
                    style={[
                      styles.toggleThumb,
                      locationVisible ? styles.toggleThumbActive : styles.toggleThumbInactive,
                    ]}
                  />
                  <Text style={[
                    styles.toggleText,
                    locationVisible ? styles.toggleTextActive : styles.toggleTextInactive,
                  ]}>
                    {locationVisible ? 'ON' : 'OFF'}
                  </Text>
                </TouchableOpacity>
              </View>
              
            </View>
              <View>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
          </View>
        

          <View style={{ height: 40 }} />
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 24,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#d5e1f5',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  cameraIcon: {
    fontSize: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 16,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    boxShadow: "0 1px 10px rgba(0, 0, 0, 0.01)",
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  editIcon: {
    fontSize: 20,
  },
  bioText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  interestText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  locationText: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  locationSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  toggle: {
    width: 56,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    position: 'relative',
  },
  toggleActive: {
    backgroundColor: '#3B82F6',
  },
  toggleInactive: {
    backgroundColor: '#D1D5DB',
  },
  toggleThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  toggleThumbActive: {
    right: 4,
  },
  toggleThumbInactive: {
    left: 4,
  },
  toggleText: {
    fontSize: 10,
    fontWeight: '600',
    position: 'absolute',
  },
  toggleTextActive: {
    color: '#FFFFFF',
    left: 8,
  },
  toggleTextInactive: {
    color: '#6B7280',
    right: 8,
  },
  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});