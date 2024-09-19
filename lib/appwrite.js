import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.team24.empleonet',
    projectId: '66eb49e10016630d1695',
    databaseId: '66eb4c46002ef9cbfd0f',
    userCollectionId: '66eb4cb20007d2d6b4a5',
    serviceCollectionId: '66eb4cfe00018329e46c',
    SorageId: '66eb4ec2003a660dd5a6'
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId)
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

//Register user
export const createUser = async (email, password, username) => {
    try{
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );
        
        if(!newAccount) throw Error;
        
        const avatarUrl = avatars.getInitials(username) 
        //user profile letters

        await signIn(email, password);//creates a new session

        //register de user on database
        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl
            }
        )
        
        return newUser;
    }catch(error){
        console.log(error);
        throw new Error(error);
    }
}

//Sign In
export const signIn = async(email,password) => {
    try {
        // Cierra cualquier sesión activa
        await account.deleteSession('current');
        console.log('Sesión anterior cerrada');
      } catch (error) {
        console.log('No había sesión activa para cerrar');
      }    
    
    try{
        const session = await account.createEmailPasswordSession(email, password)
        
        return session;
    }catch(error){
        throw new Error(error);
    }
    
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId',currentAccount.$id)]
        )
        
        if(!currentUser)throw Error

        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
        
    }
}
