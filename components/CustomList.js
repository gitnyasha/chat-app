import React, {useEffect, useState} from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { db } from '../firebase';

const CustomList = ({id, chatName, enterChat}) => {
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('chats')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => 
            setChatMessages(snapshot.docs.map(doc => doc.data()))
        );
        return unsubscribe;
    });
    return (
        <ListItem key={id} onPress={() => enterChat(id, chatName )} key={id} bottomDivider>
            <Avatar
            rounded
            source={{ 
                uri: chatMessages?.[0]?.photoURL ||
                "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
             }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle 
                ellipsizeMode="tail"
                numberOfLines={1}
                >
                    {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomList;

const styles = StyleSheet.create({});
