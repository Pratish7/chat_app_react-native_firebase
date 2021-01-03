import React, { useLayoutEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import { clearAsyncStorage } from '../../asyncStorage/async';
import LogOutUser from '../../network/logout/logout';
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
                            onPress: () => logout()
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

    const logout = () => {
        LogOutUser()
        .then(()=>{
            clearAsyncStorage()
            .then(()=>{
                navigation.navigate('Login');
            })
            .catch((err)=>{
                alert(err);
            })
        })
        .catch((err)=>{
            alert(err);
        })
    }
    
    return (
        <View>
            <Text>Dashboard</Text>
        </View>
    );
};

export default dashboard;