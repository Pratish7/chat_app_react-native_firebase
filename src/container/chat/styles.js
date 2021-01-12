import { StyleSheet } from "react-native";
import appStyle from "../../utility/style/appStyle";
import colors from '../../utility/colors/colors'
import { Colors } from "react-native/Libraries/NewAppScreen";

export default StyleSheet.create({
  sendMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    
    
  },
  input: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: "70%",
    borderTopColor: colors.BLUE,
    borderBottomColor: colors.BLUE,
    borderLeftColor: colors.BLUE,
    borderWidth: 2,
    backgroundColor: null,
    color: Colors.BLACK
  },

  sendBtnContainer: {
    height: appStyle.fieldHeight,
    backgroundColor: null,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopColor: colors.BLUE,
    borderBottomColor: colors.BLUE,
    borderRightColor: colors.BLUE,
    borderLeftColor:null,
    borderLeftWidth: 0,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    width: "30%",
  },
});