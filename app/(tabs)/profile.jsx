import { SafeAreaView, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import coser from '../../assets/images/coser.jpg'
import carpo from '../../assets/images/carpi.jpg'

const Profile = () => {
  return (
    <>
    <SafeAreaView className="bg-secondary-100 h-full">
      <ScrollView>
      <View className="flex-1 ml-3 mt-5">
        <View className= "flex-row p-4">
          <FontAwesome5 name="user-alt" size={50} color="white" />
          <Text className="mt-5 ml-5 text-center text-white font-pmedium text-2xl">
            Fulanito Gonzalez
          </Text>
        </View>
      </View>
      <View>
        <Text className="text-white mt-5 ml-2 text-m">
          Servicios previamente adquiridos
        </Text>

      </View>
      <View className="flex-1 justify-center items-center">
        <View className="flex-row items-center p-4">
          <Image 
              source={coser}
              className="w-60 h-60 mt-5"
              resizeMode='contain'
            />
            <View className="flex-col space-y-4">
              <Text className= " text-lg text-white font-plight text-xl">
                Costurera        
              </Text>
              <Text className= " text-white font-plight text-sm">
                Servicio de costura   
              </Text> 
              <Text className= " text-white font-plight text-sm"> en Zapopan </Text>
            </View>            
        </View>

        <View className="flex-row items-center p-4">
          <Image 
              source={carpo}
              className="w-60 h-60 mt-5"
              resizeMode='contain'
            />
            <View className=" ml-2 flex-col space-y-4">
              <Text className= " text-lg text-white font-plight text-xl">
                Carpintero        
              </Text>
              <Text className= " text-white font-plight text-sm">
                10 años de experiencia
              </Text> 
              <Text className= " text-white font-plight text-sm"> en Guadalajara </Text>
            </View>
            
            
        </View>        
      </View>
      </ScrollView>
    </SafeAreaView>
    </>
  )
}

export default Profile
