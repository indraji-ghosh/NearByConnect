import { fetchChatMessages } from '@/api/chatApi';
import {socket} from '@/socket';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Message {
  chatId: string;
  text: string;
  senderId: string;
  timestamp?: number;
}



export default function ChatInterface() {

  const { chatId, userId } = useLocalSearchParams<{
    chatId?: string;
    userId?: string;
  }>();


  // Validate route params exist
  if (!chatId || !userId) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: Missing route parameters</Text>
          <Text style={styles.errorSubtext}>
            Required: chatId and userId
          </Text>
         
            <Text style={styles.errorDetails}>
              Received: {JSON.stringify({ chatId, userId })}
            </Text>
         
        </View>
      </SafeAreaView>
    );
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    console.log("Chat Interface loaded with chatId:", chatId, "and userId:", userId);
    
    // Join the chat room
   
    socket?.emit("joinChat", { chatId });

    // Listen for new messages
    const handleNewMessage = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket?.on("newMessage", handleNewMessage);

    // Cleanup on unmount
    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [chatId, userId]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!messageText.trim()) return;

    socket?.emit("sendMessage", {
      chatId,
      senderId: userId,
      text: messageText.trim(),
    });

    setMessageText("");
  };


  useEffect(() => {
  const loadMessages = async () => {
    try {
      const history = await fetchChatMessages(chatId);
      setMessages(history);
    } catch (err) {
      console.error("Failed to load chat history", err);
    }
  };

  loadMessages();
}, [chatId]);

  const renderMessage = ({ item }: { item: Message }) => {
    const isCurrentUser = item.senderId === userId;
    
    return (
      <View
        style={[
          styles.messageWrapper,
          isCurrentUser ? styles.messageWrapperRight : styles.messageWrapperLeft,
        ]}
      >
        {!isCurrentUser && (
          <View style={styles.smallAvatar}>
            <Text style={styles.smallAvatarText}>JS</Text>
          </View>
        )}
        <View
          style={[
            styles.messageBubble,
            isCurrentUser ? styles.messageBubbleRight : styles.messageBubbleLeft,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isCurrentUser && styles.messageTextWhite,
            ]}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>JS</Text>
              </View>
              <View style={styles.onlineIndicator} />
            </View>
            <View>
              <Text style={styles.name}>Jane Smith</Text>
              <Text style={styles.status}>Online</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.menuButton}>
            <View style={styles.menuDot} />
            <View style={styles.menuDot} />
            <View style={styles.menuDot} />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item, index) => `${item.chatId}-${index}-${item.timestamp || Date.now()}`}
          contentContainerStyle={styles.messagesContent}
          renderItem={renderMessage}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No messages yet. Start the conversation!</Text>
            </View>
          }
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            value={messageText}
            onChangeText={setMessageText}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
            multiline
            maxLength={1000}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !messageText.trim() && styles.sendButtonDisabled,
            ]}
            onPress={sendMessage}
            disabled={!messageText.trim()}
          >
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8b7355',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4cd964',
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  status: {
    fontSize: 14,
    color: '#4cd964',
    marginTop: 2,
  },
  menuButton: {
    padding: 8,
  },
  menuDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#666',
    marginVertical: 2,
  },
  messagesContent: {
    padding: 16,
    flexGrow: 1,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  messageWrapperLeft: {
    justifyContent: 'flex-start',
  },
  messageWrapperRight: {
    justifyContent: 'flex-end',
  },
  smallAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8b7355',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  smallAvatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  messageBubble: {
    borderRadius: 18,
    padding: 12,
    maxWidth: '75%',
  },
  messageBubbleLeft: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 4,
  },
  messageBubbleRight: {
    backgroundColor: '#36a9e1',
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    color: '#000',
    lineHeight: 20,
  },
  messageTextWhite: {
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ff3b30',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  errorDetails: {
    fontSize: 12,
    color: '#999',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#000',
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#36a9e1',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});