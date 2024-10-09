import { SafeAreaView, View, Image, FlatList, TouchableOpacity } from 'react-native'
import { useGlobalContext } from '../../context/GlobalProvider';
import icons from '../../constants/icons'
import InfoBox from '../../components/InfoBox';
import { getUserService, signOut } from '../../lib/appwrite';
import EmptyState from '../../components/EmptyState';
import {router} from 'expo-router'
import useAppwerite from '../../lib/useAppwrite';
import ServiceCard from '../../components/ServiceCard';

const Profile = () => {

  const {user, setUser, setIsLogged} = useGlobalContext();
  const {data: posts} = useAppwerite(() => getUserService(user.$id))

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

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
          <View className= "w-full justify-center items-center mt-6 mb-12 px-6">
              <TouchableOpacity 
                onPress={logout}
                className="w-full items-end mb-10"
                
                >
                <Image 
                  source={icons.logout}
                  resizeMode='contain'
                  className= "w-6 h-6"
                />
              </TouchableOpacity>
              <View className= "w-16 h-16 border boder-secondary rounded-lg justify-center items-center">
                <Image 
                  source={{uri: user?.avatar}}
                  className = "w-[90%] h-[90%] rounded-lg"
                  resizeMode='cover'
                />
              </View>

              <InfoBox 
                title={user?.username || "UserName"}
                containerStyles='mt-5'
                titleStyles='text-lg'
              />

              <View className="mt-5 flex-row">
                <InfoBox 
                  title = {posts.length || 0}
                  subtitle = "Servicios adquiridos"
                  containerStyles='mt-5'
                  titleStyles = 'text-lg'
                />
              </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title= "No hay resultados..." 
            subtitle= "Todavía no pides ningún servicio"
          />
        )}
      
      />
        
      
    </SafeAreaView>
    </>
  )
}

export default Profile