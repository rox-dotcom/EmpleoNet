import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';

export default function ChatRoomHeader({user, router}) {
  return (
    <Stack.Screen
        options={{
            title:' ',
            headerShadowVisible: false,
            headerBackTitle: 'Back',
            headerLeft:() => (
                <View className='flex-row items-center gap-4'>
                    <TouchableOpacity onPress={()=> router.back()}>
                        <Entypo name="chevron-left" size={hp(4)} color="#737373"/>
                    </TouchableOpacity>
                    <View className='flex-row items-center gap-3 '>
                        <Image
                            source={user?.avatar}
                            style={{height: hp(5), aspectRatio:1, borderRadius:100}}
                        /> 
                        <Text style={{fontSize:hp(2.5)}} className='text-neutral-700 font-pmedium'>
                            {user?.username}
                        </Text>
                    </View>
                </View>
            ),
            headerRight: ()=>(
                <View className='flex-row items-center gap-8'>
                    <TouchableOpacity>
                        <Feather name="info" size={hp(2.8)} color="#737373" />
                    </TouchableOpacity>
                </View>
            )     
            
        }}
    />
  )
}