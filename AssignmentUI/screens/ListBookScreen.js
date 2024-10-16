import { Alert, FlatList, StyleSheet, Text, View, Image, Pressable, } from 'react-native'
import React, { useState, useEffect } from 'react'

const ListBookScreen = ({ navigation,route }) => {
    const [danhSachSach, setDanhSachSach] = useState(null)
    const { user } = route.params;

    async function layDanhSachSach() {
        try {
            const res = await fetch('http://10.0.2.2:3000/tatCaSach')
            const mangJson = await res.json();
            setDanhSachSach(mangJson)
            console.log('Lấy dữ liệu thành công');
        } catch (error) {
            Alert.alert('Lỗi ' + error)
        }
    }

    useEffect(() => {
        layDanhSachSach()
        console.log(user);
        
    }, []);

    return (
        <View style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={danhSachSach}
                renderItem={({ item }) => {
                    return (
                        <View style={{
                            flexDirection: 'column', alignItems: 'center', padding: 20,
                            backgroundColor: 'pink', borderRadius: 20, marginBottom: 20
                        }}>
                            <Image source={{ uri: item.imageUrl }} style={{ width: 200, height: 200, marginBottom: 10 }} />
                            <View style={st.description}>
                                <Text style={st.textView}>Tittle: {item.tittle}</Text>
                                <Text style={st.textView}>Author: {item.author}</Text>
                                <Text style={st.textView}>Year: {item.year}</Text>
                                <Text style={st.textView}>Genre: {item.genre}</Text>
                                <Pressable style={st.button} onPress={() => {
                                    navigation.navigate('Form',{user:user,bookTittle:item.tittle});
                                }}>
                                    <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Mượn sách</Text>
                                </Pressable>
                            </View>
                        </View>)
                }} />
        </View>
    )
}

export default ListBookScreen

const st = StyleSheet.create({
    textView: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
        marginTop: 10
    },
    description: {
        alignItems: 'flex-start',
        width: '80%'
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 15,
        backgroundColor: 'blue',
        marginTop: 20,
        alignItems: 'center'
    }
})