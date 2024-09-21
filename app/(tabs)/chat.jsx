import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const contacts = [
  { id: '1', name: 'Ana' },
  { id: '2', name: 'Carlos' },
  { id: '3', name: 'Lucía' },
  { id: '4', name: 'Pedro' },
];

const ContactItem = ({ name }) => {
  return (
    <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
      <View className="flex-row items-center ">
        <MaterialIcons name="person-outline" size={24} color="black" />
        <Text className=" text-white ml-2 text-lg">{name}</Text>
      </View>
      <TouchableOpacity>
        <MaterialIcons name="message" size={24} color="blue" />
      </TouchableOpacity>
    </View>
  );
};

const Chat = () => {
  return (
    <SafeAreaView className="bg-secondary-100 h-full">
      <View className="flex-1 items-center justify-center">
      <Text className="text-white text-lg font-bold mb-4">Contactos</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ContactItem name={item.name} />}
      />
    </View>
    </SafeAreaView>
    
  );
};

export default Chat;
