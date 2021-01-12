import storage from '@react-native-firebase/storage'

let Url = '';
var today = new Date();
var dateTime = today.getDate() + "_" + parseInt(today.getMonth() + 1) + "_" + today.getFullYear() + "_" + today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();

const uploadImage = async (imgUri, fileName, currentUserId, guestUserId) => {
    try {
        const upload = await storage().ref('images')
            .child(currentUserId)
            .child(guestUserId)
            .child(dateTime)
            .child(fileName)
            .putFile(imgUri);
        console.log(upload.state);
        if (upload.state === 'success') {
            Url = await storage()
                .ref('images')
                .child(currentUserId)
                .child(guestUserId)
                .child(dateTime)
                .child(fileName)
                .getDownloadURL();
        }
        return {
            downloadUrl: Url,
            uploadState: upload.state
        };
    } catch (error) {
        alert(error);
    }
};

export default uploadImage;