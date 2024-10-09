import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.team24.empleonet',
    projectId: '66eb49e10016630d1695',
    databaseId: '66eb4c46002ef9cbfd0f',
    userCollectionId: '66eb4cb20007d2d6b4a5',
    serviceCollectionId: '66eb4cfe00018329e46c',
    proveedorCollectionId: '66eda5d6000dd3625a61',
    serviceHistoryId: '67061f7a0014a3f9beeb',
    storageId: '66eb4ec2003a660dd5a6'
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    proveedorCollectionId,
    serviceCollectionId,
    serviceHistoryId,
    storageId
} = config;


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId)
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const storage = new Storage(client);
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
        
        const avatarUrl = avatars.getInitials(username); 
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
        );
        
        return newUser;
    }catch(error){
        console.log(error);
        throw new Error(error)
    }
}

//Sign In
export const signIn = async(email,password) => {

    try{
        const session = await account.createEmailPasswordSession(email, password)
        
        return session;
    }catch(error){
        throw new Error(error);
    }
    
}

export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
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
        return null;
        
    }
}

export const signOut = async () =>{
    try {
        const session = await account.deleteSession('current');

        return session;
    } catch (error) {
        throw new Error(error)
    }
}
// Function to check if there is an active session

export const checkActiveSession = async () => {
    try {
      const session = await account.getSession('current'); // Get the current session
      return session !== null; // Return true if there is an active session
    } catch (error) {
      // If there's an error (e.g., no active session), handle it appropriately
      if (error.code === 401) {
        return false; // No active session
      }
      throw error; // Re-throw other unexpected errors
    }
  };
  
  
  // Function to delete all sessions for the current user
  
  export const deleteSessions = async () => {
    try {
      // Get the list of all sessions
      const sessions = await account.listSessions();
  
      // Delete each session
      await Promise.all(
        sessions.sessions.map(async (session) => {
          await account.deleteSession(session.$id);
        })
      );
  
      console.log('All sessions deleted successfully');
    } catch (error) {
      console.error('Error deleting sessions:', error.message);
      throw error; // Re-throw the error for further handling
    }
  };


//get posts From 
export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            serviceCollectionId
        )
        
        return posts.documents;
    } catch (error) {
        throw new Error(error);
        
    }
}


export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
          databaseId,
          serviceCollectionId,
          [Query.search('title', query)]
        )

        return posts.documents
    } catch (error) {
      throw new Error(error)
    }
}

export const getUserService = async (userId) => {
  try {

    const posts = await databases.listDocuments(
        databaseId,
        serviceHistoryId,
        [Query.equal('user', userId)],

      )
      console.log(posts.documents);

      return posts.documents
  } catch (error) {
    throw new Error(error)
  }
}