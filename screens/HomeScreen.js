import React, { useLayoutEffect, useEffect , useState } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomList from '../components/CustomList'
import { auth, db } from '../firebase'
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import { StyleSheet } from 'react-native'

const HomeScreen = ({navigation}) => {

    const [chats, setChats] = useState([]);

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
          )
        );
        return unsubscribe;
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chats",
            headerTitleAlign: "left",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),

            headerRight: () => (
                <View style={{ marginRight: 10, width: 80, flexDirection: 'row', justifyContent: "space-between" }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={24} color='white'/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('AddChat')}>
                        <SimpleLineIcons name='pencil' size={24} color='white'/>
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation])

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id: id,
            chatName: chatName,
        });
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({id, data: { chatName }}) => (
                    <CustomList 
                    key={id} 
                    id={id} 
                    chatName={chatName} 
                    enterChat={enterChat} 
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
});