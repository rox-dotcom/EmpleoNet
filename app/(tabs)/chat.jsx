import { View, Text } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Chat = () => {
  return (
    <View className="items-center text-center">
      <MaterialIcons name="error-outline" size={24} color="black" />
      <Text>We are working...</Text>
    </View>
  )
}

export default Chat
