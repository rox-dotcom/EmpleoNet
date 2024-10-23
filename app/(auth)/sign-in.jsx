import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import images from '../../constants/images'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { getCurrentUser, signIn,  checkActiveSession, deleteSessions} from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider';
import CustomKeyboardView from '../../components/CustomKeyboardView'

const SignIn = () => {
  //this value helps us determine which user is logged
  const {setUser, setIsLogged} = useGlobalContext()
  const [isSubmitting, setIsSubmitting] = useState(false) //when clicks button

  const [form, setForm] = useState({
    email: '',
    password: ''
  })


const submit = async () => {
    //check if all the info is in the form
    if(!form.email ||!form.password)
    {
      Alert.alert('Error', 'Toda la información es necesaria')
      return;
    }

    setIsSubmitting(true);
    try {
      //Check for active sessions
      const activeSession = await checkActiveSession();
      
      //delete if theres an active session
      if (activeSession) {
        await deleteSessions();
      }

      //proceed with sing-in
      await signIn(form.email, form.password) //talks to db
      const result = await getCurrentUser();
      
      setUser(result);
      setIsLogged(true);

      Alert.alert("Suceess","We are logged in!!")
      router.replace('/home')

    } catch (error) {
      Alert.alert('Error', error.message)
      
    }finally{
      setIsSubmitting(false)

    }
  }

  return (
    <SafeAreaView className= "bg-secondary h-full">
      <CustomKeyboardView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <View className='items-center'>
            <Image
              source={images.logob}
              className= 'w-[200px] h-[150px] '
              resizeMode='contain'
            />
            <Text className= "text-xl font-psemibold text-white"> 
              Inicia Sesion en EmpleoNet
            </Text>
            <Text className= "text-l font-pmedium text-white mt-1">para buscar un servicio</Text>
          </View>
          
          <FormField 
            title= "Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form,
              email: e })}
            otherStyles= "mt-7"
            keyboardType= "email-address"
          />
          
          <FormField 
            title= "Password"
            value={form.password}
            handleChangeText={(p) => setForm({...form,
              password: p })}
            otherStyles= "mt-7"
          />
          <View className="items-center">
            
            <CustomButton 
            title={"Acceder"}
            handlePress={submit}
            containerStyles= "w-full mt-7 w-32"
            isLoading={isSubmitting}
            />

            <View className='items-center'>
              <Text className='mt-3 font-pregular text-white'>¿No tienes cuenta?</Text>
              <Link href={'../sign-up'} className='mt-1 font-pbold text-blue opacity-60'>Registrate</Link>
            </View>
          </View>
          
        </View>  
      </CustomKeyboardView>
      
    </SafeAreaView>
  )
}

export default SignIn