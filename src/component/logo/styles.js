import { StyleSheet } from "react-native";
import colors from '../../utility/colors/colors';
import appStyle from '../../utility/style/appStyle';
import smallDeviceHeight from '../../utility/constants/constants';

const getDimensions = () => {
    if (appStyle.deviceDimensions > smallDeviceHeight) {
        return {
            height: 150,
            width: 150,
            borderRadius: 50,
            logoFontSize: 90,
        };
    } else {
        return {
            height: 120,
            width: 120,
            borderRadius: 40,
            logoFontSize: 70,
        };
    }
};

export default StyleSheet.create({
    logo: {
        height: getDimensions().height,
        width: getDimensions().width,
        borderRadius: getDimensions().borderRadius,
        backgroundColor: colors.DARK_GRAY,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: getDimensions().logoFontSize,
        fontWeight: "bold",
        color: colors.WHITE,
    },
});