import { SafeAreaView, Text, View, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import {useState} from 'react'

import coser from '../../assets/images/coser.jpg'
import carpo from '../../assets/images/carpi.jpg'
import { useGlobalContext } from '../../context/GlobalProvider';
import icons from '../../constants/icons'
import InfoBox from '../../components/InfoBox';
import { signOut } from '../../lib/appwrite';

import {router} from 'expo-router'

const Profile = () => {

  const {user, setUser, setIsLogged} = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  return (
    <>
    <SafeAreaView className="bg-secondary-100 h-full">
      <FlatList 
        ListHeaderComponent={()=> (
          <View className= "w-full justify-center items-center mt-6 mb-12 px-6">
              <TouchableOpacity 
                onPress={logout}
                className="w-full items-end mb-10"
                
                >
                <Image 
                  source={icons.logout}
                  resizeMode='contain'
                  className= "w-6 h-6"
                />
              </TouchableOpacity>
              <View className= "w-16 h-16 border boder-secondary rounded-lg justify-center items-center">
                <Image 
                  source={{uri: user?.avatar}}
                  className = "w-[90%] h-[90%] rounded-lg"
                  resizeMode='cover'
                />
              </View>

              <InfoBox 
                title={user?.username || "UserName"}
                containerStyles='mt-5'
                titleStyles='text-lg'
              />

              {/*<View className="mt-5 flex-row">
                <InfoBox 
                  title = {user?.username}
                  containerStyles='mt-5'
                  titleStyles = 'text-lg'
                />
              </View>*/}
          </View>
        )}
      
      />
        
      
      <ScrollView>
      <View className="flex-1 justify-center items-center">
        <Text className="text-white font-pregular">Servicios previamente adquiridos</Text>
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