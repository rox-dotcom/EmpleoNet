import { View, Text, Image } from 'react-native'
import React from 'react'

import images from '../constants/images'
import CustomButton from '../components/CustomButton'
import { router } from 'expo-router'

const EmptyState = ({title, subtitle}) => {
  return (
    <View className= "justify-center items-center px-4">
      <Image 
        source={images.notFound} 
        className= "w-[270px] h-[215px] mb-4"
        resizeMode= 'contain'
      />
    
    <Text className="font-pmedium text-center text-xl text-gray-100">
        {title}
    </Text>
    <Text className="font-psemibold text-sm text-center text-gray-100 mt-2">
        {subtitle}
    </Text>

    <CustomButton
        title="Back to explore" 
        handlePress={()=> router.push('/home')}
        containerStyles= "w-full my-5" 
    />

    </View>
  )
}

export default EmptyState