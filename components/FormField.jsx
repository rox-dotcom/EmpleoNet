import { View, Text, TextInput } from 'react-native'
import { useState } from 'react'

const FormField = ({title, value, placeholder, handleChangeText, 
  otherStyles, ...props}) => {
    const [showPassword, setshowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className= "text-base text-gray-100 fonr-pmedium">
        {title}</Text>
      <View className="rounded-2xl w-full h-16 px-4 bg-blue-100 border-2 focus:border-primary items-center">

        <TextInput 
          className= "flex-1 text-black font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />
      </View>
    </View>
  )
}

export default FormField