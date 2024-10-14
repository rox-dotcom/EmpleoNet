import { View, Text, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import icons from '../constants/icons';
import React from 'react'
import PopUpModal from './PopUpModal';

const ServiceCard = ({service: {title, description, image_service, proovedor:{username, avatar} }}) => {
  return (
    <View className= "flex-col items-center px-4 mb-14">
      <View className= "flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
            <View className= "w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                <Image
                source = {{uri: avatar}}
                className= "w-full h-full rounded-lg"
                resizeMode = 'cover' 
                /> 
                
            </View>

            <View className = "justify-center flex-1 ml-3 gap-y-1">
                <Text className= "text-white font-psemibold text-sm"
                    numberOfLines={1} >
                    {title}
                </Text>
                <Text className="text-xs text-gray-100 font-pregula" numberOfLines={1}>
                    {username}
                </Text>
            </View>
        </View>

        <View className= "pt-2">
            <Image source={icons.menu}
                    className= "w-5 h-5 "
                    resizeMode='contain'/>        
        </View>
      </View>

        <TouchableOpacity
            activeOpacity={0.7}
            className= "w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
            <Image 
                source={{uri: image_service}}
                className= "w-full h-full rounded-xl mt-3"
                resizeMode='cover'
            />
        </TouchableOpacity>
    </View>
  )
}

export default ServiceCard