import React, { useLayoutEffect, useState } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { View, TextInput } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { AntDesign, Feather } from "@expo/vector-icons"
import { StatusBar } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { ScrollView } from 'react-native'
import { StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native'
import { Keyboard } from 'react-native'
import { auth, db } from '../firebase'
import firebase from 'firebase/app'

const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View style={{ 
                    flexDirection: "row",
                    alignItems: "center", 
                    }}
                    >
                    <Avatar rounded source={{ 
                        uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                     }} />
                    <TextInput
                    style={{ color: "white", marginLeft: 10, fontWeight: "700" }}
                    >
                         { route.params.chatName }
                    </TextInput>
                </View>
            ),

            headerLeft: () => (
                <TouchableOpacity onPress={navigation.goBack} activeOpacity={0.5}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{ marginRight: 10, width: 80, flexDirection: 'row', justifyContent: "space-between" }}>
                    <TouchableOpacity onPress={navigation.goBack} activeOpacity={0.5}>
                        <AntDesign name="videocamera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigation.goBack} activeOpacity={0.5}>
                        <AntDesign name="phone" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            ),
        })
    }, [navigation])

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        setInput('');
    };

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => setMessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
        ));
        return unsubscribe;
    }, [route])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.contain}
            keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView>{}</ScrollView>
                        <View style={styles.footer}>
                            <TextInput onSubmitEditing={sendMessage} value={input} onChangeText={(text) => setInput(text)} placeholder="Write a message" style={styles.textInput} />
                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                <Feather name="send" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    contain: {
        flex: 1,
    },
    footer: {
        flexDirection: "row",
        alignItems: 'center',
        width: "100%",
        padding: 15
,    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        borderRadius: 5,
        padding: 10,
        color: "grey",
    },
});