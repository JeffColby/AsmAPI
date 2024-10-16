import { StyleSheet, Text, TextInput, View,Alert, Pressable } from 'react-native'
import React,{useState} from 'react'

const RegisterScreen = ({navigation}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [fullname, setFullname] = useState('')
    const [user, setNewUser] = useState(null)

    async function dangKy(){
      if(!username || !password || !fullname || !password2){
        Alert.alert('Thông tin không hợp lệ')
      }else if(password != password2){
        Alert.alert('Mật khẩu không khớp')
      }else{
        const newUser={
          username,
          password,
          fullname
        }

        try {
          const response = await fetch('http://10.0.2.2:3000/dangKy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
          });
    
          const responseText = await response.text();
          Alert.alert(responseText);
          if(responseText == 'Tạo tài khoản thành công!'){
            setNewUser(newUser)
            navigation.navigate('Danh sách sách',{user:newUser})
            setFullname('')
            setPassword('')
            setPassword2('')
            setUsername('')
          }
        } catch (error) {
          console.error('Lỗi '+ error);
          Alert.alert('Lỗi '+ error);
        }
      }
    };

  return (
    <View style={{display:'flex',flexDirection:'column',padding:20,alignItems:'center'}}>
      <Text style={{fontSize:25,fontWeight:'bold',color:'black',marginBottom:30}}>ĐĂNG KÝ</Text>
      <TextInput placeholder='Nhập tên đăng nhập' style={st.editText} value={username} onChangeText={setUsername}/>
      <TextInput placeholder='Nhập mật khẩu' style={st.editText} secureTextEntry={true} value={password} onChangeText={setPassword}/>
      <TextInput placeholder='Nhập lại mật khẩu' style={st.editText} secureTextEntry={true} value={password2} onChangeText={setPassword2}/>
      <TextInput placeholder='Nhập họ tên' style={[st.editText,{marginBottom:30}]} value={fullname} onChangeText={setFullname}/>
      <Pressable style={st.button} onPress={dangKy}><Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>TẠO TÀI KHOẢN</Text></Pressable>
      <Pressable style={st.button} onPress={()=>{
        navigation.navigate('Login')
      }}><Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>ĐĂNG NHẬP</Text></Pressable>
    </View>
  )
}

export default RegisterScreen

const st = StyleSheet.create({
    editText:{
        width:'100%',
        padding:10,
        borderColor:'black',
        borderWidth:1,
        borderRadius:10,
        marginBottom:10
    },
    button:{
      width:'100%',
      padding:15,
      borderRadius:15,
      backgroundColor:'blue',
      marginBottom:15,
      alignItems:'center'
    }
})