import firebase from '../../firebase/firebase'
export const AddUser = async (name, email, uid, profileImage) => {
    try {
        return await firebase.database().ref('users/'+uid).set({
            name: name,
            email: email,
            uid: uid,
            profileImage: profileImage
        });
    } catch (error) {
        return error;
    }
};