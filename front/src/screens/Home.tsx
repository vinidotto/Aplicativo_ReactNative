import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

type User = {
  id: number;
  name: string;
  email: string;
};

type HomeProps = {
  navigation: {
    navigate: (screen: string, params?: any) => void;
    addListener: (event: string, callback: () => void) => void;
  };
};

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>('http://192.168.1.109:3000/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
      Alert.alert("Erro", "Não foi possível buscar os usuários.");
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await axios.delete(`http://192.168.1.109:3000/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Erro ao deletar usuário", error);
      Alert.alert("Erro", "Não foi possível deletar o usuário.");
    }
  };

  useEffect(() => {
    fetchUsers();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUsers();
    });
    return unsubscribe;
  }, [navigation]);

  const renderUser = ({ item }: { item: User }) => (
    <TouchableOpacity
      style={{ padding: 10, borderBottomWidth: 1 }}
      onPress={() => navigation.navigate('DetailsUser', { userId: item.id })}
    >
      <Text>Nome: {item.name}</Text>
      <Text>Email: {item.email}</Text>
      <View style={{ flexDirection: 'row', marginTop: 10, gap:5 }}>
        <Button
          title="Editar"
          color='#E16104'
          onPress={() => navigation.navigate('EditUser', { userId: item.id })}
        />
        <Button
          title="Excluir"
          color="red"
          onPress={() => deleteUser(item.id)}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 20}}>
      <Button 
      color= 'green'
      title="Adicionar Usuário" onPress={() => navigation.navigate('AddUser')} />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUser}
      />
    </View>
  );
};

export default Home;
