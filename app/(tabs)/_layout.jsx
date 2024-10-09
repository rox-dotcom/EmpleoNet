import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TabsLayout = () => {
  return (
    
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#CEE5F2',
      tabBarStyle: {
        backgroundColor: '#1E1E48',
        borderTopWidth: 1,
        borderTopColor: '#CEE5F2'
      }
      
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
          title: 'Messages',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name= "inbox" color={color} />,
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

export default TabsLayout