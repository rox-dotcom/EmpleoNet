import { View, Text } from 'react-native'
import { Stack } from 'expo-router';
import React from 'react'

const AuthLayout = () => {
  return (
    <>
      <Stack.Screen name='sign-in' options={{headerShown: false}}/>
    
    </>
  )
}

export default AuthLayout