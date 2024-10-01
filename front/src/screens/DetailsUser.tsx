import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import axios from 'axios';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; 

type User = {
  id: number;
  name: string;
  email: string;
  login: string;
  city: string;
};

type DetailsUserProps = StackScreenProps<RootStackParamList, 'DetailsUser'>;

const DetailsUser: React.FC<DetailsUserProps> = ({ route, navigation }) => {
  const [user, setUser] = useState<User | null>(null);
  const userId = route.params.userId;

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get<User>(`http://192.168.1.109:3000/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Erro ao buscar detalhes do usuário", error);
      Alert.alert("Erro", "Não foi possível buscar os detalhes do usuário.");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (!user) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{user.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Login:</Text>
        <Text style={styles.value}>{user.login}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Cidade:</Text>
        <Text style={styles.value}>{user.city}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Editar Usuário" 
          onPress={() => navigation.navigate('EditUser', { userId: user.id })} 
          color="#E16104" 
        />
      </View>
      <Button title="Voltar" onPress={navigation.goBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  buttonContainer: {
    marginVertical: 10, 
    borderRadius: 5,
    overflow: 'hidden', 
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
});

export default DetailsUser;
