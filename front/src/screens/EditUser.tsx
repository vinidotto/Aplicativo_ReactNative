import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  EditUser: { userId: number };
};

type EditUserProps = {
  route: RouteProp<RootStackParamList, 'EditUser'>;
  navigation: StackNavigationProp<RootStackParamList, 'EditUser'>;
};

const EditUser: React.FC<EditUserProps> = ({ route, navigation }) => {
  const { userId } = route.params;

  const [user, setUser] = useState<{ name: string; email: string; login: string; password: string; city: string }>({
    name: '',
    email: '',
    login: '',
    password: '',
    city: ''
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://192.168.1.109:3000/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuário", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const updateUser = async () => {
    if (!user.name || !user.email || !user.login) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsSaving(true);

    try {
      await axios.put(`http://192.168.1.109:3000/users/${userId}`, user);
      Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao atualizar usuário", error);
      Alert.alert("Erro", "Não foi possível atualizar o usuário.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Nome:</Text>
      <TextInput
        value={user.name}
        onChangeText={(value) => setUser({ ...user, name: value })}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Text>Email:</Text>
      <TextInput
        value={user.email}
        onChangeText={(value) => setUser({ ...user, email: value })}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        keyboardType="email-address"
      />

      <Text>Login:</Text>
      <TextInput
        value={user.login}
        onChangeText={(value) => setUser({ ...user, login: value })}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Text>Senha:</Text>
      <TextInput
        value={user.password}
        onChangeText={(value) => setUser({ ...user, password: value })}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Text>Cidade:</Text>
      <TextInput
        value={user.city}
        onChangeText={(value) => setUser({ ...user, city: value })}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Button 
      color= 'green'
      title={isSaving ? "Salvando..." : "Salvar Alterações"} onPress={updateUser} disabled={isSaving} />
    </View>
  );
};

export default EditUser;
