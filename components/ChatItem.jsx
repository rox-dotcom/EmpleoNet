import { TouchableOpacity, View, Image, Text} from 'react-native'
import React from 'react'
//import { Image } from 'expo-image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function ChatItem({item, index, router, noBorder}) {
    //const{username, avatar} = item

    const openChatRoom = () => {
        router.push({pathname: '/../chatRoom', params:item})
    }

    return (
    
    <TouchableOpacity onPress={openChatRoom} className= {`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder?'': 'border-b border-b-neutral-300'}`}>
        <View>
            <Image
                source ={{uri: item?.avatar}}
                style= {{height: hp(6), width: hp(6)}}
                className= 'rounded-full ml-2'
            />

        </View>

        <View className='flex-1 gap-1'>
            <View className='flex-row justify-between'>
                <Text style={{fontSize: hp(1.8)}} className='font-psemibold text-neutral-800'>{item.username}</Text>
                <Text style={{fontSize: hp(1.6)}} className='font-pregular text-neutral-500'>Time</Text>
            </View>
            <Text style={{fontSize: hp(1.6)}} className='font-pmedium text-neutral-500'>Message</Text>
        </View>
    </TouchableOpacity>
    
  )
}