import { View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router, usePathname } from 'expo-router';

const SearchInput = ({initialQuery}) => {
    const pathname = usePathname()
    const [query, setQuery] = useState(initialQuery || '')
    
  return (
      
      <View className="rounded-2xl w-full h-16 px-4 bg-secondary-300 
      items-center flex-row space-x-4">

        <TextInput 
          className= "text-base mt-0.5 text-white flex-1 font-pregular"
          value={query}
          placeholder="Busca un provedor de servicios"
          placeholderTextColor="#ffffff"
          onChangeText={(e) => setQuery(e)}
        />

        <TouchableOpacity 
          onPress={()=> {
            if(!query){
              
              return Alert.alert('Missing query', 'Por favor ingresa algo para buscar')
            }
            if(pathname.startsWith('/search')) router.setParams({ query })
            else router.push(`/search/${query}`)  
          }}
        >
            <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>

      </View>
  )
}

export default SearchInput