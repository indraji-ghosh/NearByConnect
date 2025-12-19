import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Person } from '@/types';

interface PeopleCardProps {
  user: Person;
}

const PeopleCard = ({ user }: PeopleCardProps) => {
  return (
    <View style={styles.card} >
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?w=200&h=200&fit=crop' }}
              style={styles.profileImage}
            />
            
          </View>
          
          <View style={styles.info}>
            <Text style={styles.name}>{user.username}</Text>
            <Text style={styles.distance}>1.2 km away</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.messageButton}>
          <MaterialIcons name="message" size={18} color="white"/>
          <Text style={styles.messageText}>Message</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.bio}>
        Coffee enthusiast, avid hiker, and part-time painter.
      </Text>
      
      <View style={styles.tags}>
        <View style={[styles.tag, styles.musicTag]}>
          <Text style={styles.tagIcon}>🎵</Text>
          <Text style={styles.tagText}>Music</Text>
        </View>
        
        <View style={[styles.tag, styles.travelTag]}>
          <Text style={styles.tagIcon}>✈️</Text>
          <Text style={styles.tagText}>Travel</Text>
        </View>
        
        <View style={[styles.tag, styles.fitnessTag]}>
          <Text style={styles.tagIcon}>💪</Text>
          <Text style={styles.tagText}>Fitness</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    boxShadow: '0 2px 10px rgba(0,0,0,0.01)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#4A90E2',
    borderRadius: 30,
    padding: 2,
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  distance: {
    fontSize: 13,
    color: '#888888',
  },
  messageButton: {
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  messageIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  bio: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
    marginBottom: 16,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  musicTag: {
    backgroundColor: '#FFE8E8',
  },
  travelTag: {
    backgroundColor: '#E8F4FF',
  },
  fitnessTag: {
    backgroundColor: '#E8FFE8',
  },
  tagIcon: {
    fontSize: 14,
  },
  tagText: {
    fontSize: 13,
    color: '#333333',
    fontWeight: '500',
  },
});

export default PeopleCard;