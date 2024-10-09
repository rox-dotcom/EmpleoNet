import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import images from '../../constants/images'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import  { createUser }  from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider';

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  

  const submit = async () => {
    if(!form.username|| !form.email ||!form.password)
    {
      Alert.alert('Error', 'Toda la información es necesaria')
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username)
      
      setUser(result);
      setIsLogged(true);

      router.replace('/home')

    } catch (error) {
      Alert.alert('Error', error.message)
      
    }finally{
      setIsSubmitting(false)

    }
    createUser();

  }

  return (
    <SafeAreaView className= "bg-secondary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <View className='items-center'>
            <Image
              source={images.logob}
              className= 'w-[200px] h-[150px] '
              resizeMode='contain'
            />
            <Text className= "text-xl font-psemibold text-white"> 
              Registrate en EmpleoNet!
            </Text>
          </View>
          
          <FormField 
            title= "Username"
            value={form.username}
            handleChangeText={(e) => setForm({...form,
              username: e })}
            otherStyles= "mt-7"
          />
          
          <FormField 
            title= "Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form,
              email: e })}
            otherStyles= "mt-6"
            keyboardType= "email-address"
          />
          
          <FormField 
            title= "Password"
            value={form.password}
            handleChangeText={(p) => setForm({...form,
              password: p })}
            otherStyles= "mt-6"
          />
          <View className="items-center">
            
            <CustomButton 
            title={"Registrar"}
            handlePress={submit}
            containerStyles= "w-full mt-7 w-32"
            isLoading={isSubmitting}
            />

            <View className='items-center'>
              <Text className='mt-3 font-pregular text-white'>¿Ya tienes una cuenta?</Text>
              <Link href={'../sign-in'} className='mt-1 font-pbold text-blue opacity-60'>Inicia sesión</Link>
            </View>
          </View>
          
        </View>  
          
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp