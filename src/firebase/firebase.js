import firebase from 'firebase';
import data from './details'

const firebaseConfig = {
    apikey: data.apikey,
    databseURL: data.databseURL,
    projectID: data.projectID,
    appId: data.appId
};

export default firebase.initializeApp(firebaseConfig);