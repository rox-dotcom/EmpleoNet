import { View, Text, SafeAreaView, FlatList, Image } from 'react-native'
import React from 'react'

import logo from '../../assets/images/logito.png'
import SearchInput from '../../components/SearchInput'

const Home = () => {
  return (
    <>
    <SafeAreaView className="bg-secondary-100">
      <FlatList 
          data={[{ id: 1 }, { id: 2 }, { id: 3 },]}
          keyExtractor={(item) => item.$id}
          renderItem={({item}) => (
            <Text className="text-3xl">{item.id}</Text>
          )}
          ListHeaderComponent={()=> (
            <View className="my-6 px-4 space-y-5">
              <View className="justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Bienvenido de vuelta
                  </Text>
                  <Text className="text-2xl font-psemibold text-white">
                    Fulanito!
                  </Text>
                </View>

                <View className="mt-1.5">
                  <Image 
                    source={logo}
                    className= "w-25 h-20"
                    resizeMode='contain'
                  />
                  
                </View>
                

              </View>
              
              <SearchInput />
              <View className= "w-full flex-1 pt-5 pb-8">
                <Text className="text-gray-100 tect-lg font-pregular mb-3">
                  Tenemos lo que buscas
                </Text>

              </View>

            </View>
          )}

      />
    </SafeAreaView>
    </>
  )
}

export default Home