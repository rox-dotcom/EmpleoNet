import { Image, View, Text, TextInput, Touchable, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const SearchInput = ({title, value, placeholder, handleChangeText, 
  otherStyles, ...props}) => {
    const [showPassword, setshowPassword] = useState(false)
  return (

      <View className="rounded-2xl w-full h-16 px-4 bg-secondary-300 
      items-center flex-row space-x-4">

        <TextInput 
          className= "text-base mt-0.5 text-white flex-1 font-pregular"
          value={value}
          placeholder="Busca un provedor de servicios"
          placeholderTextColor="#adabac"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />

        <TouchableOpacity>
            <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>

      </View>
  )
}

export default SearchInput