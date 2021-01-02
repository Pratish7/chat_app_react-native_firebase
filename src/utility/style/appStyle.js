import { Dimensions } from "react-native";
import colors from '../colors/colors';
import smallDeviceHeight from '../constants/constants';

const deviceDimensions = { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");

const getFieldDimesions = () => {
  if (deviceHeight > smallDeviceHeight) {
    return {
      fieldHeight: 50,
      fieldMarginVertical: 10,
      btnMarginVertical: 20,
      btnBorderRadius: 10,
      btnHeight: 50,
    };
  } else {
    return {
      fieldHeight: 40,
      fieldMarginVertical: 8,
      btnMarginVertical: 16,
      btnBorderRadius: 8,
      btnHeight: 40,
    };
  }
};



const appStyle= {
  fieldBgColor: colors.DARK_GRAY,
  fieldTextColor: colors.WHITE,
  logoBgColor: colors.DARK_GRAY,
  fieldHeight: getFieldDimesions().fieldHeight,
  fieldMarginVertical: getFieldDimesions().fieldMarginVertical,
  btnMarginVertical: getFieldDimesions().btnMarginVertical,
  btnBorderRadius: getFieldDimesions().btnBorderRadius,
  btnHeight: getFieldDimesions().btnHeight,
  deviceDimensions
}

export default appStyle;