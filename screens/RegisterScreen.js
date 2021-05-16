import React, { useLayoutEffect } from 'react'
import { useState } from 'react';
import { StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { Button, Input,  Image} from 'react-native-elements';
import { KeyboardAvoidingView } from 'react-native';
import { auth } from "../firebase";

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    // const [passwordConfirm, setPasswordConfirm] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login",
        });
    }, [navigation])

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL:
                imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            })
        }).catch((error) => alert(error.message));
    };


    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ margin: 10, color: 'black' }}>Register a free account</Text>
            <View>
            <Input
            containerStyle={styles.inputContainer} 
            placeholder='Name'
            type="text"
            type="name"
            value={name}
            onChangeText={(text) => setName(text)}
            errorStyle={{ color: 'red' }}
            />

            <Input
            containerStyle={styles.inputContainer} 
            placeholder='Email'
            type="email"
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
            />

            {/* <Input 
            containerStyle={styles.inputContainer} 
            placeholder="Password Confirmation" 
            secureTextEntry={true}
            value={passwordConfirm}
            type="password"
            onChangeText={(text) => setPasswordConfirm(text)}
            errorStyle={{ color: 'red' }}
            /> */}

             <Input 
            containerStyle={styles.inputContainer} 
            placeholder="Profile" 
            value={imageUrl}
            type="text"
            onChangeText={(text) => setImageUrl(text)}
            errorStyle={{ color: 'red' }}
            onSubmitEditing={register}
            />
            </View>

            <Button 
            title="Register" 
            containerStyle={styles.button} 
            onPress={register}
            raised
            />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

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
        backgroundColor: "red",
        color: "white",
    },
});