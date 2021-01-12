import React from "react";
import { View, Text, Image } from "react-native";
import { Card, CardItem } from "native-base";
import deviceDimensions from '../../utility/style/appStyle';
import { uuid } from '../../utility/constants/constants';
import styles from "./styles";
import colors from "../../utility/colors/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import appStyle from "../../utility/style/appStyle";

const ChatBox = ({ userId, msg, img, onImgTap }) => {
  let isCurrentUser = userId === uuid ? true : false;
  return (
    <Card
      transparent
      style={{
        maxWidth: appStyle.deviceDimensions.width / 2 + 10,
        alignSelf: isCurrentUser ? "flex-end" : "flex-start",
      }}
    >
      <View
        style={[
          styles.chatContainer,
          isCurrentUser && {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 0,
            backgroundColor: colors.BLUE,
          },
        ]}
      >
        {img ? (
          <CardItem cardBody>
            <TouchableOpacity onPress={onImgTap}>
              <Image
                source={{ uri: img }}
                resizeMode="cover"
                style={{ height: 200, width: appStyle.deviceDimensions.width / 2 }}
              />
            </TouchableOpacity>
          </CardItem>
        ) : (
          <Text
            style={[styles.chatTxt, isCurrentUser && { color: colors.WHITE }]}
          >
            {msg}
          </Text>
        )}
      </View>
    </Card>
  );
};

export default ChatBox;