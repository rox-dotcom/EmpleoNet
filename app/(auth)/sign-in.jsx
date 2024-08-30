import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import logo from '../../assets/images/logito.png'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  return (
    <SafeAreaView className= "bg-secondary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
        <Image
            source={logo}
            className= "w-[115px] h-[100px]"
            resizeMode='contain'
          />
           <Text className= "text-xl font-psemibold text-white"> 
            Inicia Sesion en EmpleoNet
           </Text>
           <Text className= "text-l font-pmedium text-white mt-1">para buscar un servicio</Text>
          
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
          <CustomButton 
            title={"Acceder"}
            handlePress={() => router.push('/home')}
            containerStyles= "w-full mt-7 w-32"
          />
        </View>  
          
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn