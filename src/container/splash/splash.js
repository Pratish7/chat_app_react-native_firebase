import React, { useEffect } from 'react';
import { View } from 'react-native';
import { getAsyncStorage, keys } from '../../asyncStorage/async';
import Logo from '../../component/logo/logo';
import colors from '../../utility/colors/colors';
import { setUniqueValue } from '../../utility/constants/constants';
import globalStyle from '../../utility/style/globalStyle';

const Splash = ({ navigation }) => {
    useEffect(() => {
        const redirect = setTimeout(() => {
            getAsyncStorage(keys.uuid)
                .then((uuid) => {
                    if (uuid) {
                        setUniqueValue(uuid);
                        navigation.replace('Dashboard');
                    }
                    else navigation.replace('Login');
                })
                .catch((err) => {
                    console.log(err);
                    navigation.replace('Login');
                });
        }, 3000);
        return () => clearTimeout(redirect);
    }, [navigation]);
    return (
        <View style={[globalStyle.containerCentered, { backgroundColor: colors.BLACK }]}>
            <Logo />
        </View>
    );
}

export default Splash;