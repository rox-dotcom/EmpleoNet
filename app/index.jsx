import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import logo from '../assets/images/logito.png'
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
  const {isLoading, isLoggedIn} = useGlobalContext();

  if(!isLoading && isLoggedIn) return <Redirect href='/home'/>

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
          <Text className= "text-l text-white font-plight text-center mt-2">
          Encuentra al experto que necesitas, al instante
          </Text>
          
        </View>

        <View >
          <CustomButton 
            title= "Sign in"
            handlePress={() => router.push('/home')}
            containerStyles= "w-full mt-7 w-32"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#46739D'
      barStyle='black'/>

    </SafeAreaView>
  );
}

