import React, { useLayoutEffect, useState, useEffect, Fragment } from "react";
import { StyleSheet, View, Text, TextInput, SafeAreaView, FlatList, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, PermissionsAndroid, StatusBar } from "react-native";
import * as ImagePicker from "react-native-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import globalStyle from '../../utility/style/globalStyle';
import colors from '../../utility/colors/colors';
import appStyle from '../../utility/style/appStyle';
import styles from "./styles";
import InputField from '../../component/input/input'
import ChatBox from "../../component/chatBox/chatBox";
import firebase from "../../firebase/firebase";
import { sentMsg, recievedMsg } from '../../network/message/message'
import { smallDeviceHeight } from "../../utility/constants/constants";
import uploadImage from '../../network/message/image'

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
          let msgs = [];
          dataSnapshot.forEach((child) => {
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

      recievedMsg(msgValue, currentUserId, guestUserId, "")
        .then(() => { })
        .catch((err) => alert(err));
    }
  };

  const handleCamera = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "App needs to access your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        ImagePicker.launchCamera(options, (response) => {
          console.log(response);
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            uploadImage(response.uri, response.fileName, currentUserId, guestUserId)
              .then((data) => {
                if (data.uploadState === 'success') {
                  sentMsg('', currentUserId, guestUserId, data.downloadUrl)
                    .then(() => { })
                    .catch((err) => { alert(err) })

                  recievedMsg('', currentUserId, guestUserId, data.downloadUrl)
                    .then(() => { })
                    .catch((err) => { alert(err) })
                }
              })
              .catch((err) => { alert(err) })
          }
        });
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };


  const handleGallery = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };


    ImagePicker.launchImageLibrary(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        uploadImage(response.uri, response.fileName, currentUserId, guestUserId)
          .then((data) => {
            if (data.uploadState === 'success') {
              sentMsg('', currentUserId, guestUserId, data.downloadUrl)
                .then(() => { })
                .catch((err) => { alert(err) })

              recievedMsg('', currentUserId, guestUserId, data.downloadUrl)
                .then(() => { })
                .catch((err) => { alert(err) })
            }
          })
          .catch((err) => { alert(err) })
      }
    });

  }

  const handleOnChange = (text) => {
    setMsgValue(text);
  };


  const imgTap = (chatImg) => {
    navigation.navigate("ShowFullImg", { img: chatImg });
  };

  return (
    <SafeAreaView style={[globalStyle.flex1, { backgroundColor: colors.WHITE }]}>
      <StatusBar backgroundColor={colors.DARK_BLUE} barStyle="light-content" />
      <KeyboardAvoidingView
        keyboardVerticalOffset={appStyle.deviceDimensions.height > smallDeviceHeight ? 100 : 70}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[globalStyle.flex1, { backgroundColor: colors.WHITE }]}
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

            <View style={styles.sendMessageContainer}>
              <TextInput
                style={inputstyles.input}
                placeholder="Type Here"
                numberOfLines={10}
                inputStyle={[styles.input, { color: colors.BLACK }]}
                value={msgValue}
                onChangeText={(text) => handleOnChange(text)}
              />
              <View style={styles.sendBtnContainer}>
                <MaterialCommunityIcons
                  name="camera"
                  color={colors.BLUE}
                  size={appStyle.fieldHeight}
                  onPress={() => handleCamera()}
                />
                <MaterialCommunityIcons
                  name="image"
                  color={colors.BLUE}
                  size={appStyle.fieldHeight}
                  onPress={() => handleGallery()}
                />
                <MaterialCommunityIcons
                  name="send"
                  color={colors.BLUE}
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

const inputstyles = StyleSheet.create({
  input: {
    borderColor: colors.BLUE,
    borderWidth: 2,
    borderRadius: 10,
    borderRightWidth: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    paddingLeft: 16,
    backgroundColor: null,
    width: "70%",
    color: appStyle.fieldTextColor,
    height: appStyle.fieldHeight,
    alignSelf: "center",
    marginVertical: appStyle.fieldMarginVertical,
    fontSize: 16,
  }
});

export default Chat;