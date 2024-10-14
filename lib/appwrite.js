import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';
import {ENDPOINT_APPWRITE, 
        PLATFORM, 
        PROJECT_ID, 
        DB_ID, 
        USER_COLLECTION_ID, 
        SERVICE_COLLECTION, 
        VENDEDOR_COLLECTION,
        SERVICE_HISTORY_ID,
        STORAGE_ID,
        ROOMCHAT_ID,
        MESSAGES_COLLECTION} from '@env'
import { getRoomId } from '../utils/common';

export const config = {
    endpoint: ENDPOINT_APPWRITE,
    platform: PLATFORM,
    projectId: PROJECT_ID,
    databaseId: DB_ID,
    userCollectionId: USER_COLLECTION_ID,
    serviceCollectionId: SERVICE_COLLECTION,
    proveedorCollectionId: VENDEDOR_COLLECTION,
    roomChatId: ROOMCHAT_ID,
    messagesCollectionId: MESSAGES_COLLECTION,
    serviceHistoryId: SERVICE_HISTORY_ID,
    storageId: STORAGE_ID
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    proveedorCollectionId,
    serviceCollectionId,
    roomChatId,
    messagesCollectionId,
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
            databaseId,
            userCollectionId,
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
            databaseId,
            userCollectionId,
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

    const service = await databases.listDocuments(
        databaseId,
        serviceHistoryId,
        [Query.equal('user', userId)],

      )
      const services = service.documents.map(doc => doc.service);
      return service;
      
  } catch (error) {
    throw new Error(error)
  }
}

export const getUsersChat = async () => {
  try{
  const vendedor = await databases.listDocuments(
    databaseId,
    proveedorCollectionId


  )

  return vendedor.documents;
  }catch (error) {
  throw new Error(error);
  
}
}

export const createRoomIfNotExists = async (userId,itemId)=>{
  let roomId = getRoomId(userId, itemId)

  try {
    const response = await databases.listDocuments(
      databaseId, 
      roomChatId, [
      Query.equal('roomName', roomId),
    ]);

    if (response.documents.length > 0) {
      return response.documents[0]; // Room exists
    }

    const newRoom = await databases.createDocument(
      databaseId,          
      roomChatId,   
      'unique()',                  // Document ID (unique() will generate a unique ID)
      {      
        roomName: roomId,
        CreatedAt: new Date().toISOString(),
      }
    );
    //console.log('Chat room created:', newRoom); 
    return newRoom;
  } catch (error) {
    throw new Error(error);
  }
};

export const handleSendSMS = async (userId, itemId, message, chatRoomID) => {
  if (!message) return;

  try {
    let roomId = getRoomId(userId, itemId);
    const response = await databases.createDocument(
      databaseId,
      messagesCollectionId,
      'unique()',
      {
        body: message,
        sender: userId,
        receiver:itemId,
        chatRoomName:roomId,
        roomChat_ID: chatRoomID
      }
    )
    console.log('message created!')
    return response;
  } catch (error) {
    throw new Error('Message send failed: ' + error.message);
  }
};

export const  getAllChatroomSMS = async (roomChatID) => {
  try {
    const response = await databases.listDocuments(
      databaseId,
      messagesCollectionId,
      [
        Query.equal('roomChat_ID', roomChatID)
      ]
    );

    return response;
  } catch (error) {
    throw new Error(error);
  }
}
