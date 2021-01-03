import firebase from '../firebase/firebase';

const loginRequest = async (email, password) => {
    try {
        return await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
        return error;
    }
};

export default loginRequest;