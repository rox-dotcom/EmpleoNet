import { View, Text, SafeAreaView, FlatList, Image, RefreshControl, Alert } from 'react-native'
import {useEffect, useState} from 'react'
import logo from '../../assets/images/logito.png'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import { getAllPosts } from '../../lib/appwrite'
import useAppwerite from '../../lib/useAppwrite'
import ServiceCard from '../../components/ServiceCard'



const Home = () => {
  const {data: posts, refetch, } = useAppwerite(getAllPosts);

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }
  
  //console.log(posts);
  return (
    <>
    <SafeAreaView className="bg-secondary-100">
      <FlatList 
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({item}) => (
            <ServiceCard service={item}/>
          )}
          ListHeaderComponent={()=> (
            <View className="my-6 px-4 space-y-5">
              <View className=" items-start flex-row mb-6">
              
              <View className="mt-1.5">
                  <Image 
                    source={logo}
                    className= "w-20 h-20"
                    resizeMode='contain'
                  />
                  
                </View>

                <View  className="mt-4 ml-5 ">
                  <Text className="font-pmedium text-sm text-gray-100">
                    Bienvenido de vuelta
                  </Text>
                  <Text className="text-2xl font-psemibold text-white">
                    Fulanito!
                  </Text>
                </View>
                
              </View>

              <SearchInput />
              <View className= "w-full flex-1 pt-2 pb-3">
                <Text className="text-gray-100 text-lg font-pregular">
                  Conoce nuestros servicios...
                </Text>
                {/*<Trending posts={[{id:1},{id:2},{id:3}] ?? []}/>*/}
              </View>
            </View>
          )}
          
          refreshControl={<RefreshControl refreshing= {refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
    </>
  )
}

export default Home