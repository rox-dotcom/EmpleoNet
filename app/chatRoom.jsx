import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../components/ChatRoomHeader';
import MessageList from '../components/MessageList';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomKeyboardView from '../components/CustomKeyboardView';

export default function chatRoom() {
  const item = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState([]);

  return (
    <CustomKeyboardView inChat={true}> 
        <View className= "flex-1 bg-white">
        <StatusBar style='dark'/>
        <ChatRoomHeader user={item} router={router}/>
        <View className='h-3 border-b border-neutral-200'/>

        <View className= 'flex-1 justify-center bg-neutral-100 overflow-visible'>
          <View className= 'flex-1'>
            <MessageList messages={messages}/>
          </View>
          <View style={{marginBottom: hp(2.7)}} className= 'pt-2'>
              <View className='flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5'>
                <TextInput 
                  placeholder='Ingresa un mensaje...'
                  className= 'flex-1 mr-2'
                  style={{fontSize: hp(2)}}
                  />
                  <TouchableOpacity onPress='' className='bg-neutral-200 p-2 mr-[1px] rounded-full'>
                    <Ionicons name="send" size={24} color="black" />
                  </TouchableOpacity>
              </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
    
  )
}