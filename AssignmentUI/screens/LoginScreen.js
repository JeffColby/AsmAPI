import { StyleSheet, Text, TextInput, View, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null);

  async function dangNhap() {
    if (!username || !password) {
      Alert.alert('Tên đăng nhập hoặc mật khẩu không đúng')
    } else {
      try {
        const response = await fetch(`http://10.0.2.2:3000/user/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          if (password === userData.password) {
            navigation.navigate('Danh sách sách',{user:userData})
            setUsername('')
            setPassword('')
          } else {
            Alert.alert('Mật khẩu không đúng')
          }
        } else {
          const responseText = await response.text();
          Alert.alert(responseText);
        }
      } catch (error) {
        Alert.alert("Lỗi " + error);
      }
    }
  };

  return (
    <View style={{ display: 'flex', flexDirection: 'column', padding: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black', marginBottom: 30 }}>ĐĂNG NHẬP</Text>
      <TextInput placeholder='Nhập tên đăng nhập' style={st.editText} value={username} onChangeText={setUsername} />
      <TextInput placeholder='Nhập mật khẩu' style={[st.editText, { marginBottom: 30 }]} secureTextEntry={true} value={password} onChangeText={setPassword} />
      <Pressable style={st.button} onPress={dangNhap}><Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>ĐĂNG NHẬP</Text></Pressable>
      <Pressable style={st.button} onPress={()=>{
        navigation.navigate('Register')
      }}><Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>TẠO TÀI KHOẢN</Text></Pressable>
    </View>
  )
}

export default LoginScreen

const st = StyleSheet.create({
  editText: {
    width: '100%',
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'blue',
    marginBottom: 15,
    alignItems: 'center'
  }
})