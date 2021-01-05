import React, { useLayoutEffect, useState, useEffect, Fragment } from "react";
import { View, Text, SafeAreaView, FlatList, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from "react-native";
import ImagePicker from "react-native-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import globalStyle from '../../utility/style/globalStyle';
import colors from '../../utility/colors/colors';
import appStyle from '../../utility/style/appStyle';
import styles from "./styles";
import InputField from '../../component/input/input'
import ChatBox from "../../component/chatBox/chatBox";
import firebase from "../..//firebase/firebase";
import { sentMsg, recievedMsg } from '../../network/message/message'
import { smallDeviceHeight } from "../../utility/constants/constants";

const Chat = ({ route, navigation }) => {
  const { params } = route;
  const { name, img, imgText, guestUserId, currentUserId } = params;
  const [msgValue, setMsgValue] = useState("");
  const [messages, setMessages] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: <Text>{name}</Text>,
    });
  }, [navigation]);

  useEffect(() => {
    try {
      firebase
        .database()
        .ref('messages')
        .child(currentUserId)
        .child(guestUserId)
        .on("value", (dataSnapshot) => {
          console.log(dataSnapshot.val());
          let msgs = [];
          dataSnapshot.forEach((child) => {
            console.log(child);
            msgs.push({
              sentBy: child.val().message.sender,
              recievedBy: child.val().message.reciever,
              msg: child.val().message.msg,
              img: child.val().message.img,
            });
          });
          setMessages(msgs.reverse());

        });
    } catch (error) {
      alert(error);
    }
  }, []);

  const handleSend = () => {
    setMsgValue("");
    if (msgValue) {
      sentMsg(msgValue, currentUserId, guestUserId, "")
        .then(() => { })
        .catch((err) => alert(err));

      // * guest user

      recievedMsg(msgValue, currentUserId, guestUserId, "")
        .then(() => { })
        .catch((err) => alert(err));
    }
  };

  const handleCamera = () => {
    const option = {
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(option, (response) => {
      if (response.didCancel) {
        console.log("User cancel image picker");
      } else if (response.error) {
        console.log(" image picker error", response.error);
      } else {
        // Base 64
        let source = "data:image/jpeg;base64," + response.data;

        sentMsg(msgValue, currentUserId, guestUserId, source)
          .then(() => { })
          .catch((err) => alert(err));

        // * guest user

        recievedMsg(msgValue, currentUserId, guestUserId, source)
          .then(() => { })
          .catch((err) => alert(err));
      }
    });
  };

  const handleOnChange = (text) => {
    setMsgValue(text);
  };

  //   * On image tap
  const imgTap = (chatImg) => {
    navigation.navigate("ShowFullImg", { name, img: chatImg });
  };

  return (
    <SafeAreaView style={[globalStyle.flex1, { backgroundColor: colors.BLACK }]}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={appStyle.deviceDimensions.height > smallDeviceHeight ? 100 : 70}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[globalStyle.flex1, { backgroundColor: colors.BLACK }]}
      >
        <TouchableWithoutFeedback
          style={[globalStyle.flex1]}
          onPress={Keyboard.dismiss}
        >
          <Fragment>
            <FlatList
              inverted
              data={messages}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <ChatBox
                  msg={item.msg}
                  userId={item.sentBy}
                  img={item.img}
                  onImgTap={() => imgTap(item.img)}
                />
              )}
            />

            {/* Send Message */}
            <View style={styles.sendMessageContainer}>
              <InputField
                placeholder="Type Here"
                numberOfLines={10}
                inputStyle={styles.input}
                value={msgValue}
                onChangeText={(text) => handleOnChange(text)}
              />
              <View style={styles.sendBtnContainer}>
                {/* <MaterialCommunityIcons
                  name="camera"
                  color={colors.WHITE}
                  size={appStyle.fieldHeight}
                  onPress={() => handleCamera()}
                /> */}
                <MaterialCommunityIcons
                  name="access-point"
                  color={colors.WHITE}
                  size={appStyle.fieldHeight}
                  onPress={() => handleSend()}
                />
              </View>
            </View>
          </Fragment>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;