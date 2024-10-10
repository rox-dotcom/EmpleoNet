import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ChatScreen from '../screen/ChatScreen'
import MessageScreen from '../screen/MessageScreen'
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TabsLayout = () => {
  return (
    <Tabs 
      screenOptions={{ 
      tabBarActiveTintColor: '#CEE5F2',
      tabBarStyle: {
        backgroundColor: '#1E1E48',
        borderTopWidth: 1,
        borderTopColor: '#CEE5F2'
      }, 

      
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name= "inbox" color={color} />, 
          headerLeft: () => (
            <TouchableOpacity className= 'ml-3'>
              <Ionicons
                name="ellipsis-horizontal-outline"
                size={30}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'User',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}

const MessageStack = ({navigation}) => (
  <Stack.Navigator>
      <Stack.Screen name='Messages' component={MessageScreen} />
      <Stack.Screen name='Chat' component={ChatScreen}/>

  </Stack.Navigator>
);

export default TabsLayout