import { StyleSheet } from "react-native";
import appStyle from "../../utility/style/appStyle";
import colors from '../../utility/colors/colors'

export default StyleSheet.create({
  sendMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  input: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: "70%",
  },

  sendBtnContainer: {
    height: appStyle.fieldHeight,
    backgroundColor: colors.DARK_GRAY,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    width: "29%",
  },
});