import React, { useLayoutEffect, useState } from 'react'
import { View } from 'react-native'
import { StyleSheet} from 'react-native';
import { Button, Input,  Image} from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { db } from '../firebase';

const AddChatScreen = ({ navigation }) => {

    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add new chat",
            headerBackTitle: "Chats",
        });
    }, [])

    const createChat = async () => {
        await db.collection("chats")
        .add({
            chatName: input,
        }).then(() => {
            navigation.goBack();
        }).catch((error) => alert(error));
    };


    return (
        <View style={styles.container}>
            <Input
            placeholder="Search contact name"
            value={input}
            onChangeText={(text) => setInput(text)}
            leftIcon={
                <Icon name="wechat" type="antdesign" size={24} color="black" />
            }
            onSubmitEditing={createChat}
            />
            <Button onPress={createChat} title="Start a chat" />
        </View>
    )
}

export default AddChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 30,
        height: "100%",
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
