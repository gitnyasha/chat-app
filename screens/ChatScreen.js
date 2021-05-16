import React, { useLayoutEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"

const ChatScreen = ({ navigation, route }) => {

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
                    <Text
                    style={{ color: "white", marginLeft: 10, fontWeight: "700" }}
                    >
                         { route.params.chatName }
                    </Text>
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

    return (
        <View>
            <Text>{ route.params.chatName }</Text>
        </View>
    )
}

export default ChatScreen
