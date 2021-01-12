import firebase from '../../firebase/firebase';

export const sentMsg = async (msgValue, currentUserId, guestUserId, imgUri) => {
  try {
    return await firebase
      .database()
      .ref('messages/' + currentUserId)
      .child(guestUserId)
      .push({
        message: {
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          img: imgUri
        }

      })
  } catch (error) {
    alert(error);

  }
};

export const recievedMsg = async (msgValue, currentUserId, guestUserId, imgUri) => {
  try {
    return await firebase
      .database()
      .ref('messages/' + guestUserId)
      .child(currentUserId)
      .push({
        message: {
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          img: imgUri
        }

      })
  } catch (error) {
    alert(error);

  }
};
