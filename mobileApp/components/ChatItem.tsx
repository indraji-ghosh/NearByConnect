import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
interface ChatItemProps {
    id: number;
    name: string;
    message: string;
    time: string;
    unread: boolean;
    avatarBg: string;
    messageColor?: string;
}

const handlePress = () => {
    // Handle chat item press, e.g., navigate to chat detail
    router.push('/(app)/(tabs)/(chat)/chat');
}

const ChatItem = ({ id, name, message, time, unread, avatarBg, messageColor }: ChatItemProps) => (

  <TouchableOpacity style={styles.chatItem} key={id.toString()} onPress={handlePress}>
    <View style={styles.avatarContainer}>
      <View style={[styles.avatar, { backgroundColor: avatarBg }]}>
        <Text style={styles.avatarText}>{name.charAt(0)}</Text>
      </View>
    </View>

    <View style={styles.chatContent}>
      <View style={styles.chatHeader}>
        <Text style={styles.chatName}>{name}</Text>
        <Text style={styles.chatTime}>{time}</Text>
      </View>
      <View style={styles.chatFooter}>
        <Text 
          style={[styles.chatMessage, messageColor && { color: messageColor }]} 
          numberOfLines={1}
        >
          {message}
        </Text>
        {unread && <View style={styles.unreadBadge} />}
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    chatItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  chatTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatMessage: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#9ca3af',
    marginLeft: 8,
  }
})

export default ChatItem;