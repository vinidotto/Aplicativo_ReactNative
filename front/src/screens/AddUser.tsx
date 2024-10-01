import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  AddUser: undefined;
};

type AddUserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddUser'>;

type Props = {
  navigation: AddUserScreenNavigationProp;
};

const AddUser = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');

  const addUser = async () => {
    try {
      await axios.post('http://192.168.1.109:3000/users', {
        name, email, login, password, city
      });
      navigation.goBack(); 
    } catch (error) {
      console.error("Erro ao adicionar usuário", error);
    }
  };

  const inputStyle = {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    marginLeft: 5, 
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Nome:</Text>
      <TextInput value={name} onChangeText={setName} style={inputStyle} />

      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} style={inputStyle} />

      <Text>Login:</Text>
      <TextInput value={login} onChangeText={setLogin} style={inputStyle} />

      <Text>Senha:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={inputStyle} />

      <Text>Cidade:</Text>
      <TextInput value={city} onChangeText={setCity} style={inputStyle} />

      <Button 
      color= 'green'
      title="Adicionar Usuário" onPress={addUser} />
    </View>
  );
};

export default AddUser;
