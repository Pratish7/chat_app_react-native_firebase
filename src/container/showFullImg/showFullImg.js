import React, { useLayoutEffect, Fragment } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import globalStyle from '../../utility/style/globalStyle';
import colors from '../../utility/colors/colors'

const ShowFullImg = ({ route, navigation }) => {
    const { params } = route;
    const { img, imgText } = params;
    useLayoutEffect(() => {
        navigation.setOptions({
            showHeaderTop: false
        });
    }, [navigation]);
    return (
        <Fragment>
            {img ? (
                <Image
                    source={{ uri: img }}
                    style={[globalStyle.flex1]}
                    resizeMode="cover"
                />
            ) : (
                    <View
                        style={[
                            globalStyle.containerCentered,
                            { backgroundColor: colors.BLACK },
                        ]}
                    >
                        <Text style={styles.text}>{imgText}</Text>
                    </View>
                )}
        </Fragment>
    );
};

const styles = StyleSheet.create({
    text: { color: colors.WHITE, fontSize: 200, fontWeight: "bold" },
});

export default ShowFullImg;