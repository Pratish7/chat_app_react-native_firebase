import Firebase from 'firebase';
import data from './details'

const firebaseConfig = {
    apiKey: 'AIzaSyAzT8U45Nfn6cw-seC71Ux5WScVdYGtr9s',
    databaseURL: 'https://firechat-e1629-default-rtdb.firebaseio.com/',
    projectId: 'firechat-e1629',
    appId: '1:1032657147261:android:7d5a0e7bb2ae571c76a814'
};

export default Firebase.initializeApp(firebaseConfig);