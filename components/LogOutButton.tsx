import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Button, View } from 'react-native';
import { AuthContext } from './context';
import { useNavigation } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();

const LogOutButton = () => {    
    const navigation = useNavigation();
    const { signOut } = React.useContext(AuthContext);

    return (
        <View style={styles.button}>
            <Button
            title={'Logout'}
            onPress={() => {
                navigation.navigate('Login')
                // {signOut()}
                }}
            color="#1DB954"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        marginRight: 10
    }
  });

export default LogOutButton