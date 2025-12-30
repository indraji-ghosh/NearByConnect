import { router } from "expo-router";
import { use } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
interface ChatItemProps {
    id: number;
    name: string;
    message: string;
    userId: string;
    otherUserId: string;
    // time: string;
    unread: number;
    // avatarBg: string;
    // messageColor?: string;
}

const handlePress = (id: string, userId: string, name: string) => {
    // Handle chat item press, e.g., navigate to chat detail
    router.push({
      pathname: '/(chat)/[chatId]',
      params: { chatId: id , userId: userId , name: name} // Replace 'currentUserId' with actual user ID
    });
}


const ChatItem = ({ id, name, message, userId, unread }: ChatItemProps) => (

  <TouchableOpacity style={styles.chatItem} key={id} onPress={() => handlePress(id.toString(), userId, name)}>
    <View style={styles.avatarContainer}>
      <View style={[styles.avatar, { backgroundColor: 'green' }]}>
        <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
      </View> 
    </View>

    <View style={styles.chatContent}>
      <View style={styles.chatHeader}>
        <Text style={styles.chatName}>{name}</Text>
        {/* <Text style={styles.chatTime}>{time}</Text> */}
      </View>
      <View style={styles.chatFooter}>
        <Text 
          style={[styles.chatMessage, { color: 'gray' }]} 
          numberOfLines={1}
        >
          {message}
        </Text>
              {unread > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{unread}</Text>
        </View>
      )}
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
  backgroundColor: "#008000",
  minWidth: 22,
  height: 22,
  borderRadius: 11,
  alignItems: "center",
  justifyContent: "center",
},
unreadText: {
  color: "#fff",
  fontSize: 12,
  fontWeight: "bold",
},
})

export default ChatItem;