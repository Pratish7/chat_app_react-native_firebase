import firebase from '../../firebase/firebase';

const LogOutUser = async () => {
    try {
        return await firebase.auth().signOut();
    } catch (error) {
        return error;
    }
};

export default LogOutUser;