import { StyleSheet } from "react-native";
import colors from "../../utility/colors/colors";

export default StyleSheet.create({
  chatContainer: { backgroundColor: colors.DARK_BLUE, borderTopRightRadius: 20 },
  chatTxt: {
    color: colors.WHITE,
    fontSize: 18,
    marginVertical: 5,
    fontWeight: "500",
    padding: 8,
  },
});