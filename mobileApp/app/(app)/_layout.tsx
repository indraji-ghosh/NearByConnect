import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicon from '@expo/vector-icons/Ionicons'
import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from '@expo/vector-icons/Feather'

const _layout = () => {
  return (
     <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000",
      }}
    >
      <Tabs.Screen
        name="Chats"
        options={{
          title: "Chats",
         tabBarIcon: ({ color, size }) => (
            <Ionicon name="chatbubbles" color={color} size={size} />
          ),
        }}
        
      />

      <Tabs.Screen
        name="People"
        options={{
          title: "People",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="usergroup-add" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
         tabBarIcon: ({ color, size }) => (
           <Feather name="user" size={size} color={color} />
          ),
        }}
      />

    </Tabs>
  )
}

export default _layout