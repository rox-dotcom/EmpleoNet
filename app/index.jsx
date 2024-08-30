import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import logo from '../assets/images/logito.png'
import CustomButton from '../components/CustomButton';

export default function App() {
  return (
    
    <SafeAreaView className= "bg-secondary h-full">
      <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View className= "w-full items-center px-4"> 

          <Image
            source={logo}
            className= "w-[700px] h-[150px]"
            resizeMode='contain'
          />

        </View>

        <View className= "relative mt-5">
          <Text className= "text-2xl text-white font-pmedium text-center">
          Bienvenido a EmpleoNet!
          </Text>
          
        </View>

        <View >
          <CustomButton 
            title= "Sign in"
            handlePress={() => router.push('/sign-in')}
            containerStyles= "w-full mt-7 w-32"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#46739D'
      style='black'/>

    </SafeAreaView>
  );
}

