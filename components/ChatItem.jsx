import { TouchableOpacity, Image, View, Text} from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function ChatItem({item, router, noBorder}) {
  return (
    
    <TouchableOpacity className= {`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder?'': 'border-b border-b-neutral-300'}`}>
        <View>
            <Image
                source ={require('../assets/images/user1.jpg')}
                style= {{height: hp(6), width: hp(6)}}
                className= 'rounded-full'
            />
        </View>

        <View className='flex-1 gap-1'>
            <View className='flex-row justify-between'>
                <Text style={{fontSize: hp(1.8)}} className='font-psemibold text-neutral-800'>Noemi</Text>
                <Text style={{fontSize: hp(1.6)}} className='font-pregular text-neutral-500'>Time</Text>
            </View>
            <Text style={{fontSize: hp(1.6)}} className='font-pmedium text-neutral-500'>Message</Text>
        </View>
    </TouchableOpacity>
    
  )
}