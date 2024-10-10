import { View, ActivityIndicator } from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ChatList from '../../components/ChatList';
import { getUsersChat } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const Chat = () => {
  const {user, setUser} = useGlobalContext();
  const [users, setUsers] = useState([1,2,3])

  useEffect(() => {
    if(user?.uid)
      getUsersChat();

  }, [])
  


  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex-1 ">
        <StatusBar style='light'/>

        {
          users.length> 0? (
            <ChatList users= {users} />
          ):(
            <View className= "flex items-center" style={{top: hp(30)}}> 
              <ActivityIndicator size="large" />
            </View>
          )
        }

      </View>
    </SafeAreaView>
    
  );
};

export default Chat;
