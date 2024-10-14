import { View, Text } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default function MessageItem({message, currentUser}) {
  if(currentUser?.$id == message?.sender){
    //my message
    return(
        <View className='flex-row justify-end mb-3 mr-3'>
            <View style={{width: wp(80)}}>
                <View className= 'flex self-end p-3 rounded-2xl bg-white border border-neutral-200'>
                   <Text style={{fontSize: hp(1.9)}}>
                    {message?.body}
                    </Text> 
                </View>  
            </View>
        </View>
    )
  }else{
    return(
        <View style={{width: wp(80)}} className='ml-3 mb-3'>
            <View className='flex self-start p-3 px-4 rounded-2xl bg-cyan-200 border border-cyan-200'>
                <Text style={{fontSize: hp(1.9)}}> {message?.body} </Text>
            </View>
        </View>
    )
  }
}