import React from 'react'
import { useState, useEffect } from 'react';
import { StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { Button, Input,  Image} from 'react-native-elements';
import { KeyboardAvoidingView } from 'react-native';
import { auth } from "../firebase";

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home");
            }
        })
        return unsubscribe;
    }, []);
    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
        .catch((error) => alert(error));
    };

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light" />
            <Image
            source={{ uri: "http://doucetech.co.zw/images/logo.png" }}
            style={{ width: 220, height: 75 }}
            PlaceholderContent={<ActivityIndicator />}
            />
            <View>
            <Input
            containerStyle={styles.inputContainer} 
            placeholder='Email'
            type="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            errorStyle={{ color: 'red' }}
            />

            <Input 
            containerStyle={styles.inputContainer} 
            placeholder="Password" 
            secureTextEntry={true}
            value={password}
            type="password"
            onChangeText={(text) => setPassword(text)}
            errorStyle={{ color: 'red' }}
            onSubmitEditing={signIn}
            />
            </View>

            <Button 
            containerStyle={styles.button} 
            onPress={signIn}
            title="Login" 
            />
            <Text h3 style={{ margin: 10, color: 'black' }}>OR</Text>
            <Button
            containerStyle={styles.button}
            icon={
            <Icon name="arrow-right" size={15} color="white"/>
            }
            onPress={() => navigation.navigate('Register')}
            type="outline"
            title="Register"
            />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: 300,
        marginTop: 10,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
});