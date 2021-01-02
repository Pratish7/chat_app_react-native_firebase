import React, { useLayoutEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import colors from '../../utility/colors/colors';

const dashboard = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <SimpleLineIcon
                    name='logout'
                    size={26}
                    color={colors.WHITE}
                    style={{ right: 10 }}
                    onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?', [
                        {
                            text: 'Yes',
                            onPress: () => alert('Logged Out')
                        },
                        {
                            text: 'No'
                        }
                    ], {
                        cancelable: false
                    })}
                />
            ),
        });
    }, [navigation])

    return (
        <View>
            <Text>Dashboard</Text>
        </View>
    );
};

export default dashboard;