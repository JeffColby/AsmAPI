import { StyleSheet, Text, View,TextInput,Pressable, Alert } from 'react-native'
import React from 'react'

const CreateForm =  ({navigation,route}) => {
  const {user,bookTittle} = route.params;

  function getCurrentDate() {
    const time = new Date();
    const day = String(time.getDate()).padStart(2, '0'); // Lấy ngày và thêm số 0 phía trước nếu cần
    const month = String(time.getMonth() + 1).padStart(2, '0'); // Lấy tháng và thêm số 0 phía trước nếu cần (vì getMonth() trả về giá trị từ 0-11)
    const year = time.getFullYear(); // Lấy năm
  
    return `${day}/${month}/${year}`; // Định dạng ngày tháng năm theo ý muốn
  }

  async function guiYeuCau() {

    const form={
      username:user.username,
      fullname:user.fullname,
      bookTittle:bookTittle,
      date: getCurrentDate(),
      formStatus:0
    }

    try {
      const response = await fetch('http://10.0.2.2:3000/taoPhieuMuon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if(response.ok){
        const responseText = await response.text();
        Alert.alert(responseText)
        navigation.navigate('Danh sách sách',{user})
      }
      
    } catch (error) {
      Alert.alert('Lỗi '+ error);
    }
  }

  return (
    <View style={{ display: 'flex', flexDirection: 'column', padding: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black', marginBottom: 30 }}>XÁC NHẬN THÔNG TIN</Text>
      <Text style={{fontSize:15,color:'red',fontWeight:'bold',width:'90%',textAlign:'justify',marginBottom:30}}>Lưu ý: Sau khi bấm nút xác nhận, hãy kiểm tra email. Phiếu mượn của bạn chỉ được duyệt khi bạn đã hoàn tất phiếu mượn trước đó</Text>

      <Text style={st.textView}>Tên đăng nhập</Text>
      <TextInput style={st.editText} editable={false} value={user.username}/>

      <Text style={st.textView}>Họ tên</Text>
      <TextInput style={st.editText} editable={false} value={user.fullname}/>

      <Text style={st.textView}>Tên sách</Text>
      <TextInput style={[st.editText, { marginBottom: 30 }]} editable={false} value={bookTittle}/>

      <Pressable style={st.button} onPress={guiYeuCau}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>GỬI YÊU CẦU</Text>
      </Pressable>

      <Pressable style={st.button} onPress={()=>{
        navigation.navigate('Danh sách sách',{user:user})
      }}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>TRỞ LẠI</Text>
      </Pressable>
    </View>
  )
}

export default CreateForm

const st = StyleSheet.create({
    editText: {
        width: '100%',
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        color:'black'
      },
      button: {
        width: '100%',
        padding: 15,
        borderRadius: 15,
        backgroundColor: 'blue',
        marginBottom: 15,
        alignItems: 'center'
      },
      textView:{
        fontSize: 16, 
        fontWeight: 'bold', 
        color: 'black', 
        marginBottom: 5,
        width:'100%',
        textAlign:'left'
      }
})