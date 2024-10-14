import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../components/ChatRoomHeader';
import MessageList from '../components/MessageList';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useGlobalContext } from '../context/GlobalProvider';
import { createRoomIfNotExists, getAllChatroomSMS, handleSendSMS } from '../lib/appwrite';



export default function chatRoom() {
  const item = useLocalSearchParams(); //second user
  const {user} = useGlobalContext(); //logged user
  const router = useRouter();
  const textRef = useRef('')
  const inputRef = useRef(null)
  
  const [messages, setMessages] = useState([]);
  const [chatRoom, setChatRoom] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchOrCreateRoom = async () => {
      if (user?.$id && item?.$id) {
        try {
          const room = await createRoomIfNotExists(user.$id, item.$id);
          setChatRoom(room); 
          //console.log(room)
        } catch (error) {
          setError(error.message); 
        }
      }
      
    };

    fetchOrCreateRoom();
  }, [user, item]);

  useEffect(()=>{
    const fetchMessages = async () =>{
      if(chatRoom?.$id){
        try {
          const response = await getAllChatroomSMS(chatRoom.$id)
          setMessages(response.documents)
        } catch (error) {
          throw new Error(error)
        }
      }
    };
    
    fetchMessages();
  },[chatRoom]);

  const sendSMS = async () => {
    let message = textRef.current.trim();
    if (!message) return;

    try {
      textRef.current = "";
      if(inputRef) inputRef?.current?.clear();
      const messagecreated= await handleSendSMS(user?.$id, item?.$id, message, chatRoom?.$id);

      console.log(messagecreated?.$id)
    } catch (error) {
      Alert.alert('Message', error.message);
    }
  };
  
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
                  ref={inputRef}
                  onChangeText={value=> textRef.current = value} 
                  placeholder='Ingresa un mensaje...'
                  className= 'flex-1 mr-2'
                  style={{fontSize: hp(2)}}
                  />
                  <TouchableOpacity onPress={sendSMS} className='bg-neutral-200 p-2 mr-[1px] rounded-full'>
                    <Ionicons name="send" size={24} color="black" />
                  </TouchableOpacity>
              </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
    
  )
}