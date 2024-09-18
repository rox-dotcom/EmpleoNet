import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react'
import icons from '../constants/icons'


const FormField = ({
  title, 
  value, 
  placeholder, 
  handleChangeText, 
  otherStyles, 
  ...props}) => {
    const [showPassword, setShowPassword] = useState(false)
  
    return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className= "text-base text-gray-100 fonr-pmedium">
        {title}</Text>
      <View className="rounded-2xl w-full h-16 px-4 bg-blue-200 items-center flex-row">

        <TextInput 
          className= "flex-1 text-black font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.view : icons.hide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        

      </View>
    </View>
  )
}

export default FormField