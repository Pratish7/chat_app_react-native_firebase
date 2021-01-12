import { StyleSheet } from "react-native";
import colors from '../../utility/colors/colors';

export default StyleSheet.create({
  cardStyle: {
    backgroundColor: colors.OFF_WHITE
  },
  cardItemStyle: {
    backgroundColor: colors.OFF_WHITE,
  },

  logoContainer: {
    height: 60,
    width: 60,
    borderColor: colors.WHITE,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.DARK_BLUE,
  },
  thumbnailName: { fontSize: 30, color: colors.WHITE, fontWeight: "bold" },
  profileName: { fontSize: 20, color: colors.BLACK, fontWeight: "bold" },
});