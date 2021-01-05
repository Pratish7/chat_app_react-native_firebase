import { StyleSheet } from "react-native";
import colors from "../../utility/colors/colors";

export default StyleSheet.create({
  chatContainer: { backgroundColor: colors.WHITE, borderTopRightRadius: 20 },
  chatTxt: {
    color: colors.BLACK,
    fontSize: 18,
    marginVertical: 5,
    fontWeight: "500",
    padding: 8,
  },
});