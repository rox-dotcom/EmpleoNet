import { View, Text, SafeAreaView, FlatList, Image, RefreshControl, Alert } from 'react-native'
import {useEffect} from 'react'
import SearchInput from '../../components/SearchInput'
import { searchPosts } from '../../lib/appwrite'
import useAppwerite from '../../lib/useAppwrite'
import ServiceCard from '../../components/ServiceCard'
import { useLocalSearchParams } from 'expo-router'
import EmptyState from '../../components/EmptyState'



const Search = () => {
  const {query} = useLocalSearchParams()
  const {data: posts, refetch } = useAppwerite(() => searchPosts(query));

  useEffect(() =>{
    refetch()
  }, [query])
  
  //console.log(posts);
  return (
    <>
    <SafeAreaView className="bg-secondary-100 h-full">
      <FlatList 
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({item}) => (
            <ServiceCard service={item}/>
          )}
          ListHeaderComponent={()=> (
            <View className="my-6 px-4 ">
                  <Text className="font-pmedium text-sm text-gray-100">
                    Resultados de la búsqueda...
                  </Text>
                  <Text className="text-2xl font-psemibold text-white">
                    {query}
                  </Text>
                  
                  <View className="mt-6 mb-8">
                      <SearchInput initialQuery={query}/>
                  </View>

                     
              </View>
              
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title= "No hay resultados..." 
              subtitle= "Todavía no ofrecemos esos servicios"
            />
          )}
          
      />
    </SafeAreaView>
    </>
  )
}

export default Search