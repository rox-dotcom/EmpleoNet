import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { Link, Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import images from '../../constants/images'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = () => {

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
              email: e })}
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