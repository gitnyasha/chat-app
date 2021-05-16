import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

const CustomList = ({id, chatName, enterChat}) => {
    return (
        <ListItem onPress={() => enterChat(id, chatName )} key={id} bottomDivider>
            <Avatar
            rounded
            source={{ 
                uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
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
                    This is a chat message
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomList;

const styles = StyleSheet.create({});
