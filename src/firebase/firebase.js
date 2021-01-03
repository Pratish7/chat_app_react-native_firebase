import Firebase from 'firebase';
import data from './details'

const firebaseConfig = {
    apiKey: data.apikey,
    databaseURL: data.databseURL,
    projectId: data.projectID,
    appId: data.appId
};

export default Firebase.initializeApp(firebaseConfig);