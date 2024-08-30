import { View, Text } from 'react-native'
import { Link } from 'expo-router';
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const SignUp = () => {
  return (
    <View className="items-center text-center">
      <MaterialIcons name="error-outline" size={24} color="black" />
      <Text>We are working...</Text>
      <Link href={'../../home'} className="text-blue-100">click to go home</Link>
      
    </View>
  )
}

export default SignUp