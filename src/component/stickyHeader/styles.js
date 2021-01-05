import { StyleSheet } from "react-native";
import colors from "../../utility/colors/colors";

export default StyleSheet.create({
  cardStyle: {
    backgroundColor: colors.SEMI_TRANSPARENT,
    borderBottomWidth: 1,
    borderColor: colors.SILVER,
  },
  cardItemStyle: {
    backgroundColor: colors.DARK_LIME_GREEN,
  },

  logoContainer: {
    height: 60,
    width: 60,
    borderColor: colors.WHITE,
    borderWidth: 2,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.DARK_GRAY,
  },
  thumbnailName: { fontSize: 30, color: colors.WHITE, fontWeight: "bold" },
  profileName: { fontSize: 20, color: colors.WHITE, fontWeight: "bold" },
});